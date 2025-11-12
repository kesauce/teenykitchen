import Hotbar from './Hotbar.js';
import FridgeMenu from './FridgeMenu.js';

import Fridge from '../classes/Fridge.js';
import Stove from '../classes/Stove.js';
import Oven from '../classes/Oven.js';
import Sink from '../classes/Sink.js';
import Counter from '../classes/Counter.js';
import Inventory from '../ui/Inventory.js';

export default class Kitchen extends Phaser.Scene {
    constructor() {
        super({ key: "Kitchen" });

        this.fridge;
        this.stove;
        this.oven;
        this.sink;
        this.counter;
        this.inventory;

    }

    preload() {
        // Preload kitchen items
        this.load.image("bg", "/assets/kitchen/bg.png");
        this.load.image("openfridge", "/assets/kitchen/openfridge.png");
        this.load.image("stoveon", "/assets/kitchen/stoveon.png");
        this.load.image("ovenon", "/assets/kitchen/ovenon.png");
        this.load.image("sinkon", "/assets/kitchen/sinkon.png");
        this.load.image("counteron", "/assets/kitchen/counteron.png")

        // Preload ingredients
        this.load.image("milk_bottle", "/assets/ingredients/milk_bottle.png");
        this.load.image("egg", "/assets/ingredients/egg_white.png");
        this.load.image("banana", "/assets/ingredients/banana.png");
        this.load.image("butter", "/assets/ingredients/butter.png");
        this.load.image("red_apple", "/assets/ingredients/red_apple.png");
        this.load.image("flour", "/assets/ingredients/flour.png");
        this.load.image("sugar", "/assets/ingredients/sugar.png");
        this.load.image("coffee", "/assets/ingredients/coffee_bag.png");
        this.load.image("cocoa", "/assets/ingredients/hot_cocoa_mix.png");
        this.load.image("yogurt", "/assets/ingredients/plain_yogurt.png");
        this.load.image("potato", "/assets/ingredients/potato.png");
        this.load.image("fish", "/assets/ingredients/fish.png");
        this.load.image("strawberry", "/assets/ingredients/strawberry.png");
        this.load.image("grape", "/assets/ingredients/red_grape.png");
        this.load.image('bacon', '/assets/ingredients/bacon.png');
        this.load.image('cheese', '/assets/ingredients/cheese.png');
        this.load.image('water', '/assets/ingredients/water.png');
        this.load.image('raw_beef', '/assets/ingredients/raw_beef.png');
        this.load.image('raw_chicken', '/assets/ingredients/raw_chicken.png');
        this.load.image('ice_cream', '/assets/ingredients/ice_cream.png');
        this.load.image('raw_sausage', '/assets/ingredients/raw_sausage.png');

        // Preload UI
        this.load.image("cancel", "/assets/ui/cancel.png");
        this.load.image("hotbar", "/assets/ui/hotbar.png");
        this.load.image("select", "/assets/ui/select.png");
        this.load.image("ingredient_select", "/assets/ui/ingredientselect.png");
        this.load.aseprite("pan", '/assets/ui/pan_anim/pan.png', '/assets/ui/pan_anim/pan.json');
        this.load.aseprite("bowl", '/assets/ui/bowl_anim/bowl.png', '/assets/ui/bowl_anim/bowl.json');
        this.load.aseprite("oven", '/assets/ui/oven_anim/oven.png', '/assets/ui/oven_anim/oven.json');

        // Preload meals
        this.load.image('pancake', '/assets/food/pancake.png');
        this.load.image('fried_egg', '/assets/food/fried_egg.png');
        this.load.image('omelette', '/assets/food/omelette.png');
        this.load.image('bacon_and_egg', '/assets/food/bacon_and_egg.png');
        this.load.image('rocks', '/assets/food/rocks.png');
        this.load.image('fries', '/assets/food/fries.png');
        this.load.image('mac_and_cheese', '/assets/food/mac_and_cheese.png');
        this.load.image('rocks', '/assets/food/rocks.png');
        this.load.image('cooked_salmon', '/assets/food/cooked_salmon.png');
        this.load.image('strawberry_cake', '/assets/food/strawberry_cake.png');
        this.load.image('chocolate_cake', '/assets/food/chocolate_cake.png');
        this.load.image('cooked_bacon', '/assets/food/cooked_bacon.png');
        this.load.image('cheesecake', '/assets/food/cheesecake.png');
        this.load.image('chocolate', '/assets/food/chocolate.png');
        this.load.image('cookies', '/assets/food/cookies.png');
        this.load.image('bread', '/assets/food/bread.png');
        this.load.image('donuts', '/assets/food/donuts.png');
        this.load.image('strawberry_jam', '/assets/food/strawberry_am.png');
        this.load.image('jam_and_bread', '/assets/food/jam_and_bread.png');
        this.load.image('buns', '/assets/food/bun.png');
        this.load.image('steak', '/assets/food/steak.png');
        this.load.image('roasted_chicken', '/assets/food/roasted_chicken.png');
        this.load.image('burger', '/assets/food/burger.png');
        this.load.image('pizza', '/assets/food/pizza.png');
        this.load.image('sandwich', '/assets/food/sandwich.png');
        this.load.image('bagel', '/assets/food/bagel.png');
        this.load.image('neapolitan', '/assets/food/neapolitan.png');
        this.load.image('pudding', '/assets/food/pudding.png');
        this.load.image('sushi', '/assets/food/sushi.png');
        this.load.image('hotdog', '/assets/food/hotdog.png');

    }

    create() {
        this.createKitchen();
        this.createUI();

        // Ensuring objects can be globally accessed
        this.registry.set('fridge', this.fridge);
        this.registry.set('stove', this.stove);
        this.registry.set('oven', this.oven);
        this.registry.set('sink', this.sink);
        this.registry.set('counter', this.counter);
        this.registry.set('inventory', this.inventory);


    }


    // ---------- ***** ---------- //


    createKitchen() {
        // Add the kitchen background
        let bg = this.add.image(0, 0, "bg").setOrigin(0, 0);

        bg.setScale(
            this.cameras.main.width / bg.width,
            this.cameras.main.height / bg.height
        );

        this.fridge = new Fridge(this);
        this.stove = new Stove(this);
        this.oven = new Oven(this);
        this.sink = new Sink(this);
        this.inventory = new Inventory(this);
        this.counter = new Counter(this);
    }

    createUI() {
        const sizes = this.registry.get('sizes');

        // Adding the hotbar and the select icon to the screen
        this.add.image(15, sizes.height - 82, "hotbar").setOrigin(0, 0);
        
        this.inventory.displayInventory();
        this.scene.launch('Hotbar');
        this.scene.bringToTop('Hotbar');

    }
}