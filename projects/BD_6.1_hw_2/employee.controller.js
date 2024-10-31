const {employees} = require('./employeeData.js');

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

module.exports = { getAllEmployees, getEmployeeById, addNewEmployee };
