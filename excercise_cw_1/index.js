const express = require("express");

let {
  seedDB,
  getAllMovies,
  postMovies,
  updateMovieById,
  deleteMovieByID,
} = require("./apiControllers/api.controllers.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Post Requests");
});

// write an api to seeds this data
app.get("/seed_db", seedDB);
app.get("/movies", getAllMovies);
app.post("/movies/new", postMovies);
app.post("/movies/update/:id", updateMovieById);
app.post("/movies/delete", deleteMovieByID);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
