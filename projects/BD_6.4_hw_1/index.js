const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  getDepartmentById,
  getDepartments,
} = require("./employees");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api Error Testing HW_1");
});

app.get("/api/employees", async (req, res) => {
  let employees = await getEmployees();

  if (employees.length === 0) {
    return res.status(404).json({ error: "Employees, Not Found" });
  }
  res.status(200).json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  let employee = await getEmployeeById(parseInt(req.params.id));

  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  res.status(200).json(employee);
});

app.get("/api/departments", async (req, res) => {
  let departments = await getDepartments();

  if (departments.length === 0) {
    return res.status(404).json({ error: "departments, not found" });
  }
  res.status(200).json(departments);
});

app.get("/api/departments/:id", async (req, res) => {
  let department = await getDepartmentById(parseInt(req.params.id));

  if (!department) {
    return res.status(404).json({ error: "department, not found" });
  }
  res.status(200).json(department);
});

module.exports = { app };
