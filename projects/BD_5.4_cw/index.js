const express = require('express');

let { seedDB, getAllMovies } = require('./apiControllers/api.controllers.js');

let {
  getAllUsers,
  updateUserByID,
  addUser,
} = require('./apiControllers/user.controllers.js');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Join two models');
});

app.get('/seed_db', seedDB);
app.get('/movies', getAllMovies);

// users route

app.get('/users', getAllUsers);
app.post('/users/new', addUser);
app.post('/users/update/:id', updateUserByID);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
