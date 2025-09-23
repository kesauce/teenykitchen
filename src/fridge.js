export default class Fridge {
  constructor(scene) {

    this.scene = scene;
    this.zone;
    this.openImage;
    this.isOpen;
    this.menu;

    // Sets the clickable fridge
    this.zone = scene.add.zone(155, 13, 32, 58).setOrigin(0).setInteractive({ useHandCursor: true });
    this.openImage = scene.add.image(146, 8, "openfridge").setOrigin(0, 0).setVisible(false);
    this.isOpen = false;

    this.zone.on('pointerdown', () => {
      console.log("Fridge clicked!");
      if (!this.isOpen){
        this.open();
      }
      else{
        this.close();
      }
    });
  }

  open() {
    this.openImage.setVisible(true);
    this.isOpen = true;

    // Add menu container
    this.menu = this.scene.add.container(100, 100);
    let bg = this.scene.add.rectangle(0, 0, 200, 200, 0x000000, 0.7);
    this.menu.add(bg);
  }
  
  close() {
    this.openImage.setVisible(false);
    this.isOpen = false;

    if (this.menu) {
      this.menu.destroy();
      this.menu = null;
    }
  }
}