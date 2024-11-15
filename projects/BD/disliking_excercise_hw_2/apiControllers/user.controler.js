const { Op } = require("sequelize");
let { likeModel } = require("../models/like.model.js");
const { movieModel } = require("../models/movie.model.js");

async function likeAMovie(req, res) {
  let userId = req.params.id;
  let movieId = req.query.movieId;

  if (!userId || !movieId) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  console.log(userId, movieId);

  try {
    let likedMovie = await likeModel.create({
      userId,
      movieId,
    });

    console.log(likedMovie);

    if (!likedMovie.length) {
      return res.status(404).json({
        message: "Something went wrong, while making movies as liked movie",
      });
    }

    res.status(200).json({
      message:
        "User of " + userId + " ID, has liked movie of " + movieId + " ID :) ",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function dislikeAMovie(req, res) {
  let userId = req.params.id;
  let movieId = req.query.movieId;

  if (!userId || !movieId) {
    return res.status(404).json({ message: "Credentials are missing..!" });
  }

  try {
    let dislikeMovie = await likeModel.destroy({ where: { userId, movieId } });

    if (dislikeAMovie.length === 0) {
      return res.status(404).json({ message: "Movie, NOT FOUND" });
    }

    res.status(200).json({
      message:
        "Movie of " + movieId + " ID, has disliked by " + userId + " User :) ",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllLikedMovies(req, res) {
  let userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: "Credentials are missing :) " });
  }

  try {
    let findUsersLikedMovie = await likeModel.findAll({
      where: { userId },
      attributes: ["movieId"],
    });

    if (findUsersLikedMovie.length === 0) {
      return res.status(404).json({ message: "Users liked Movies, NOT FOUND" });
    }

    let movieRecords = [];

    for (let i = 0; i < findUsersLikedMovie.length; i++) {
      movieRecords.push(findUsersLikedMovie[i].movieId);
    }

    let likedMovies = await movieModel.findAll({
      where: { id: { [Op.in]: movieRecords } },
    });

    if (likedMovies.length === 0) {
      return res.status(404).json({ message: "Movies, NOT FOUND" });
    }

    res.status(200).json({ likedMovies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { likeAMovie, dislikeAMovie, getAllLikedMovies };
