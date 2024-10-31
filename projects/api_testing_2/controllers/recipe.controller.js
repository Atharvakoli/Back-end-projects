const { recipes } = require("../recipeData");

async function getAllRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

async function addNewRecipe(newRecipeDetails) {
  let newRecipe = {
    id: recipes.length + 1,
    ...newRecipeDetails,
  };

  recipes.push(newRecipe);
  return newRecipe;
}

module.exports = { getAllRecipes, getRecipeById, addNewRecipe };
