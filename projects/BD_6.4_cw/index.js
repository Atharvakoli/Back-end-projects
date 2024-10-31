let {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
  getUserById,
} = require("./book");
const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await getBookById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: "Book, Not Found" });
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await getReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: "NO reviews found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await getReviewById(parseInt(req.params.id));
    if (!review) return res.status(404).json({ error: "Review, Not Found" });
    return res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const users = await getUserById(parseInt(req.params.id));

    if (!users) {
      return res.status(404).json({ error: "User, Not Found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
