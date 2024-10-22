const { sequelize } = require("../lib");
const { recipeModel } = require("../models/recipe.model");
const { recipeData } = require("../db/recipesData");
const { userModel } = require("../models/user.model");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await recipeModel.bulkCreate(recipeData);

    await userModel.create({
      username: "foodlover",
      email: "foodlover@example.com",
      password: "securepassword",
    });

    res.status(200).json({ message: "Database seeding successful :) " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllRecipes(req, res) {
  try {
    let recipes = await recipeModel.findAll();

    if (recipes.length === 0) {
      return res.status(404).json({ message: "Recipes, NOT FOUND" });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { seedDB, getAllRecipes };
