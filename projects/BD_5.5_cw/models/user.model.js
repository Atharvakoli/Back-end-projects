let { dataTypes, sequelize } = require('../lib/index.js');

let userModel = sequelize.define('users', {
  username: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: dataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { userModel };
