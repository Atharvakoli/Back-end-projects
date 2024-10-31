const { Op } = require("sequelize");
let { likeModel } = require("../models/like.model.js");
const { bookModel } = require("../models/book.model.js");

async function allowUserToLikeABook(req, res) {
  let userId = req.params.id;
  let bookId = req.query.bookId;

  if (!userId || !bookId) {
    return res.status(404).json({ message: "Credentails are missing :) " });
  }

  try {
    let likeBook = await likeModel.create({
      userId,
      bookId,
    });

    if (!likeMovie) {
      return res.status(404).json({ message: "Movie, NOT FOUND" });
    }

    res.status(200).json({
      message: "User of " + userId + " ID, Liked book of " + bookId + " ID",
      likeMovie,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function allowUserToDislike(req, res) {
  let userId = req.params.id;
  let bookId = req.query.bookId;

  if (!userId || !bookId) {
    return res.status(404).json({ message: "Credentials are missing :) " });
  }

  try {
    let likedBooksByAnUser = await likeModel.destroy({
      where: { userId, bookId },
    });

    if (!likedBooksByAnUser) {
      return res.status(404).json({ message: "Books, NOT FOUND" });
    }

    res
      .status(200)
      .json({ message: "Movie has been Disliked by " + userId + " User" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllLikedBooks(req, res) {
  let userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let findUsersSpecificLikedBooks = await likeModel.findAll({
      where: { userId },
      attributes: ["bookId"],
    });

    if (findUsersSpecificLikedBooks.length === 0) {
      return res.status(404).json({ message: "Users liked Books, NOT FOUND" });
    }

    let booksRecords = [];

    for (let i = 0; i < findUsersSpecificLikedBooks.length; i++) {
      booksRecords.push(findUsersSpecificLikedBooks[i].bookId);
    }

    let alllikedBooks = await bookModel.findAll({
      where: { id: { [Op.in]: booksRecords } },
    });

    if (alllikedBooks.length === 0) {
      return res.status(404).json({ message: "Books, NOT FOUND" });
    }

    res.status(200).json({ alllikedBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { allowUserToLikeABook, allowUserToDislike, getAllLikedBooks };
