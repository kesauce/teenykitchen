export default class Fridge {
  constructor(scene) {

    this.scene = scene;
    this.zone;
    this.openImage;
    this.menu;

    // Sets the clickable fridge
    this.zone = scene.add.zone(155, 13, 32, 58).setOrigin(0).setInteractive({ useHandCursor: true });
    this.openImage = scene.add.image(146, 8, "openfridge").setOrigin(0, 0).setVisible(false);

    // Opens menu when clicked
    this.zone.on('pointerdown', () => {
      console.log("Fridge clicked!");
      this.open();
    });

    // Show open fridge when hovered
    this.zone.on('pointerover', () => {
      this.openImage.setVisible(true);
    });

    // Hide open fridge when not hovered
    this.zone.on('pointerout', () => {
      this.openImage.setVisible(false);
    });
  }

  open() {
    this.scene.scene.launch("FridgeMenu");
  }

}