export default class Recipes {
	constructor() {
		
        this.recipes = [
            { 
                ingredients: ['Egg', 'Flour', 'Milk'],
                appliance: 'Stove',
                meal: 'Pancake',
                mealIcon: 'pancake'
            },

            {
                ingredients: ['Egg', 'Egg', 'Egg'],
                appliance: 'Stove',
                meal: 'Sunny Side Up',
                mealIcon: 'fried_egg'
            },

            {
                ingredients: ['Egg', 'Egg', 'Milk'],
                appliance: 'Stove',
                meal: 'Omelette',
                mealIcon: 'omelette'
            },

            {
                ingredients: ['Bacon', 'Egg', 'Egg'],
                appliance: 'Stove',
                meal: 'Bacon and Egg',
                mealIcon: 'bacon_and_egg'
            },

            {
                ingredients: ['Potato', 'Potato', 'Potato'],
                appliance: 'Stove',
                meal: 'Fries',
                mealIcon: 'fries'
            },

            {
                ingredients: ['Cheese', 'Cheese', 'Flour'],
                appliance: 'Oven',
                meal: 'Mac and Cheese',
                mealIcon: 'mac_and_cheese'
            },

            {
                ingredients: ['Fish', 'Fish', 'Fish'],
                appliance: 'Stove',
                meal: 'Cooked Salmon',
                mealIcon: 'cooked_salmon'
            },
            
            {
                ingredients: ['Egg', 'Flour', 'Strawberry'],
                appliance: 'Oven',
                meal: 'Strawberry Cake',
                mealIcon: 'strawberry_cake'
            },
            
            {
                ingredients: ['Chocolate', 'Egg', 'Flour'],
                appliance: 'Oven',
                meal: 'Chocolate Cake',
                mealIcon: 'chocolate_cake'
            },

            {
                ingredients: ['Bacon', 'Bacon', 'Bacon'],
                appliance: 'Stove',
                meal: 'Cooked Bacon',
                mealIcon: 'cooked_bacon'
            },

            {
                ingredients: ['Cheese', 'Egg', 'Flour'],
                appliance: 'Oven',
                meal: 'Cheesecake',
                mealIcon: 'cheesecake'
            },
            
            {
                ingredients: ['Cocoa Powder', 'Cocoa Powder', 'Cocoa Powder'],
                appliance: 'Counter',
                meal: 'Chocolate',
                mealIcon: 'chocolate'
            },

            {
                ingredients: ['Chocolate', 'Egg', 'Sugar'],
                appliance: 'Oven',
                meal: 'Cookies',
                mealIcon: 'cookies'
            },

            {
                ingredients: ['Egg', 'Flour', 'Water'],
                appliance: 'Oven',
                meal: 'Bread',
                mealIcon: 'bread'
            },

            {
                ingredients: ['Egg', 'Flour', 'Sugar'],
                appliance: 'Stove',
                meal: 'Donuts',
                mealIcon: 'donuts'
            },

            {
                ingredients: ['Strawberry', 'Strawberry', 'Sugar'],
                appliance: 'Counter',
                meal: 'Strawberry Jam',
                mealIcon: 'strawberry_jam'
            },

            {
                ingredients: ['Bread', 'Bread', 'Strawberry'],
                appliance: 'Counter',
                meal: 'Jam and Bread',
                mealIcon: 'jam_and_bread'
            },

            {
                ingredients: ['Bread', 'Bread', 'Bread'],
                appliance: 'Counter',
                meal: 'Buns',
                mealIcon: 'buns'
            },

            {
                ingredients: ['Raw Beef', 'Raw Beef', 'Raw Beef'],
                appliance: 'Stove',
                meal: 'Steak',
                mealIcon: 'steak'
            },

            {
                ingredients: ['Raw Chicken', 'Raw Chicken', 'Raw Chicken'],
                appliance: 'Oven',
                meal: 'Roasted Chicken',
                mealIcon: 'roasted_chicken'
            },

            {
                ingredients: ['Bun', 'Bun', 'Steak'],
                appliance: 'Stove',
                meal: 'Burger',
                mealIcon: 'burger'
            },

            {
                ingredients: ['Cheese', 'Flour', 'Water'],
                appliance: 'Oven',
                meal: 'Pizza',
                mealIcon: 'pizza'
            },

            {
                ingredients: ['Bread', 'Bread', 'Egg'],
                appliance: 'Stove',
                meal: 'Sandwich',
                mealIcon: 'sandwich'
            },

            {
                ingredients: ['Egg', 'Flour', 'Water'],
                appliance: 'Stove',
                meal: 'Bagel',
                mealIcon: 'bagel'
            },

            {
                ingredients: ['Chocolate', 'Ice Cream', 'Strawberry'],
                appliance: 'Counter',
                meal: 'Neapolitan Ice Cream',
                mealIcon: 'neapolitan'
            },

            {
                ingredients: ['Butter', 'Milk', 'Sugar'],
                appliance: 'Counter',
                meal: 'Pudding',
                mealIcon: 'pudding'
            },

            {
                ingredients: ['Fish', 'Fish', 'Rice'],
                appliance: 'Counter',
                meal: 'Sushi',
                mealIcon: 'sushi'
            },

            {
                ingredients: ['Bun', 'Bun', 'Raw Sausage'],
                appliance: 'Stove',
                meal: 'Hotdog',
                mealIcon: 'hotdog'
            }

        ];
	}

    findRecipe(ingredients, appliance){
        let recipeReturn = null;

        // Sort the ingredients alphabetically
        ingredients.sort();

        this.recipes.forEach(recipe => {
            // Check if the appliance and ingredients are the same, if so then return true
            if (appliance != recipe.appliance) { return; }

            for (let i = 0; i < ingredients.length; i++){
                if (ingredients[i] != recipe.ingredients[i]){ return; }
            }

            recipeReturn = recipe;
        });

        return recipeReturn;
    }

    getRecipes() { return this.recipes; }
}