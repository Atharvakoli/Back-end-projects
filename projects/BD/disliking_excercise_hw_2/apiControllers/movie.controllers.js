let { sequelize } = require("../lib/index.js");

let { moviesData } = require("../db/moviesData.js");
const { movieModel } = require("../models/movie.model.js");
const { userModel } = require("../models/user.model.js");

async function seedDb(req, res) {
  try {
    await sequelize.sync({ force: true });
    await movieModel.bulkCreate(moviesData);

    await userModel.create({
      username: "moviefan",
      email: "moviefan@gmail.com",
      password: "password123",
    });

    res.status(200).json({ message: "Database seeding successful :) " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllMovies(req, res) {
  try {
    let movies = await movieModel.findAll();

    if (movies.length === 0) {
      return res.status(404).json({ movies: "Movies, NOT FOUND" });
    }
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { seedDb, getAllMovies };
