let { dataTypes, sequelize } = require('../lib/index.js');

let authorModel = sequelize.define('authors', {
  name: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  birthYear: {
    type: dataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
});

module.exports = { authorModel };
