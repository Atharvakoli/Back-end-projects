const { sequelize } = require("../lib");
const { departmentModel } = require("../models/department.model");
const { roleModel } = require("../models/role.model");

const { employeeModel } = require("../models/employee.model");
const {
  employeeDepartmentModel,
} = require("../models/employeeDepartment.model");
const { employeeRoleModel } = require("../models/employeeRole.model");

async function seedDB(req, res) {
  await sequelize.sync({ force: true });

  const departments = await departmentModel.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await roleModel.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employeeModel.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartmentModel.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRoleModel.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartmentModel.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRoleModel.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartmentModel.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRoleModel.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
}

module.exports = { seedDB };
