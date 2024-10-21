let { sequelize } = require("../lib/index.js");
let { companyModel } = require("../models/company.model.js");
let { companyData } = require("../db/comapanyData.js");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await companyModel.bulkCreate(companyData);

    res.status(200).json({ message: "Database seeding successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCompanies(req, res) {
  let companies = await companyModel.findAll();

  if (companies === null) {
    return res.status(404).json({ message: "Companies, NOT FOUND" });
  }

  res.status(200).json({ companies });
}

async function addCompany(req, res) {
  let newCompanyDetails = await req.body.companies;

  if (!newCompanyDetails) {
    return res
      .status(404)
      .json({ message: "To process futher, I need your information :)" });
  }

  let { name, industry, foundedYear, headquarters, revenue } =
    newCompanyDetails;

  if (
    name === undefined ||
    industry === undefined ||
    foundedYear === undefined ||
    headquarters === undefined ||
    revenue === undefined
  ) {
    return res.status(404).json({ message: "Credentails are missing :)" });
  }

  let newCompany = {
    name,
    industry,
    foundedYear,
    headquarters,
    revenue,
  };

  await companyModel.create(newCompany);
  res.status(200).json({ message: "Company Added Sucessfully" });
}

async function updateCompanyById(req, res) {
  let id = req.params.id;

  let updateDetails = req.body;

  if (!updateDetails) {
    return res.status(404).json({ message: "Credentails are missing...!" });
  }

  let findCompanyById = await companyModel.findOne({ where: { id } });

  if (!findCompanyById) {
    return res
      .status(404)
      .json({ message: "Company of " + id + " ID, NOT FOUND" });
  }

  findCompanyById.set(updateDetails);
  let updatedCompany = await findCompanyById.save();

  res.status(200).json({
    message: "Companies details updated successfully :)",
    updatedCompany,
  });
}

async function deleteACompanyByID(req, res) {
  let id = req.body.id;

  if (!id) {
    return res.json({ message: "Credentails are missing...!" });
  }

  let destroyedCompany = await companyModel.destroy({ where: { id } });

  if (!destroyedCompany) {
    return res
      .status(404)
      .json({ message: "Company of " + id + " ID, NOT FOUND" });
  }

  res
    .status(200)
    .json({
      message: "Company of " + id + " ID, has deleted successfully :) ",
    });
}

module.exports = {
  seedDB,
  getAllCompanies,
  addCompany,
  updateCompanyById,
  deleteACompanyByID,
};
