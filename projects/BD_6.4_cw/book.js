let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

let reviews = [{ id: 1, bookId: 1, content: "Great book!" }];

let users = [{ id: 1, name: "John Doe", email: "john@example.com" }];

async function getBooks() {
  return books;
}

async function getBookById(id) {
  return books.find((book) => book.id === id);
}

async function getReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  getBooks,
  getBookById,
  getReviewById,
  getReviews,
  getUserById,
};
