const express = require("express");
const {
  getArticles,
  getArticleById,
  getComments,
  getCommentsById,
  getUsers,
  getUserById,
} = require("./articles");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api Error Testing HW_3");
});

app.get("/api/articles", async (req, res) => {
  let articles = await getArticles();

  if (articles.length === 0) {
    return res.status(404).json({ error: "Articles, NOT FOUND" });
  }
  res.status(200).json(articles);
});

app.get("/api/articles/:id", async (req, res) => {
  let article = await getArticleById(parseInt(req.params.id));

  if (!article) {
    return res.status(404).json({ error: "Article, NOT FOUND" });
  }
  res.status(200).json(article);
});

app.get("/api/comments", async (req, res) => {
  let comments = await getComments();

  if (comments.length === 0) {
    return res.status(404).json({ error: "Comments, NOT FOUND" });
  }
  res.status(200).json(comments);
});

app.get("/api/comments/:id", async (req, res) => {
  let comments = await getCommentsById(parseInt(req.params.id));

  if (!comments) {
    return res.status(404).json({ error: "Comments, NOT FOUND" });
  }
  res.status(200).json(comments);
});

app.get("/api/users", async (req, res) => {
  let users = await getUsers();

  if (users.length === 0) {
    return res.status(404).json({ error: "Users, NOT FOUND" });
  }
  res.status(200).json(users);
});

app.get("/api/users/:id", async (req, res) => {
  let user = await getUserById(parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "User, NOT FOUND" });
  }
  res.status(200).json(user);
});

module.exports = { app };
