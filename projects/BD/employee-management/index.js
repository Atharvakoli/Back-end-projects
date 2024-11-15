const express = require("express");
const { seedDB } = require("./controllers/seedDB.controller");
const {
  getAllEmployees,
  getEmpoyeeByID,
  getEmployeeByDepartmentID,
  getEmployeeByRoleID,
  getEmployeesOrderedByName,
  addNewEmployee,
  updatedEmployeeDetails,
  deleteEmployee,
} = require("./controllers/employee.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Employee Mangement System :) ");
});

app.get("/seed_db", seedDB);
app.get("/employees", getAllEmployees);
app.get("/employees/details/:id", getEmpoyeeByID);
app.get("/employees/department/:departmentId", getEmployeeByDepartmentID);
app.get("/employees/role/:roleId", getEmployeeByRoleID);
app.get("/employees/sort-by-name", getEmployeesOrderedByName);
app.post("/employees/new", addNewEmployee);
app.post("/employees/update/:id", updatedEmployeeDetails);
app.post("/employees/delete", deleteEmployee);

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});
