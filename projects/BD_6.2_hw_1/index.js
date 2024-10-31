const express = require("express");
const app = express();
app.use(express.json());

const employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

function getAllEmployees() {
  return employees;
}

function getEmployeeById(id) {
  let findEmployeeById = employees.find((employee) => employee.id === id);
  return findEmployeeById;
}

function addNewEmployee(newEmployeeDetails) {
  let newEmployee = {
    id: employees.length + 1,
    ...newEmployeeDetails,
  }

  employees.push(newEmployee);
  return newEmployee;
}

app.get('/', (req, res) => {
  res.send('Writing Mock Functions');
})


app.get("/employees", (req, res) => {
  let employees = getAllEmployees();
  res.json(employees);
});

app.get('/employees/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeeById(id);
  res.json(employee);
})

app.post('/employees/new', (req, res) => {
  let newEmployeeDetails = req.body;
  let newEmployee = addNewEmployee(newEmployeeDetails);
  res.status(201).json(newEmployee);
})

module.exports = {app, getAllEmployees, getEmployeeById, addNewEmployee };