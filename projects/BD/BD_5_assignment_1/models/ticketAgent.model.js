let { dataTypes, sequelize } = require("../lib/index.js");
const { agentModel } = require("./agent.model.js");
const { ticketModel } = require("./ticket.model.js");

let ticketAgentModel = sequelize.define("ticketAgents", {
  ticketId: {
    type: dataTypes.INTEGER,
    references: {
      model: ticketModel,
      key: "id",
    },
  },
  agentId: {
    type: dataTypes.INTEGER,
    references: {
      model: agentModel,
      key: "id",
    },
  },
});

ticketModel.belongsToMany(agentModel, { through: ticketAgentModel });
agentModel.belongsToMany(ticketModel, { through: ticketAgentModel });

module.exports = { ticketAgentModel };
