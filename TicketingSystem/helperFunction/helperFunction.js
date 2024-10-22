const { agentModel } = require("../models/agent.model");
const { customerModel } = require("../models/customer.model");
const { ticketModel } = require("../models/ticket.model");
const { ticketAgentModel } = require("../models/ticketAgent.model");
const { ticketCustomerModel } = require("../models/ticketCustomer.model");

async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomerModel.findAll({
    where: { ticketId },
  });

  let customerData;
  for (let cus of ticketCustomers) {
    customerData = await customerModel.findOne({
      where: { customerId: cus.customerId },
    });
  }

  return customerData;
}

async function getTicketAgents(ticketId) {
  const ticketAgent = await ticketAgentModel.findAll({ where: { ticketId } });

  let agentsData;
  for (let agents of ticketAgent) {
    agentsData = await agentModel.findOne({
      where: { agentId: agents.agentId },
    });
  }

  return agentsData;
}

// Helper function to get ticket details with associated customers and agents
async function getTicketDetails(ticketData) {
  const customer = await getTicketCustomers(ticketData.id);
  const agent = await getTicketAgents(ticketData.id);

  return {
    ...ticketData.dataValues,
    customer,
    agent,
  };
}

async function getTickets() {
  let allTickets = await ticketModel.findAll();

  let tickets = [];

  for (let i = 0; i < allTickets.length; i++) {
    let ticketDetails = await getTicketDetails(allTickets[i]);
    tickets.push(ticketDetails);
  }
  return tickets;
}

module.exports = { getTickets, getTicketCustomers, getTicketAgents };
