let { dataTypes, sequelize } = require("../lib/index.js");
const { employeeModel } = require("./employee.model.js");
const { departmentModel } = require("./department.model.js");

let employeeDepartmentModel = sequelize.define("employeeDepartments", {
  employeeId: {
    type: dataTypes.INTEGER,
    references: {
      model: employeeModel,
      key: "id",
    },
  },
  departmentId: {
    type: dataTypes.INTEGER,
    references: {
      model: departmentModel,
      key: "id",
    },
  },
});

employeeModel.belongsToMany(departmentModel, {
  through: employeeDepartmentModel,
});
departmentModel.belongsToMany(employeeModel, {
  through: employeeDepartmentModel,
});

module.exports = { employeeDepartmentModel };
