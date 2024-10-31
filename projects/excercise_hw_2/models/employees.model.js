let { sequelize, dataTypes } = require("../lib/index.js");

let employeesModel = sequelize.define("employees", {
  name: dataTypes.TEXT,
  designation: dataTypes.TEXT,
  department: dataTypes.TEXT,
  salary: dataTypes.INTEGER,
});

module.exports = { employeesModel };
