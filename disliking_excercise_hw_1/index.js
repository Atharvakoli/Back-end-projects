const express = require("express");
const { seedDb, getAllBooks } = require("./apiControllers/book.controllers");
const {
  allowUserToLikeABook,
  allowUserToDislike,
  getAllLikedBooks,
} = require("./apiControllers/user.controler");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Like and Dislike the books :)");
});

app.get("/seed_db", seedDb);
app.get("/books", getAllBooks);

app.get("/user/:id/like", allowUserToLikeABook);
app.get("/user/:id/dislike", allowUserToDislike);
app.get("/users/:id/liked", getAllLikedBooks);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
