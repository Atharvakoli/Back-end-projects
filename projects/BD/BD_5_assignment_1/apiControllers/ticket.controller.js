const {
  getTicketDetails,
  getTickets,
  getTicketCustomers,
  getTicketAgents,
} = require("../helperFunction/helperFunction");
const { dataTypes } = require("../lib");
const { ticketModel } = require("../models/ticket.model");
const { customerModel } = require("../models/customer.model");
const { agentModel } = require("../models/agent.model");
const { ticketAgentModel } = require("../models/ticketAgent.model");
const { ticketCustomerModel } = require("../models/ticketCustomer.model");
const { create } = require("domain");
const { where } = require("sequelize");

async function getAllTickets(req, res) {
  try {
    let tickets = await getTickets();

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "Tickets Details, NOT FOUND...!" });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTicketByID(req, res) {
  let ticketId = parseInt(req.params.id);

  if (!ticketId) {
    res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let ticketsDetails = await getTickets();

    if (ticketsDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "Tickets Details, NOT FOUND...!" });
    }

    let ticket = ticketsDetails.filter((tick) => tick.id === ticketId);

    if (ticket.length === 0) {
      return res
        .status(404)
        .json({ message: "Ticket of " + ticketId + " ID, NOT FOUND...!" });
    }

    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTicketByStatus(req, res) {
  let status = req.params.status;

  if (!status) {
    res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let tickets = await getTickets();

    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "Ticket of " + status + " STATUS, NOT FOUND...!" });
    }

    let getTicketsByStatus = tickets.filter(
      (ticket) => ticket.status.toLowerCase() === status.toLowerCase()
    );

    res.status(200).json({ tickets: getTicketsByStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTicketOrderedByPriority(req, res) {
  try {
    let tickets = await getTickets();

    if (tickets.length === 0) {
      return res.status(404).json({ message: "Tickets, NOT FOUND...!" });
    }

    let orderTheTicketsByPriority = tickets.sort(
      (a, b) => a.priority - b.priority
    );

    res.status(200).json({ tickets: orderTheTicketsByPriority });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addNewTicket(req, res) {
  try {
    let newTicketsDetails = req.body.newTicket;

    if (!newTicketsDetails) {
      return res.status(404).json({ message: "Credentials are missing..!" });
    }

    let { title, description, status, priority, customerId, agentId } =
      newTicketsDetails;

    if (
      !title ||
      !description ||
      !status ||
      !priority ||
      !customerId ||
      !agentId
    ) {
      return res.status(404).json({ message: "Credentials are missing...!" });
    }

    let tickets = await getTickets();

    let createTicket = {
      ticketId: parseInt(tickets.length + 1),
      title,
      description,
      status,
      priority,
      customerId,
      agentId,
    };

    const ticket = await ticketModel.create(createTicket);

    await ticketCustomerModel.create({
      ticketId: ticket.id,
      customerId: ticket.customerId,
    });
    await ticketAgentModel.create({
      ticketId: ticket.id,
      agentId: ticket.agentId,
    });

    const ticketDetails = await getTicketDetails(ticket);

    res.status(200).json({ ticketDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTicketDetails(req, res) {
  let id = parseInt(req.params.id);
  let newTicketDetails = req.body;

  if (!newTicketDetails || !id) {
    return res.status(404).json({ message: "Credentials are missing..!" });
  }

  try {
    let findTicketById = await ticketModel.findOne({ where: { id } });

    if (!findTicketById) {
      return res.status(404).json({ message: "Ticket, NOT FOUND" });
    }

    if (newTicketDetails.title) findTicketById.title = newTicketDetails.title;
    if (newTicketDetails.description)
      findTicketById.description = newTicketDetails.description;
    if (newTicketDetails.status)
      findTicketById.status = newTicketDetails.status;
    if (newTicketDetails.priority)
      findTicketById.priority = newTicketDetails.priority;

    if (newTicketDetails.customerId) {
      await ticketCustomerModel.destroy({ where: { tickedId: id } });
      await ticketCustomerModel.create({
        ticketId: id,
        customerId: newTicketDetails.customerId,
      });
    }

    if (newTicketDetails.agentId) {
      await ticketAgentModel.destroy({ where: { ticketId: id } });
      await ticketAgentModel.create({
        ticketId: id,
        agentId: newTicketDetails.agentId,
      });
    }

    await findTicketById.save();

    let ticketDetails = await getTicketDetails(findTicketById);

    res.status(200).json({
      message: "Ticket has been Updated",
      updatedTicket: ticketDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTicket(req, res) {
  let id = req.body.id;

  if (!id) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }
  try {
    let findTicketById = await ticketModel.destroy({ where: { id } });

    if (!findTicketById) {
      return res
        .status(404)
        .json({ message: "Ticket of " + id + " ID, NOT FOUND...!" });
    }
    res
      .status(200)
      .json({ mesage: "Ticket of " + id + " ID, deleted successfully." });
  } catch (error) {
    res.status(500).jons({ error: error.message });
  }
}

module.exports = {
  getAllTickets,
  getTicketByID,
  getTicketByStatus,
  getTicketOrderedByPriority,
  addNewTicket,
  updateTicketDetails,
  deleteTicket,
};
