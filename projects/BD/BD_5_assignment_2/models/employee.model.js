let { dataTypes, sequelize } = require("../lib/index.js");

let employeeModel = sequelize.define("employees", {
  name: dataTypes.STRING,
  email: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
}, {
  timestamps: true
});

module.exports = { employeeModel };
