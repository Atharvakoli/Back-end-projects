const express = require('express');
const { getBooks, addBook, getBookById } = require('./book.controller');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Writing Test for Apis...!");
})


app.get('/api/books', (req, res) => {
  const books = getBooks();
  res.json(books);
});
app.get('/api/books/:id', (req, res) => {
  let id = parseInt(req.params.id);
  const book = getBookById(id);
  res.json(book);
});

app.post('/api/books', (req, res) => {
  let newBookDetails = req.body;
  const book = addBook(newBookDetails);
  res.status(201).json(book);
})

app.listen(port, () => {
  console.log(`Example app is listening on http://localhost:${port}`);
})

module.exports = {app};