const { departmentModel } = require("../models/department.model");
const { employeeModel } = require("../models/employee.model");
const {
  employeeDepartmentModel,
} = require("../models/employeeDepartment.model");
const { employeeRoleModel } = require("../models/employeeRole.model");
const { roleModel } = require("../models/role.model");

async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartmentModel.findAll({
    where: { employeeId },
  });

  let departmentData;
  for (let empDep of employeeDepartments) {
    departmentData = await departmentModel.findOne({
      where: { id: empDep.departmentId },
    });
  }

  return departmentData;
}

async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRoleModel.findAll({
    where: { employeeId },
  });

  let rolesData;
  for (let empRole of employeeRoles) {
    rolesData = await roleModel.findOne({
      where: { id: empRole.roleId },
    });
  }

  return rolesData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const department = await getEmployeeDepartments(employeeData.id);
  const role = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department,
    role,
  };
}

async function getEmployees() {
  let employeesDetails = await employeeModel.findAll();

  let employees = [];

  for (let i = 0; i < employeesDetails.length; i++) {
    let details = await getEmployeeDetails(employeesDetails[i]);
    employees.push(details);
  }

  return employees;
}

module.exports = {
  getEmployeeDetails,
  getEmployees,
  getEmployeeRoles,
  getEmployeeDepartments,
};
