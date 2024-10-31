let { dataTypes, sequelize } = require("../lib/index.js");

let companyModel = sequelize.define("companies", {
  name: dataTypes.TEXT,
  industry: dataTypes.TEXT,
  foundedYear: dataTypes.INTEGER,
  headquarters: dataTypes.TEXT,
  revenue: dataTypes.INTEGER,
});

module.exports = { companyModel };
