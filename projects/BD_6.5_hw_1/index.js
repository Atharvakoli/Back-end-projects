const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API testing and validating user input HW_1");
});

let games = [];
let tournaments = [];

function validateGame(game) {
  if (!game.title || typeof game.title !== "string")
    return "Title is required and it should be string";
  if (!game.genre || typeof game.genre !== "string")
    return "Genre is required and it should be string";
  return null;
}

function validateTournamet(tournament) {
  if (!tournament.name || typeof tournament.name !== "string")
    return "Name is required and it should be string";
  if (!tournament.gameId || typeof tournament.gameId !== "number")
    return "GameId is required and it should be number";
  return null;
}

app.post("/api/games", (req, res) => {
  let error = validateGame(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let game = { id: games.length + 1, ...req.body };
  games.push(game);
  res.status(201).json(game);
});

app.post("/api/tournaments", (req, res) => {
  let error = validateTournamet(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let tournament = { id: tournaments.length + 1, ...req.body };
  tournaments.push(tournament);
  res.status(201).json(tournament);
});

module.exports = { app, validateGame, validateTournamet };
