let { sequelize } = require("../lib/index.js");
let { dishesModel } = require("../models/dishes.model.js");
let { dishesData } = require("../db/dishesData.js");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await dishesModel.bulkCreate(dishesData);
    res.status(200).json({ message: "Database seeding successful :) " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllDishes(req, res) {
  try {
    let dishes = await dishesModel.findAll();
    if (dishes.length === 0) {
      return res.status(404).json({ dishes: "Dishes, NOT FOUND" });
    }
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { seedDB, getAllDishes };
