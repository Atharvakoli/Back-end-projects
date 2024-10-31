const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Marketing",
  },
];

app.get("/", (req, res) => {
  res.send("API Testing 1");
});

async function getAllEmployees() {
  return employees;
}

async function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}
async function addNewEmployee(newEmployeeDetails) {
  let newEmployee = {
    id: employees.length + 1,
    ...newEmployeeDetails,
  };
  employees.push(newEmployee);
  return newEmployee;
}

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

module.exports = { app, getAllEmployees, getEmployeeById, addNewEmployee };
