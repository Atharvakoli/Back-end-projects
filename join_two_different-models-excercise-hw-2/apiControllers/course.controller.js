let { sequelize } = require("../lib/index.js");
let { courseModel } = require("../models/course.model.js");

let { courseData } = require("../db/coursesData.js");

async function seedDB(req, res) {
  try {
    await sequelize.sync({ force: true });
    await courseModel.bulkCreate(courseData);

    res.status(200).json({ message: "Database seeding successfully :)" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCourses(req, res) {
  try {
    let courses = await courseModel.findAll();

    if (!courses) {
      return res.status(404).json({ message: "Courses NOT FOUND" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { seedDB, getAllCourses };
