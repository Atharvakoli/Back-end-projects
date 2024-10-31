const express = require("express");
const { seedDB } = require("./apiControllers/seedDB.controller");
const {
  getAllTickets,
  getTicketByID,
  getTicketByStatus,
  getTicketOrderedByPriority,
  addNewTicket,
  updateTicketDetails,
  deleteTicket,
} = require("./apiControllers/ticket.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SPEC Document for Customer Support Ticketing System Backend");
});

app.get("/seed_db", seedDB);

app.get("/tickets", getAllTickets);
app.get("/tickets/details/:id", getTicketByID);
app.get("/tickets/status/:status", getTicketByStatus);
app.get("/tickets/sort-by-priority", getTicketOrderedByPriority);

app.post("/tickets/new", addNewTicket);
app.post("/tickets/update/:id", updateTicketDetails);
app.post("/ticket/delete", deleteTicket);

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});
