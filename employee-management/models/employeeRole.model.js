let { dataTypes, sequelize } = require("../lib/index");
const { employeeModel } = require("./employee.model");

const { roleModel } = require("./role.model");

let employeeRoleModel = sequelize.define("employeeRoles", {
  employeeId: {
    type: dataTypes.INTEGER,
    references: {
      model: employeeModel,
      key: "id",
    },
  },
  roleId: {
    type: dataTypes.INTEGER,
    references: {
      model: roleModel,
      key: "id",
    },
  },
});

employeeModel.belongsToMany(roleModel, { through: employeeRoleModel });
roleModel.belongsToMany(employeeModel, { through: employeeRoleModel });

module.exports = { employeeRoleModel };
