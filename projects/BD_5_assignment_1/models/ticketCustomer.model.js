let { dataTypes, sequelize } = require("../lib/index.js");
const { customerModel } = require("./customer.model.js");
const { ticketModel } = require("./ticket.model.js");

let ticketCustomerModel = sequelize.define("ticketCustomers", {
  ticketId: {
    type: dataTypes.INTEGER,
    references: {
      model: ticketModel,
      key: "id",
    },
  },
  customerId: {
    type: dataTypes.INTEGER,
    references: {
      model: customerModel,
      key: "id",
    },
  },
});

ticketModel.belongsToMany(customerModel, { through: ticketCustomerModel });
customerModel.belongsToMany(ticketModel, { through: ticketCustomerModel });

module.exports = { ticketCustomerModel };
