let { dataTypes, sequelize } = require("../lib/index.js");

let employeeModel = sequelize.define("employees", {
  name: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  email: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = { employeeModel };
