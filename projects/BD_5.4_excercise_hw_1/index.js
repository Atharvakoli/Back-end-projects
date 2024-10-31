let express = require('express');
let { seedDB, getAllBooks } = require('./apiControllers/book.controller.js');
const {
  getAllAuthors,
  addAuthor,
  updateAuthorById,
} = require('./apiControllers/author.controller.js');

let app = express();
let port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('join_two_different-models HW_1');
});

app.get('/seed_db', seedDB);
app.get('/books', getAllBooks);

app.get('/authors', getAllAuthors);
app.post('/authors/new', addAuthor);
app.post('/authors/update/:id', updateAuthorById);

app.listen(port, () => {
  console.log(`Example app listining at http://localhost:${port}`);
});
