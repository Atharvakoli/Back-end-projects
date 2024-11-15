let { dataTypes, sequelize } = require('../lib/index.js');

let userModel = sequelize.define('users', {
  username: {
    type: dataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: dataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: dataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { userModel };
