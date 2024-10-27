const express = require("express");
const {
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
} = require("./controllers/games.controller.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api Testing hw_1");
});

app.get("/games", async (req, res) => {
  let games = await getAllGames();
  if (!games) return res.status(404).json({ message: "Games, NOT FOUND" });
  res.status(200).json({ games });
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
  if (!newGame) {
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
  if (!newDeveloper) {
    return res.status(404).json({ message: "developer, not Added" });
  }
  res.status(201).json(newDeveloper);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = { app };
