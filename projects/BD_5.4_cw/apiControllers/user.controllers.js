let { userModel } = require('../models/user.model.js');

async function getAllUsers(req, res) {
  let users = await userModel.findAll();

  if (users.length === 0) {
    return res.status(404).json({ message: 'Users, NOT FOUND' });
  }

  res.status(200).json({ users });
}

async function addUser(req, res) {
  let userDetails = req.body.user;

  if (!userDetails) {
    return res.status(404).json({ message: 'Your Details are required' });
  }

  let { username, email, password } = userDetails;

  if (!username || !email || !password) {
    return res.status(404).json({ message: 'Credentails are missing...!' });
  }

  let newUser = await userModel.create(userDetails);

  if (!newUser) {
    return res
      .status(404)
      .json({ message: 'Something went wrong while creating user' });
  }

  res.status(200).json({ message: 'User Added successfully :) ' });
}

async function updateUserByID(req, res) {
  let id = parseInt(req.params.id);
  let newUserDetails = req.body;
  console.log(id, newUserDetails);

  let findUserById = await userModel.findOne({ where: { id } });

  if (!findUserById) {
    return res
      .status(404)
      .json({ message: 'User of ' + id + ' ID, NOT FOUND' });
  }

  findUserById.set(newUserDetails);
  let updatedUser = await findUserById.save();

  res
    .status(200)
    .json({ message: 'User Updated successfully :) ', updatedUser });
}

module.exports = { addUser, updateUserByID, getAllUsers };
