let { sequelize } = require("../lib/index.js");
let { postsModel } = require("../models/posts.model.js");
let { postsData } = require("../db/postsData.js");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await postsModel.bulkCreate(postsData);

    res.status(200).json({ message: "Database seeding Successful :)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllPosts(req, res) {
  try {
    let posts = await postsModel.findAll();

    if (posts.length === 0) {
      res.status(404).json({ posts: "Posts, NOT FOUND" });
      return;
    }

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addNewPosts(req, res) {
  try {
    let newPost = req.body.newPost;

    if (newPost === null) {
      return {};
    }

    await postsModel.create(newPost);

    res.status(200).json({ message: "New..! Post Added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePostById(req, res) {
  let id = req.params.id;
  let { title, content, author } = req.body;

  console.log(title, content, author);

  if (title === undefined && content === undefined && author === undefined) {
    return res.status(404).json({ message: "Your credentials are missing..!" });
  }

  let findPostById = await postsModel.findOne({
    where: { id },
  });

  if (!findPostById) {
    return res
      .status(404)
      .json({ message: "Post of " + id + " ID, NOT FOUND" });
  }

  let newPostsData = {
    title,
    content,
    author,
  };

  findPostById.set(newPostsData);
  await findPostById.save();

  res.status(200).json({ message: "Posts has Updated successfully :)" });
}

async function deletePost(req, res) {
  let id = req.body.id;

  if (id === undefined) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  let posts = await postsModel.destroy({ where: { id } });

  if (posts === null) {
    return res
      .status(404)
      .json({ message: "Post of " + id + " ID, NOT FOUND" });
  }

  res
    .status(200)
    .json({ message: "Movie of " + id + " ID, Deleted successfully :) " });
}

module.exports = {
  seedDB,
  getAllPosts,
  addNewPosts,
  updatePostById,
  deletePost,
};
