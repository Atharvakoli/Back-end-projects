let { sequelize } = require("../lib/index.js");
let { employeesModel } = require("../models/employees.model.js");
let { employeesData } = require("../db/employeesData.js");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await employeesModel.bulkCreate(employeesData);

    res.status(200).json({ message: "Database seeding Successful :)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllEmployees(req, res) {
  try {
    let employees = await employeesModel.findAll();

    if (employees === null) {
      res.status(404).json({ posts: "Employees, NOT FOUND" });
      return;
    }

    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addNewEmployee(req, res) {
  let employee = req.body.newEmployee;

  if (!employee) {
    return res.status(404).json({ message: "To Update, I need your data..!" });
  }

  let { name, designation, department, salary } = employee;

  if (!name || !designation || !department || !salary) {
    return res.status(404).json({ message: "Some credentials are missing..!" });
  }

  let newEmployee = {
    name,
    designation,
    department,
    salary,
  };

  await employeesModel.create(newEmployee);

  res.status(200).json({ message: "Employee Added succefully :) " });
}

async function updateEmployeeById(req, res) {
  let id = req.params.id;
  let newEmployeeCredentials = req.body;

  if (id === undefined || newEmployeeCredentials === undefined) {
    return res.status(404).json({ message: "Credentials are missing..!" });
  }

  let findEmployeeById = await employeesModel.findOne({ where: { id } });

  if (!findEmployeeById) {
    return res
      .status(404)
      .json({ message: "Employee of " + id + " ID, NOT FOUND..!" });
  }

  findEmployeeById.set(newEmployeeCredentials);
  let updatedEmployee = await findEmployeeById.save();

  res
    .status(200)
    .json({ message: "Employee Updated successfully :) ", updatedEmployee });
}

async function deleteEmployee(req, res) {
  let id = req.body.id;

  if (id === undefined) {
    return res.status(404).json({ message: "Credentials are missing...!" });
  }

  let employee = await employeesModel.destroy({ where: { id } });

  if (employee === null) {
    return res
      .status(404)
      .json({ message: "Employee of " + id + " ID, NOT FOUND" });
  }

  res
    .status(200)
    .json({ message: "Employee of " + id + " ID, Deleted successfully :) " });
}

module.exports = {
  seedDB,
  getAllEmployees,
  addNewEmployee,
  updateEmployeeById,
  deleteEmployee,
};
