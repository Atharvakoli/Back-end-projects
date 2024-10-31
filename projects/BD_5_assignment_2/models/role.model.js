let { dataTypes, sequelize } = require("../lib/index.js");

let roleModel = sequelize.define("roles", {
  title: dataTypes.STRING,
});

module.exports = { roleModel };
