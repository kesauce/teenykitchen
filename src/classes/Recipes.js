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
                ingredients: ['Cheese', 'Flour', 'Water'],
                appliance: 'Oven',
                meal: 'Mac and Cheese',
                mealIcon: 'mac_and_cheese'
            },

            {
                ingredients: ['Fish', 'Fish', 'Fish'],
                appliance: 'Stove',
                meal: 'Salmon',
                mealIcon: 'salmon'
            },
            
            {
                ingredients: ['Egg', 'Flour', 'Strawberry'],
                appliance: 'Oven',
                meal: 'Strawberry Cake',
                mealIcon: 'strawberry_cake'
            },
            
            {
                ingredients: ['Egg', 'Flour', 'Cocoa'],
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
}