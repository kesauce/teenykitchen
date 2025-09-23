export default class Oven {
  constructor(scene) {

    this.scene = scene;
    this.zone;
    this.openImage;
    this.isOn;
    this.menu;

    // Sets the clickable stove
    this.zone = scene.add.zone(91, 46, 29, 21).setOrigin(0).setInteractive({ useHandCursor: true });
    this.openImage = scene.add.image(91, 46, "ovenon").setOrigin(0, 0).setVisible(false);
    this.isOn = false;

    this.zone.on('pointerdown', () => {
      console.log("Oven clicked!");
      if (!this.isOn){
        this.open();
      }
      else{
        this.close();
      }
    });
  }

  open() {
    this.openImage.setVisible(true);
    this.isOn = true;

    // Add menu container
    this.menu = this.scene.add.container(100, 100);
    let bg = this.scene.add.rectangle(0, 0, 200, 200, 0x000000, 0.7);
    this.menu.add(bg);
  }
  
  close() {
    this.openImage.setVisible(false);
    this.isOn = false;

    if (this.menu) {
      this.menu.destroy();
      this.menu = null;
    }
  }
}