const { studentModel } = require('../models/student.model');

async function addNewStudent(req, res) {
  try {
    let studentDetails = req.body.studentDetails;

    if (!studentDetails) {
      return res.status(404).json({ message: 'Details is required' });
    }

    let { name, age } = studentDetails;

    if (!name || !age) {
      return res.status(404).json({ message: 'Credentials are missing ' });
    }

    let newStudent = await studentModel.create(studentDetails);

    if (!newStudent) {
      return res
        .status(404)
        .json({ message: 'Something went wrong when Creating Student' });
    }

    res
      .status(200)
      .json({ message: 'Student is Created successfully', newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateStudentyByID(req, res) {
  let id = req.params.id;
  try {
    let detailsToUpdate = req.body;

    if (!detailsToUpdate) {
      return res.status(404).json({ message: 'Details are required' });
    }

    let findStudentByID = await studentModel.findOne({ where: { id } });

    if (!findStudentByID) {
      return res.status(404).json({ message: 'Student, NOT FOUND' });
    }

    findStudentByID.set(detailsToUpdate);
    let updatedStudent = await findStudentByID.save();

    res
      .status(200)
      .json({ message: 'Student Updated successfully :) ', updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addNewStudent, updateStudentyByID };
