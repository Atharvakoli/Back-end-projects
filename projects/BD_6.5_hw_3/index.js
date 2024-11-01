const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Endpoint testing and Functions validating HW_3");
});

let articles = [
  {
    id: 1,
    title: "Understanding JavaScript",
    content:
      "JavaScript is a versatile language used for both frontend and backend development.",
  },
  {
    id: 2,
    title: "Introduction to React",
    content:
      "React is a popular JavaScript library for building user interfaces.",
  },
];

let authors = [
  {
    id: 1,
    name: "John Doe",
    articleId: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    articleId: 2,
  },
];

function validateArticle(article) {
  if (!article.title || typeof article.title !== "string") {
    return "Article title is required and it should be string";
  }
  if (!article.content || typeof article.content !== "string") {
    return "Content is required and it should be string";
  }
  return null;
}

function validateAuthor(author) {
  if (!author.name || typeof author.name !== "string") {
    return "Author Name is required and it should be string";
  }
  if (!author.articleId || typeof author.articleId !== "number") {
    return "Article Id is required and it should be string";
  }
  return null;
}

app.post("/articles", (req, res) => {
  let error = validateArticle(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  let article = {
    id: articles.length + 1,
    ...req.body,
  };

  articles.push(article);
  res.status(201).json(article);
});

app.post("/authors", (req, res) => {
  let error = validateAuthor(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  let author = {
    id: authors.length + 1,
    ...req.body,
  };
  authors.push(author);
  res.status(201).json(author);
});

module.exports = { app, validateArticle, validateAuthor };
