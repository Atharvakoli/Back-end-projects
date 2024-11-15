let { bookModel } = require("../models/book.model.js");
let { sequelize } = require("../lib/index.js");

let { bookData } = require("../db/booksData.js");
const { userModel } = require("../models/user.model.js");

async function seedDb(req, res) {
  try {
    await sequelize.sync({ force: true });
    await bookModel.bulkCreate(bookData);

    await userModel.create({
      username: "atharva koli",
      email: "koliatharva@gmail.com",
      password: "kingKongAtharva06",
    });

    res.status(200).json({ message: "Database seeding successful :) " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllBooks(req, res) {
  try {
    let books = await bookModel.findAll();

    if (!books) {
      return res.status(404).json({ books: "Books, NOT FOUND" });
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { seedDb, getAllBooks };
