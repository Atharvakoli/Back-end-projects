let { dataTypes, sequelize } = require("../lib/index.js");
const { agentModel } = require("./agent.model.js");
const { customerModel } = require("./customer.model.js");

let ticketModel = sequelize.define("tickets", {
  ticketId: dataTypes.INTEGER,
  title: dataTypes.STRING,
  description: dataTypes.STRING,
  status: dataTypes.STRING,
  priority: dataTypes.INTEGER,
  customerId: dataTypes.INTEGER,
  agentId: dataTypes.INTEGER,
}, {
  timestamps: true, 
});

module.exports = { ticketModel };
