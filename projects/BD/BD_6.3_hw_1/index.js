const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];

const developers = [
  {
    id: 1,
    name: "Atharva",
    country: "India",
  },
  {
    id: 2,
    name: "Ayush",
    country: "USA",
  },
];

async function getAllGames() {
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

app.get("/", (req, res) => {
  res.send("Api Testing hw_1");
});

app.get("/games", async (req, res) => {
  let game = await getAllGames();
  if (game.length === 0) {
    return res.status(404).json({ message: "Games, NOT FOUND" });
  }
  res.status(200).json({ game });
});

app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let game = await getGameById(id);
  if (game === undefined) {
    return res.status(404).json({ message: "Game, Not Found" });
  }
  res.status(200).json({ game });
});

app.post("/games/new", async (req, res) => {
  let newGameDetails = req.body;
  let newGame = await addNewGame(newGameDetails);
  if (newGame === undefined) {
    return res.status(404).json({ message: "Game not Added" });
  }
  res.status(201).json(newGame);
});

app.get("/developers/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let developer = await getDeveloperById(id);
  if (!developer) {
    return res.status(404).json({ message: "developer not found" });
  }
  res.status(200).json(developer);
});

app.post("/developer/new", async (req, res) => {
  let newDeveloperDetails = req.body;
  let newDeveloper = await addNewDeveloper(newDeveloperDetails);
  if (newDeveloper === undefined) {
    return res.status(404).json({ message: "developer, not Added" });
  }
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
};
