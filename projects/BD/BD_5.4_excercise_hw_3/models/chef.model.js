let { dataTypes, sequelize } = require('../lib/index.js');

let chefModel = sequelize.define('chefs', {
  name: {
    type: dataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birthYear: {
    type: dataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { chefModel };
