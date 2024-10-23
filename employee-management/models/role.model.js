let { dataTypes, sequelize } = require("../lib/index.js");

let roleModel = sequelize.define("roles", {
  title: {
    type: dataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { roleModel };
