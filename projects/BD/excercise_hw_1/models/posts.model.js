let { sequelize, dataTypes } = require("../lib/index.js");

let postsModel = sequelize.define("posts", {
  title: dataTypes.TEXT,
  content: dataTypes.TEXT,
  author: dataTypes.TEXT,
});

module.exports = { postsModel };
