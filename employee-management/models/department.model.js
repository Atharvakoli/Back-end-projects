let { dataTypes, sequelize } = require("../lib/index.js");

let departmentModel = sequelize.define("departments", {
  name: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: true,
  },
});

module.exports = { departmentModel };
