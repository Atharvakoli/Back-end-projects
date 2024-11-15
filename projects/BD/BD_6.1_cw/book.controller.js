const { books } = require("../BD_6.1_cw/books.js");

function getBooks(req, res) {
  return books;
}

function getBookById(id) {
  let findBookById = books.find(book => book.id === id);
  return findBookById;
}

function addBook(newBookDetails) {
  let {title, author} = newBookDetails;
  let newBook = {
    id: books.length + 1,
    title,
    author,
  } 
  books.push(newBook);
  return newBook;
}

module.exports = { getBooks, getBookById, addBook };
