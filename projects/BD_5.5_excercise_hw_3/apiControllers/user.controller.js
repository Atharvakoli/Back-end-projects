const { favoriteModel } = require('../models/favorite.model');
const { recipeModel } = require('../models/recipe.model');
const { Op } = require('sequelize');

async function favoriteARecipe(req, res) {
  let userId = req.params.id;
  let recipeId = req.query.recipeId;

  if (!recipeId || !userId) {
    return res.status(404).json({ message: 'Credentials are missing :) ' });
  }

  try {
    let makeRecipeFavorite = await favoriteModel.create({
      userId,
      recipeId,
    });

    if (!makeRecipeFavorite) {
      return res.status(404).json({
        message:
          'Something went wrong while creating, recipe to be a favorite recipe',
      });
    }

    res
      .status(200)
      .json({ message: 'Recipe made favorite', makeRecipeFavorite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function unfavoriteARecipe(req, res) {
  let userId = req.params.id;
  let recipeId = req.query.recipeId;

  if (!userId || !recipeId) {
    return res.status(404).json({ message: 'Credentials are missing...!' });
  }

  try {
    let unfavoriteARecipe = await favoriteModel.destroy({
      where: { userId, recipeId },
    });

    if (!unfavoriteARecipe) {
      return res.status(404).json({ message: 'Recipe, NOT FOUND' });
    }

    res.status(200).json({ message: 'Recipe unfavorited' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllFavoritedRecipe(req, res) {
  let userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: 'Credentials are missing' });
  }

  try {
    let findUsersFavoritedRecipes = await favoriteModel.findAll({
      where: { userId },
      attributes: ['recipeId'],
    });

    if (findUsersFavoritedRecipes.length === 0) {
      return res
        .status(404)
        .json({ message: 'User of ' + userId + ' ID Recipes, NOT FOUND' });
    }

    let recipesRecords = [];

    for (let i = 0; i < findUsersFavoritedRecipes.length; i++) {
      recipesRecords.push(findUsersFavoritedRecipes[i].recipeId);
    }

    let favoritedRecipes = await recipeModel.findAll({
      where: { id: { [Op.in]: recipesRecords } },
    });

    if (favoritedRecipes.length === 0) {
      return res.status(404).json({ message: 'Users, NOT FOUND' });
    }

    res.status(200).json({ favoritedRecipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { favoriteARecipe, unfavoriteARecipe, getAllFavoritedRecipe };
