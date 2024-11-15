const express = require("express");
const { getGameById, getGames, getGenres, getGenreById } = require("./games");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api Error Testing HW_2");
});

app.get("/api/games", async (req, res) => {
  const games = await getGames();

  if (games.length === 0) {
    return res.status(404).json({ error: "Games, Not Found" });
  }
  res.status(200).json(games);
});

app.get("/api/games/:id", async (req, res) => {
  const game = await getGameById(parseInt(req.params.id));

  if (!game) {
    return res.status(404).json({ error: "Game, not found" });
  }
  res.status(200).json(game);
});

app.get("/api/genres", async (req, res) => {
  let genres = await getGenres();

  if (genres.length === 0) {
    return res.status(404).json({ error: "Genres, Not Found" });
  }
  res.status(200).json(genres);
});

app.get("/api/genres/:id", async (req, res) => {
  const genre = await getGenreById(parseInt(req.params.id));

  if (!genre) {
    return res.status(404).json({ error: "Genre, not found" });
  }
  res.status(200).json(genre);
});

module.exports = { app };
