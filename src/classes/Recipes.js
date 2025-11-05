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