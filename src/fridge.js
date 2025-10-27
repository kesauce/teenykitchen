export default class Fridge {
	constructor(scene) {

		this.scene = scene;
		this.zone;
		this.openImage;
		this.menu;

		// Sets the clickable fridge
		this.zone = scene.add.zone(465, 39, 96, 183).setOrigin(0).setInteractive({ useHandCursor: true });
		this.openImage = scene.add.image(444, 39, "openfridge").setOrigin(0, 0).setVisible(false);

		// Opens menu when clicked
		this.zone.on('pointerdown', () => {
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
		// Disable fridge clicks and hover
		this.zone.disableInteractive();
		this.scene.input.setDefaultCursor('default');

		// Launch scene
		this.scene.scene.pause("Kitchen");
		this.scene.scene.launch("FridgeMenu");
	}

	close() {
		// Re-enable fridge clicks and hover
		this.zone.setInteractive({ useHandCursor: true });
		this.scene.input.setDefaultCursor('default');

		// Resume scene
		this.scene.scene.stop("FridgeMenu");
		this.scene.scene.resume("Kitchen");
	}
}