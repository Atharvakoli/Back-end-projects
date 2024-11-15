const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  addNewEmployee,
} = require("./controllers/employee.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Testing 1");
});

app.get("/employees", async (req, res) => {
  let employees = await getAllEmployees();
  if (!employees)
    return res.status(404).json({ message: "Employees, NOT FOUND...!" });
  res.status(200).json(employees);
});

app.get("/employees/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let employee = await getEmployeeById(id);

  if (!employee) {
    return res.status(404).json({ message: "Employee, NOT FOUND...!" });
  }
  res.status(200).json(employee);
});

app.post("/employees/new", async (req, res) => {
  let newEmployeeDetails = req.body;
  let newEmployee = await addNewEmployee(newEmployeeDetails);

  if (!newEmployee) {
    return res.status(404).json({ message: "Employee, NOT FOUND...!" });
  }
  res.status(201).json(newEmployee);
});

module.exports = { app };
