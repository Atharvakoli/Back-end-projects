let { dataTypes, sequelize } = require("../lib/index.js");

let departmentModel = sequelize.define("departments", {
  name: dataTypes.STRING,
});

module.exports = { departmentModel };
