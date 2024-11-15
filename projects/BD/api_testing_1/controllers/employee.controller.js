const { employees } = require("../employeeData");

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

module.exports = { getAllEmployees, getEmployeeById, addNewEmployee };
