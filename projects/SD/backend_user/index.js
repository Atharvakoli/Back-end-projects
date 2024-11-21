require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./lib/sequelize");
const { userModel } = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database connected and sync");
  })
  .catch((error) => {
    console.error("Unabe to connect to database", error);
  });

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json({ users });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Failed to fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let user = await userModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User of " + id + " Not Found" });
    }
    res.json({ user });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Failed to fetch user of " + id + " ID." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
