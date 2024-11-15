const express = require("express");
const cors = require("cors");

let {
  seedDB,
  getAllCompanies,
  addCompany,
  updateCompanyById,
  deleteACompanyByID,
} = require("./apiControllers/api.controller.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Post request HW_3");
});

app.get("/seed_db", seedDB);
app.get("/companies", getAllCompanies);

app.post("/companies/new", addCompany);
app.post("/companies/update/:id", updateCompanyById);
app.post("/companies/delete", deleteACompanyByID);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
