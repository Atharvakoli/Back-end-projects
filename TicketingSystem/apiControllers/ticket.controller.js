const { emit } = require("nodemon");
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

    let {
      ticketId,
      title,
      description,
      status,
      priority,
      customerId,
      agentId,
    } = newTicketsDetails;

    if (
      !ticketId ||
      !title ||
      !description ||
      !status ||
      !priority ||
      !customerId ||
      !agentId
    ) {
      return res.status(404).json({ message: "Credentials are missing...!" });
    }

    let existingTicket = await ticketModel.findOne({ where: { ticketId } });

    if (existingTicket) {
      return res.status(302).json({ message: "Ticket already existed...!" });
    }

    let findCustomer = await getTicketCustomers(customerId);
    let findAgent = await getTicketAgents(agentId);

    let newTicket = {
      ticketId,
      title,
      description,
      status,
      priority,
      customerId,
      agentId,
      customer: {
        ...findCustomer.dataValues,
      },
      agent: {
        ...findAgent.dataValues,
      },
    };

    await ticketModel.create(newTicket);

    res
      .status(201)
      .json({ message: "Adding New Ticket successful", newTicket });
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
    let { title, description, status, priority, customerId, agentId } =
      newTicketDetails;

    let findTicketById = await ticketModel.findOne({ where: { id } });

    if (!findTicketById) {
      return res.status(404).json({ message: "Ticket, NOT FOUND" });
    }

    let existingTicket = findTicketById.dataValues;

    let updateDetails = {
      title: !title ? existingTicket.title : title,
      description: !description ? existingTicket.description : description,
      status: !status ? existingTicket.status : status,
      priority: !priority ? existingTicket.priority : priority,
      customerId: !customerId ? existingTicket.customerId : customerId,
      agentId: !agentId ? existingTicket.agentId : agentId,
    };

    findTicketById.set(updateDetails);
    let updatedTicket = await findTicketById.save();

    res.status(200).json({ message: "Ticket has been Updated", updatedTicket });
  } catch (error) {
    res.status(500).jons({ error: error.message });
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
