const { Op } = require("sequelize");
const { like } = require("../models/like.model");
const { movieModel } = require("../models/movie.model");
// const { op } = require("@sequelize/core");

async function likeMovie(req, res) {
  let userId = req.params.id;
  let movieId = req.query.movieId;
  try {
    if (!userId || !movieId) {
      return res.status(404).json({ message: "Credentials are missing :) " });
    }

    let newLike = await like.create({
      userId,
      movieId,
    });

    res.status(200).json({ message: "Movie Liked", newLike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function dislikeMovie(req, res) {
  let userId = await req.params.id;
  let movieId = await req.query.movieId;

  if (!userId || !movieId) {
    return res.status(404).json({ message: "Credentials are missing :) " });
  }

  try {
    let dislikeMovie = await like.destroy({ where: { userId, movieId } });

    if (!dislikeMovie) {
      return res.status(404).json({ message: "Movie, NOT FOUND" });
    }
    res
      .status(200)
      .json({ message: "Movie has been Disliked by " + userId + " User " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function likeAllMovies(req, res) {
  let userId = req.params.id;
  if (!userId) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }
  try {
    let likedAllMovies = await like.findAll({
      where: { userId },
      attributes: ["movieId"],
    });

    if (likeAllMovies.length === 0) {
      return res.status(404).json({ message: "Liked Movies, NOT FOUND" });
    }

    let movieRecords = [];

    for (let i = 0; i < likedAllMovies.length; i++) {
      movieRecords.push(likedAllMovies[i].movieId);
    }

    // to check if column value is with in a specified area of values that we are giving
    // it will match wheather each of this ID is present
    let likedMovies = await movieModel.findAll({
      where: { id: { [Op.in]: movieRecords } },
    });

    if (likedMovies.length === 0) {
      return res.status(404).json({
        message: "Movies of " + movieRecords.join(", ") + " NOT FOUND :)",
      });
    }

    res.status(200).json({ likedMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLikedMovieByParticularArtist(req, res) {
  let userId = req.params.id;
  let artist = req.query.artist;

  if (!userId || !artist) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }
  try {
    let likedMoviesByParticularArtist = await like.findAll({
      where: { userId },
      attributes: ["movieId"],
    });

    let movieRecords = [];

    for (let i = 0; i < likedMoviesByParticularArtist.length; i++) {
      movieRecords.push(likedMoviesByParticularArtist[i].movieId);
    }

    let likedMovies = await movieModel.findAll({
      where: { id: { [Op.in]: movieRecords }, artist },
    });

    if (likedMovies.length === 0) {
      return res.status(404).json({
        message: "Movies of " + movieRecords.join(", ") + " NOT FOUND :)",
      });
    }
    res.status(200).json({ likedMovies });
  } catch (eror) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  likeMovie,
  dislikeMovie,
  likeAllMovies,
  getLikedMovieByParticularArtist,
};
