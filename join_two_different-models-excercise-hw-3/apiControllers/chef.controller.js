let { chefModel } = require("../models/chef.model");

async function getAllChef(req, res) {
  try {
    let chefs = await chefModel.findAll();

    if (chefs.length === 0) {
      return res.status(404).json({ chefs: "Chef, NOT FOUND" });
    }
    res.status(200).json({ chefs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addNewChef(req, res) {
  try {
    let newChefDetails = req.body.newChef;

    if (!newChefDetails) {
      return res.status(404).json({ message: "Details are required" });
    }

    let { name, birthYear } = newChefDetails;

    if (!name || !birthYear) {
      return res.status(404).json({ message: "Credentials are missing" });
    }

    let newChef = await chefModel.create(newChefDetails);

    res.status(200).json({ newChef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateChefByID(req, res) {
  let id = parseInt(req.params.id);
  try {
    let detailsToUpdate = req.body;

    if (!detailsToUpdate) {
      return res.status(404).json({ message: "Details are required" });
    }

    let findChefById = await chefModel.findOne({ where: { id } });

    if (!findChefById) {
      return res
        .status(404)
        .json({ message: "Chef of " + id + " ID, NOT FOUND" });
    }

    findChefById.set(detailsToUpdate);
    let updatedChef = await findChefById.save();

    if (!updatedChef) {
      return res
        .status(404)
        .json({ message: "Something went wrong when creating chef" });
    }

    res
      .status(200)
      .json({ message: "Chef has Updated successfully", updatedChef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllChef, addNewChef, updateChefByID };
