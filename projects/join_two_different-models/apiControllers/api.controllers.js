let { sequelize } = require("../lib/index.js");
let { movieModel } = require("../models/movie.model.js");
let { movieData } = require("../db/movieData.js");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await movieModel.bulkCreate(movieData);

    res.status(200).json({ message: "Database seeding Successful :)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllMovies(req, res) {
  try {
    let movies = await movieModel.findAll();

    if (movies.length === 0) {
      res.status(404).json({ movies: "Movies, NOT FOUND" });
      return;
    }

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postMovies(req, res) {
  try {
    let newMovie = req.body.newMovie;
    await movieModel.create(newMovie);
    res.status(200).json({ message: "Added Movie successfully :)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateMovieById(req, res) {
  let id = parseInt(req.params.id);
  try {
    let newMovieData = req.body;

    let findMovieToUpdate = await movieModel.findOne({ where: { id } });

    if (findMovieToUpdate === null) {
      return res
        .status(404)
        .json({ message: "Movie with " + id + " ID, NOT FOUND ...!" });
    }

    findMovieToUpdate.set(newMovieData);

    let updatedMovie = await findMovieToUpdate.save();

    if (updatedMovie === null) {
      return res.status(404).json({ movies: "Movies, NOT FOUND" });
    }

    res
      .status(200)
      .json({ message: "Movie with " + id + " ID, Updated successfully :)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteMovieByID(req, res) {
  let id = parseInt(req.body.id);
  try {
    let movie = await movieModel.destroy({ where: { id } });

    if (movie === 0) {
      return res
        .status(200)
        .json({ message: "Movie of " + id + " ID, NOT FOUND" });
    }

    res
      .status(200)
      .json({ message: "Movie of " + id + " ID, Deleted successfully :) " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  seedDB,
  getAllMovies,
  postMovies,
  updateMovieById,
  deleteMovieByID,
};
