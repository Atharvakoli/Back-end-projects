let { dataTypes, sequelize } = require('../lib/index.js');
const { chefModel } = require('./chef.model.js');
const { dishesModel } = require('./dishes.model.js');

let chefDishModel = sequelize.define('chefDishes', {
  dishesId: {
    type: dataTypes.INTEGER,
    references: {
      model: dishesModel,
      key: 'id',
    },
  },
  chefId: {
    type: dataTypes.INTEGER,
    references: {
      model: chefModel,
      key: 'id',
    },
  },
});

dishesModel.belongsToMany(chefModel, { through: chefDishModel });
chefModel.belongsToMany(dishesModel, { through: chefDishModel });

modules.exports = { chefDishModel };
