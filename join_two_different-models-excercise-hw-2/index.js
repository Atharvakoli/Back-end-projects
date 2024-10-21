let express = require("express");

let { seedDB, getAllCourses } = require("./apiControllers/course.controller");
const {
  addNewStudent,
  updateStudentyByID,
} = require("./apiControllers/student.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Join two models HW_2");
});

app.get("/seed_db", seedDB);
app.get("/courses", getAllCourses);

app.post("/student/new", addNewStudent);
app.post("/student/update/:id", updateStudentyByID);

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});
