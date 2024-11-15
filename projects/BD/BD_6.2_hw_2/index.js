const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Writing Mock Functions");
});

const movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
];

function getAllMovies() {
  return movies;
}

function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function addNewMovie(movie) {
  let newMovie = {
    id: movies.length + 1,
    ...movie,
  };
  movies.push(newMovie);
  return newMovie;
}

app.get("/movies", (req, res) => {
  let movies = getAllMovies();

  if (!movies) {
    res.json({ message: "Movies Not Found" });
  } else {
    res.json({ movies });
  }
});

app.get("/movies/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);

  if (!movie) {
    res.json({ message: "Movie Not Found" });
  } else {
    res.json({ movie });
  }
});

app.get("/movies/new", (req, res) => {
  let newMovieDetails = req.body;
  let newMovie = addNewMovie(newMovieDetails);

  if (!newMovie) {
    res.json({ message: "Movie Not Added" });
  } else {
    res.status(201).json(newMovie);
  }
});

module.exports = { app, getAllMovies, getMovieById, addNewMovie};
