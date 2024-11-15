let { dataTypes, sequelize } = require('../lib/index.js');
const { courseModel } = require('./course.model.js');
const { studentModel } = require('./student.model.js');

let studentCourseModel = sequelize.define('studentCourses', {
  studentId: {
    type: dataTypes.INTEGER,
    references: {
      model: studentModel,
      key: 'id',
    },
  },
  courseId: {
    type: dataTypes.INTEGER,
    references: {
      model: courseModel,
      key: 'id',
    },
  },
});

courseModel.belongsToMany(studentModel, { through: studentCourseModel });
studentModel.belongsToMany(courseModel, { through: studentCourseModel });

module.exports = { studentCourseModel };
