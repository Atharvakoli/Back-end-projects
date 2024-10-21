let { dataTypes, sequelize } = require("../lib/index.js");

let courseModel = sequelize.define("courses", {
  title: dataTypes.TEXT,
  description: dataTypes.TEXT,
});

module.exports = { courseModel };
