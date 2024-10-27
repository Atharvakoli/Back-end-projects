let { games, developers } = require("../gamesData.js");

async function getAllGames() {
  if (!games) return res.status(404).json({ message: "Games, NOT FOUND" });
  return games;
}

async function getGameById(id) {
  let findGameById = games.find((game) => game.id === id);
  return findGameById;
}

async function addNewGame(newGameDetails) {
  let newGame = {
    id: games.length + 1,
    ...newGameDetails,
  };

  games.push(newGame);
  return newGame;
}

async function getDeveloperById(id) {
  let developerById = developers.find((developer) => developer.id === id);
  return developerById;
}

async function addNewDeveloper(newDeveloperDetails) {
  let { name, country } = newDeveloperDetails;

  let newDeveloper = {
    id: developers.length + 1,
    name,
    country,
  };
  developers.push(newDeveloper);
  return newDeveloper;
}

module.exports = {
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
};
