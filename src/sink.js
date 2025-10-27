export default class Oven {
	constructor(scene) {

		this.scene = scene;
		this.zone;
		this.openImage;
		this.menu;

		// Sets the clickable stove
		this.zone = scene.add.zone(180, 93, 84, 48).setOrigin(0).setInteractive({ useHandCursor: true });
		this.openImage = scene.add.image(180, 93, "sinkon").setOrigin(0, 0).setVisible(false);

		// Opens menu when clicked
		this.zone.on('pointerdown', () => {
			console.log("Sink clicked!");
			this.open();
		});

		// Show open sink when hovered
		this.zone.on('pointerover', () => {
			this.openImage.setVisible(true);
		});

		// Hide open sink when not hovered
		this.zone.on('pointerout', () => {
			this.openImage.setVisible(false);
		});
	}

	open() {
	}

}