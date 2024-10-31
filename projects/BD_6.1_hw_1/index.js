const express = require('express');
const { getMovies, getMovieById, addNewMovie } = require('./movies.controller');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Writing Test for Apis...!");
})

app.get('/movies', (req, res) => {
  const movies = getMovies();
  res.json({movies});
})

app.get('/movies/:id', (req, res) => {
  let id = pareseInt(req.params.id);
  const movie = getMovieById(id);
  res.json({movie});
})

app.post('/movie', (req, res) => {
  let newMovieDetails = req.body;
  const movie = addNewMovie(newMovieDetails);
  res.status(201).json({movie});
})

app.listen(port, () => {
  console.log(`Example app is listening on http://localhost:${port}`);
})

module.exports = {app};