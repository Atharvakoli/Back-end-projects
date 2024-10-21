const express = require("express");

let { seedDB, getAllMovies } = require("./apiControllers/api.controllers.js");

let {
  likeMovie,
  dislikeMovie,
  likeAllMovies,
  getLikedMovieByParticularArtist,
} = require("./apiControllers/user.controller.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Disliking A Movie");
});

// write an api to seeds this data
app.get("/seed_db", seedDB);
app.get("/movies", getAllMovies);

app.get("/users/:id/like", likeMovie);
app.get("/users/:id/dislike", dislikeMovie);
app.get("/user/:id/liked", likeAllMovies);
app.get("/users/:id/liked-artists", getLikedMovieByParticularArtist);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
