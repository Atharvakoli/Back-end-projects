const express = require("express");
const { getAllEmployees, getEmployeeById, addNewEmployee } = require("./employee.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Writing Test for Apis...!");
});

app.get('/employees', (req, res) => {
  let employees = getAllEmployees();
  res.json({employees});
})

app.get('/employees/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeeById(id);
  res.json({employee});
})

app.post('/employees/new', (req, res) => {
  let newEmployeeDetails = req.body;
  let employee = addNewEmployee(newEmployeeDetails);
  res.status(201).json({employee});
})

app.listen(port, () => {
  console.log(`Example app is listening on http://localhost:${port}`);
});

module.exports = { app };
