let { dataTypes, sequelize } = require('../lib/index.js');

let studentModel = sequelize.define('students', {
  name: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  age: {
    type: dataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { studentModel };
