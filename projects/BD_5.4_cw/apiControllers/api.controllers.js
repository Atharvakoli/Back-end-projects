let { sequelize } = require('../lib/index.js');
let { movieModel } = require('../models/movie.model.js');
let { movieData } = require('../db/movieData.js');

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await movieModel.bulkCreate(movieData);

    res.status(200).json({ message: 'Database seeding Successful :)' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllMovies(req, res) {
  try {
    let movies = await movieModel.findAll();

    if (movies.length === 0) {
      res.status(404).json({ movies: 'Movies, NOT FOUND' });
      return;
    }

    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  seedDB,
  getAllMovies,
};
