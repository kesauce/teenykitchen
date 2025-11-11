export default class Counter {
	constructor(scene) {

		this.scene = scene;
		this.zone;
		this.openImage;
		this.menu;

		// Sets the clickable countertop
		this.zone = scene.add.zone(68, 86, 107, 50).setOrigin(0).setInteractive({ useHandCursor: true });
		this.openImage = scene.add.image(58, 68, "counteron").setOrigin(0, 0).setVisible(false);

		// Opens menu when clicked
		this.zone.on('pointerdown', () => {
			this.open();
		});

		// Show open stove when hovered
		this.zone.on('pointerover', () => {
			this.openImage.setVisible(true);
		});

		// Hide open stove when not hovered
		this.zone.on('pointerout', () => {
			this.openImage.setVisible(false);
		});
	}

	open() {
		// // Disable clicks and hover
		// this.zone.disableInteractive();
		// this.scene.input.setDefaultCursor('default');

		// // Launch scene
		// this.scene.scene.launch("StoveMenu");
		// this.scene.scene.bringToTop("StoveMenu");
		// this.scene.scene.bringToTop("Hotbar"); 
	}

	close() {
		// // Re-enable clicks and hover
		// this.zone.setInteractive({ useHandCursor: true });
		// this.scene.input.setDefaultCursor('default');

		// // Delete the scene
		// this.scene.scene.stop("StoveMenu");

		// // Close the 
		// this.openImage.setVisible(false);
	}

}