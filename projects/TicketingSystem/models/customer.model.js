let { dataTypes, sequelize } = require("../lib/index.js");

let customerModel = sequelize.define("customers", {
  customerId: dataTypes.INTEGER,
  name: dataTypes.STRING,
  email: dataTypes.STRING,
});

module.exports = { customerModel };
