const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Testing :) ");
});

let reviews = [
  { id: 1, content: "Greate product!", userId: 1 },
  { id: 2, content: "Not bad, could be better!", userId: 2 },
];

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

async function getAllReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function addReviews(newReview) {
  let review = {
    id: reviews.length + 1,
    ...newReview,
  };
  reviews.push(review);
  return review;
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function addNewUser(newUser) {
  let user = {
    id: users.length + 1,
    ...newUser,
  };
  users.push(user);
  return user;
}

app.get("/reviews", async (req, res) => {
  const reviews = await getAllReviews();

  if (!reviews)
    return res.status(404).json({ message: "No reviews found :) " });
  res.status(200).json(reviews);
});

app.get("/reviews/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  const review = await getReviewById(id);
  if (!review) return res.status(404).send(review);
  res.status(200).json(review);
});

app.post("/reviews/new", async (req, res) => {
  let newProductsDetails = req.body;
  let newProduct = await addReviews(newProductsDetails);
  if (!newProduct) {
    res.status(404).json({ message: "Review, Not Added" });
  } else {
    res.status(201).json(newProduct);
  }
});

app.get("/users/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (!user) return res.status(404).send("User, not found");
  res.status(200).json(user);
});

app.post("/users/new", async (req, res) => {
  const newUser = await addNewUser(req.body);
  res.status(201).json(newUser);
});

module.exports = {
  app,
  port,
  getAllReviews,
  getReviewById,
  addReviews,
  getUserById,
  addNewUser,
};
