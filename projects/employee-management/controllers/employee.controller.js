const {
  getEmployees,
  getEmployeeDetails,
  getEmployeeRoles,
  getEmployeeDepartments,
} = require("../helpers/helpers");
const { departmentModel } = require("../models/department.model");
const { employeeModel } = require("../models/employee.model");
const {
  employeeDepartmentModel,
} = require("../models/employeeDepartment.model");
const { employeeRoleModel } = require("../models/employeeRole.model");
const { roleModel } = require("../models/role.model");

async function getAllEmployees(req, res) {
  try {
    let employees = await getEmployees();

    if (employees.length === 0) {
      return res.status(404).json({ message: "Employees, NOT FOUND :) " });
    }

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEmpoyeeByID(req, res) {
  let id = parseInt(req.params.id);

  if (!id) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let employees = await getEmployees();

    if (employees.length === 0) {
      return res.status(404).json({ message: "Employees, NOT FOUND :) " });
    }

    let findEmployeeByID = employees.filter((employee) => employee.id === id);

    if (!findEmployeeByID) {
      return res
        .status(404)
        .json({ message: "Employee of " + id + " ID, NOT FOUND " });
    }

    res.status(200).json({ employees: findEmployeeByID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEmployeeByDepartmentID(req, res) {
  let departmentId = parseInt(req.params.departmentId);

  if (!departmentId) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let employees = await getEmployees();

    if (employees.length === 0) {
      return res.status(404).json({ message: "Employees, NOT FOUND :) " });
    }

    let getEmployeeByDepartmentID = employees.filter(
      (employee) => employee.department.id === departmentId
    );

    if (getEmployeeByDepartmentID.length === 0) {
      return res.status(404).json({
        message: "Employees of " + departmentId + " ID, NOT FOUND...!",
      });
    }
    res.status(200).json({ employees: getEmployeeByDepartmentID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEmployeeByRoleID(req, res) {
  let roleId = parseInt(req.params.roleId);

  if (!roleId) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let employees = await getEmployees();

    if (employees.length === 0) {
      return res.status(404).json({ message: "Employees, NOT FOUND :) " });
    }

    let getEmployeeByRoleID = employees.filter(
      (employee) => employee.role.id === roleId
    );

    if (getEmployeeByRoleID.length === 0) {
      return res
        .status(404)
        .json({ message: "Employees of " + roleId + " ID, NOT FOUND...!" });
    }
    res.status(200).json({ employees: getEmployeeByRoleID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getEmployeesOrderedByName(req, res) {
  let order = req.query.order;

  if (!order) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let employees = await getEmployees();

    if (employees.length === 0) {
      return res.status(404).json({ message: "Employees, NOT FOUND :) " });
    }

    let sortedEmployees;
    if (order.toLowerCase() === "asc") {
      sortedEmployees = employees.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }

    console.log(sortedEmployees);

    res.status(200).json({ employees: sortedEmployees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addNewEmployee(req, res) {
  let newEmployeeDetails = req.body.newEmployee;

  if (!newEmployeeDetails) {
    return res.status(404).json({ message: "Employees, NOT FOUND" });
  }

  let { name, email, departmentId, roleId } = newEmployeeDetails;

  if (!name || !email || !departmentId || !roleId) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  try {
    let findDepartmentByID = await getEmployeeDepartments(departmentId);
    let findRoleById = await getEmployeeRoles(roleId);

    let newEmployee = {
      name,
      email,
      departmentId,
      roleId,
      deparment: {
        ...findDepartmentByID.dataValues,
      },
      agent: {
        ...findRoleById.dataValues,
      },
    };

    await employeeModel.create(newEmployee);

    res
      .status(201)
      .json({ massage: "New Employee is Created :)", newEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatedEmployeeDetails(req, res) {
  try {
    let id = req.params.id;
    let newDetailsToUpdate = req.body;

    let { name, email, departmentId, roleId } = newDetailsToUpdate;

    if (!name && !email && !departmentId && !roleId) {
      return res.status(404).json({ message: "Credentials are missing...!" });
    }

    let findEmployeeByID = await employeeModel.findOne({
      where: { id },
    });

    if (!findEmployeeByID) {
      return res
        .status(404)
        .json({ message: "Employee of " + id + " ID, NOT FOUND" });
    }

    let department;
    if (departmentId) {
      department = await employeeModel.findOne({
        where: { employeeId: parseInt(departmentId) },
      });
    }

    let roles;
    if (roleId) {
      roles = await employeeRoleModel.findOne({
        where: { employeeId: parseInt(roleId) },
      });
    }

    let existing = findEmployeeByID.dataValues;

    let departmentDetails = {
      ...department.dataValues,
    };
    let roleDetails = {
      ...roles.dataValues,
    };

    let updatedDetails = {
      name: !name ? existing.name : name,
      email: !email ? existing.email : email,
      deparment: departmentId && departmentDetails,
      role: roleId && roleDetails,
    };

    res.status(200).json({
      message: "Employee has Updated successfully :) ",
      updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    let id = req.body.id;

    let deleteEmplyeeById = await employeeModel.destroy({ where: { id } });

    if (!deleteEmplyeeById) {
      return res
        .status(404)
        .json({ message: "Employee of " + id + " ID, NOT FOUND...!" });
    }
    res
      .status(200)
      .json({ mesage: "Ticket of " + id + " ID, deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllEmployees,
  getEmpoyeeByID,
  getEmployeeByDepartmentID,
  getEmployeeByRoleID,
  getEmployeesOrderedByName,
  addNewEmployee,
  updatedEmployeeDetails,
  deleteEmployee,
};
