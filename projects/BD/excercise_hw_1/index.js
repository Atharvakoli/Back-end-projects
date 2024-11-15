const express = require("express");

let {
  seedDB,
  getAllPosts,
  addNewPosts,
  updatePostById,
  deletePost,
} = require("./apiControllers/api.controllers.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Post Requests HW_1");
});

app.get("/seed_db", seedDB);
app.get("/posts", getAllPosts);
app.post("/posts/new", addNewPosts);
app.post("/posts/update/:id", updatePostById);
app.post("/posts/delete", deletePost);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
