const { dataTypes, sequelize } = require("../lib/index.js");

let agentModel = sequelize.define("agents", {
  agentId: dataTypes.INTEGER,
  name: dataTypes.STRING,
  email: dataTypes.STRING,
});

module.exports = { agentModel };
