import Recipes from "../classes/Recipes";

export default class Nova{
    constructor(scene){
        this.scene = scene;

        this.nova;
        this.importantDialogue = [
            'be careful what you bring me',
            'i will eat anything in your hands',
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
        this.recipes = new Recipes();
        this.favoriteMeal;
        this.attemptsLeft = 5;
        
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
                this.zone.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown()){
                        this.scene.scene.launch("NovaMenu");
                        this.scene.scene.bringToTop("NovaMenu");
                        this.scene.scene.bringToTop("Hotbar"); 
                    }
                    else{
                        if (!this.isTalking){
                            let currentMeal = this.inventory.getSelectedIngredient();
                            if (currentMeal != null){
                                if (currentMeal == "Rocks"){ this.talk("i'm not eating that"); }
                                else if (!this.recipes.mealExists(currentMeal)){ this.talk("prepare it for me"); }
                                else{
                                    let currentMealRecipe = this.recipes.findRecipeByMeal(currentMeal);
                                    this.compareRecipes(currentMealRecipe);
                                }
                            }
                            else if (this.importantDialogue.length != 0){
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
                    }
                });
            }
        });

    }

    /**
     * Initialises Nova's favourite and random meal.
     */
    initialiseFavorite(){
        let recipesArr = this.recipes.getRecipes();
        let randIndex = Math.floor(Math.random() * recipesArr.length);
        this.favoriteMeal = recipesArr[randIndex]; 

    }

    /**
     * Compares Nova's favourite meal and the current recipe and says the similarities between recipes.
     * @param {Dictionary} currentRecipe
     */
    compareRecipes(currentRecipe){
        if (this.attemptsLeft > 0){
            console.log(currentRecipe.ingredients);
            console.log(this.favoriteMeal.ingredients);
            let commonIngredients = [];
            let usesSameAppliance = false;

            for (let i = 0; i < currentRecipe.ingredients.length; i++){
                for (let j = 0; j < currentRecipe.ingredients.length; j++){
                    if (currentRecipe.ingredients[i] == this.favoriteMeal.ingredients[j]){
                        commonIngredients.push(currentRecipe.ingredients[i]);
                        break;
                    }
                }
            }

            if (this.favoriteMeal.appliance == currentRecipe.appliance){
                usesSameAppliance = true;
            }

            if (this.favoriteMeal.ingredients.includes(currentRecipe.meal)){
                this.talk("ooh, use this in another meal")
            }
            else {
                switch (commonIngredients.length) {
                    case 3:
                        if (usesSameAppliance){
                            this.talk("oh, wow! this is it!")
                        }
                        else{
                            this.talk("this is so close. the chemistry is off");
                        }
                        break;
                    case 2:
                        this.talk("i love the " + commonIngredients[0].toLowerCase() + " and " + commonIngredients[1].toLowerCase() + " in this");
                        break;
                    case 1:
                        this.talk("i only like the " + commonIngredients[0].toLowerCase() + " in this");
                        break;
                    default:
                        this.talk("i hate the taste of this");
                        break;
                }
            }
            
            this.inventory.removeIngredient(this.inventory.getSelectedIndex());

            this.attemptsLeft--;
        }
        else{
            this.talk("i hate the food here. i'm leaving");
        }
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