let { sequelize } = require('../lib/index.js');
let { bookModel } = require('../models/book.model.js');
let { bookData } = require('../db/bookData.js');

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await bookModel.bulkCreate(bookData);

    res.status(200).json({ message: 'Database seeding successfully :) ' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllBooks(req, res) {
  try {
    let books = await bookModel.findAll();

    if (!books) {
      return res.status(404).json({ books: 'Books, NOT FOUND' });
    }

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { seedDB, getAllBooks };
