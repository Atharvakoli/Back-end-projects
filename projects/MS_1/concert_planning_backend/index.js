const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { createTour, getTour } = require("./controller/dataController");
const {
  getConcerts,
  getMerchandiseStalls,
  getAfterParties,
  getAfterPartiesByCity,
  getConcertsByArtistAndCity,
  getMerchandiseStallsByStallName,
} = require("./controller/tourController");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tour", createTour);
app.get("/tour/:id", getTour);

app.get("/data/concerts", getConcerts);
app.get("/data/merchandiseStalls", getMerchandiseStalls);
app.get("/data/afterParties", getAfterParties);

app.get("/concerts/search", getConcertsByArtistAndCity);
app.get("/merchandiseStalls/search", getMerchandiseStallsByStallName);
app.get("/afterParties/search", getAfterPartiesByCity);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log("Database connection problem", error.message);
  });

app.listen(3000, () => {
  console.log("Example app listening on http://localhost:3000");
});
