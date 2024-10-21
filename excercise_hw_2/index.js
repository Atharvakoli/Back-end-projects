const express = require("express");

let {
  seedDB,
  getAllEmployees,
  addNewEmployee,
  updateEmployeeById,
  deleteEmployee,
} = require("./apiControllers/api.controllers.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Post Requests HW_2");
});

app.get("/seed_db", seedDB);
app.get("/employees", getAllEmployees);

app.post("/employees/new", addNewEmployee);
app.post("/employees/update/:id", updateEmployeeById);
app.post("/employees/delete", deleteEmployee);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
