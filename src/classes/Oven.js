export default class Oven {
	constructor(scene) {

		this.scene = scene;
		this.zone;
		this.openImage;
		this.menu;

		// Sets the clickable stove
		this.zone = scene.add.zone(273, 138, 90, 69).setOrigin(0).setInteractive({ useHandCursor: true });
		this.openImage = scene.add.image(273, 138, "ovenon").setOrigin(0, 0).setVisible(false);

		// Opens menu when clicked
		this.zone.on('pointerdown', () => {
			this.open();
		});

		// Show open oven when hovered
		this.zone.on('pointerover', () => {
			this.openImage.setVisible(true);
		});

		// Hide open oven when not hovered
		this.zone.on('pointerout', () => {
			this.openImage.setVisible(false);
		});
	}

	open() {
		// Disable clicks and hover
		this.zone.disableInteractive();
		this.scene.input.setDefaultCursor('default');

		// Launch scene
		this.scene.scene.launch("OvenMenu");
		this.scene.scene.bringToTop("OvenMenu");
		this.scene.scene.bringToTop("Hotbar"); 
	}

	close() {
		// Re-enable clicks and hover
		this.zone.setInteractive({ useHandCursor: true });
		this.scene.input.setDefaultCursor('default');

		// Delete the scene
		this.scene.scene.stop("OvenMenu");

		// Close the 
		this.openImage.setVisible(false);
	}

}