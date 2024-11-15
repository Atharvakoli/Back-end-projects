const express = require("express");
let { seedDB, getAllDishes } = require("./apiControllers/dishes.controller.js");
const {
  getAllChef,
  addNewChef,
  updateChefByID,
} = require("./apiControllers/chef.controller.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Join two models HW_2");
});

app.get("/seed_db", seedDB);
app.get("/dishes", getAllDishes);

app.get("/chefs", getAllChef);
app.post("/chefs/new", addNewChef);
app.post("/chefs/update/:id", updateChefByID);

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});
