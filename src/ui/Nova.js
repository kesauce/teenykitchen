import Recipes from "../classes/Recipes";

export default class Nova{
    constructor(scene){
        this.scene = scene;

        this.nova;
        this.importantDialogue = [
            'that is your job, not mine',
            'cook something first',
            'hand me a meal',
            'you are empty-handed'
        ]
        this.basicDialogue = [
            'ow',
            'that tickles',
            'hungry',
            'i am nova',
            'it is stuffy in here',
            'bleh',
            'stop it',
            'is it finished yet'
        ];
        this.previousDialogueIndex;
        this.dialogueQueue = [];
        this.isTalking = false;
        this.zone;
        this.inventory = this.scene.registry.get('inventory');
        this.favoriteMeal;
        
        this.playInitialAnimation();
        this.initialiseFavorite();


        
    }

    /**
     * Plays Nova's initial animation and sets the zones for click dialogue events.
     */
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

                this.zone = this.scene.add.zone(320, 255, 100, 120).setOrigin(0, 0).setInteractive({ useHandCursor: true }).setDepth(5);
                this.zone.on('pointerdown', () => {
                    if (!this.isTalking){
                        if (this.importantDialogue.length != 0){
                            let message = this.importantDialogue.pop();
                            this.talk(message);
                        }
                        else{
                            let randIndex = Math.floor(Math.random() * this.basicDialogue.length);
                            while(randIndex == this.previousDialogueIndex){
                                randIndex = Math.floor(Math.random() * this.basicDialogue.length);
                            }
                            this.talk(this.basicDialogue[randIndex]);
                            this.previousDialogueIndex = randIndex;
                        }
                    }
                    
                });
            }
        });

    }

    /**
     * Initialises Nova's favourite and random meal.
     */
    initialiseFavorite(){
        let recipes = new Recipes();
        let recipesArr = recipes.recipes;
        let randIndex = Math.floor(Math.random() * recipesArr.length);
        this.favoriteMeal = recipesArr[randIndex];

    }

    /**
     * Pushes the message to the dialogue queue and processes the queue (FIFO).
     * @param {String} newMessage 
     */
    talk(newMessage){
        this.dialogueQueue.push(newMessage);
        this.processDialogueQueue();
    }

    /**
     * Displays a new piece of dialogue if Nova isn't talking and if the queue isn't empty. Goes through the queue until finished.
     */
    processDialogueQueue(){
        if (this.isTalking == true || this.dialogueQueue.length == 0){ return; }

        const message = this.dialogueQueue.shift();
        this.isTalking = true;

        // Create a popup
        const popupText = this.scene.add.text(this.nova.x + this.nova.displayWidth / 2 + 4, this.nova.y - 30, message,
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
            this.processDialogueQueue();
        });
    }
}