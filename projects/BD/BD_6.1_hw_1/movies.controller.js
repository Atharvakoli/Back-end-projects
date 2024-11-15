const { movies } = require("./movieData");

function getMovies() {
  return movies;
}

function getMovieById(id) {
  let findedMovie = movies.find((movie) => movie.id === id);
  return findedMovie;
}

function addNewMovie(newMovieDetails) {
  let newMovie = {
    id: movies.length + 1,
    ...newMovieDetails,
  };

  movies.push(newMovie);

  return newMovie;
}

module.exports = { getMovies, getMovieById, addNewMovie };
