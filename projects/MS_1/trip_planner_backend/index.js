const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  createItinerary,
  getItinerary,
} = require("./controllers/data.controller");

const {
  getFlights,
  getHotels,
  getSites,
} = require("./controllers/itinerary.controller");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/itinerary", createItinerary);
app.get("/itinerary/:id", getItinerary);
app.get("/data/flights", getFlights);
app.get("/data/hotels", getHotels);
app.get("/data/sites", getSites);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Unable to connect to database", error.message);
  });

app.listen(3000, () => {
  console.log(`Example app listening on http://localhost:${3000}`);
});
