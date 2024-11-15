const express = require("express");
const { seedDb, getAllMovies } = require("./apiControllers/movie.controllers");
const {
  likeAMovie,
  dislikeAMovie,
  getAllLikedMovies,
} = require("./apiControllers/user.controler");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Like and Dislike the movies :)");
});

app.get("/seed_db", seedDb);
app.get("/movies", getAllMovies);

app.get("/users/:id/like", likeAMovie);
app.get("/users/:id/dislike", dislikeAMovie);
app.get("/users/:id/liked", getAllLikedMovies);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
