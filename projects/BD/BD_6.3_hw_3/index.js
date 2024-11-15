const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Testing_3");
});

const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

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

app.get("/recipes", async (req, res) => {
  let recipes = await getAllRecipes();

  if (!recipes) {
    return res.status(404).json({ message: "Recipes Not found :)" });
  }
  res.status(200).json(recipes);
});

app.get("/recipes/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe, Not found :)" });
  }
  res.status(200).json(recipe);
});

app.post("/recipes/new", async (req, res) => {
  let newRecipeDetails = req.body;
  let newRecipe = await addNewRecipe(newRecipeDetails);
  if (!newRecipe) {
    return res.status(404).json({ message: "Recipe, Not found :)" });
  }
  res.status(200).json(newRecipe);
});

module.exports = { app, getAllRecipes, getRecipeById, addNewRecipe };
