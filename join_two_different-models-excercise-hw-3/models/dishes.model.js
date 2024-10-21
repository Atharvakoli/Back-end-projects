let { dataTypes, sequelize } = require("../lib/index.js");

let dishesModel = sequelize.define("dishes", {
  name: dataTypes.TEXT,
  cuisine: dataTypes.TEXT,
  preparationTime: dataTypes.INTEGER,
});

module.exports = { dishesModel };
