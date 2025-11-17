export default class Nova{
    constructor(scene){
        this.scene = scene;

        this.nova;
        this.dialogueQueue = [];
        this.isTalking = false;
        
        // Play Nova's initial animation
        this.playInitialAnimation();
    }

    playInitialAnimation(){
        if (!this.scene.anims.exists('walk_up')) {
            this.scene.anims.createFromAseprite('nova_walk');
        }
        this.nova = this.scene.physics.add.sprite(300, 500, "nova_walk").setOrigin(0, 0).setScale(4).setDepth(1);

        this.scene.tweens.add({
            targets: this.nova,
            y: 250,
            duration: 2500,
            onStart: () => this.nova.play({key: 'walk_up', repeat: -1}),
            onComplete: () => {
                this.nova.play({key: 'idle', repeat: -1});
                this.talk("you...");
                this.talk("i am craving something...");
                this.talk("do not ask questions...");
                this.talk("go on...")
            }
        });

    }

    talk(message){
        this.dialogueQueue.push(message);
        this.processQueue();
    }

    processQueue(){
        if (this.isTalking == true || this.dialogueQueue.length == 0){ return; }

        const message = this.dialogueQueue.shift();
        this.isTalking = true;

        // Create a popup
        const popupText = this.scene.add.text(this.nova.x + this.nova.displayWidth / 2 + 7, this.nova.y - 30, message,
            {
                fontFamily: 'retrogaming',
                fontSize: '30px',
                color: '#FFFFFF',
                padding: { top: 4, bottom: 6 }
            }
            ).setDepth(100).setOrigin(0.5, 0.5);

        


        // Fade the text out over 1.5 seconds, then destroy it
        this.scene.tweens.add({
            targets: popupText,
            alpha: 0,
            y: popupText.y - 30, // move upward slightly
            ease: 'Power1',
            delay: 500,
            duration: 1500,
            onComplete: () => {
                popupText.destroy();
            }
        });

        this.scene.time.delayedCall(2000, () => {
            this.isTalking = false;
            this.processQueue();
        });
    }
}