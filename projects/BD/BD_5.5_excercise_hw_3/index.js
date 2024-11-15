const express = require('express');
const {
  seedDB,
  getAllRecipes,
} = require('./apiControllers/recipe.controller.js');
const {
  favoriteARecipe,
  unfavoriteARecipe,
  getAllFavoritedRecipe,
} = require('./apiControllers/user.controller');

const app = express();
const port = 3000;

app.use(express());

app.get('/', (req, res) => {
  res.send('Favorite and unFavorite the recipe :) ');
});

app.get('/seed_db', seedDB);
app.get('/recipes', getAllRecipes);

app.get('/users/:id/favorite', favoriteARecipe);
app.get('/users/:id/unfavorite', unfavoriteARecipe);
app.get('/users/:id/favorites', getAllFavoritedRecipe);

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});
