export default class Recipes {
	constructor() {
		
        this.recipes = [
            { 
                ingredients: ['Egg', 'Flour', 'Milk'],
                appliance: 'Stove',
                meal: 'Pancake',
                mealIcon: 'pancake'
            }
        ];
	}

    findRecipe(ingredients, appliance){
        // Sort the ingredients alphabetically
        ingredients.sort();

        this.recipes.forEach(recipe => {
            // Check if the appliance and ingredients are the same, if so then return true
            if (appliance != recipe.appliance) { return; }

            for (let i = 0; i < ingredients.length; i++){
                if (ingredients[i] != recipe.ingredients[i]){ return; }
            }

            return recipe;
        });

        return null;
    }
}