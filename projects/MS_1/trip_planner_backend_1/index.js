const express = require("express");
require("dotenv").config();
const cors = require("cors");

const {
  createItinerary,
  getItinerary,
} = require("./controllers/dataController");

const {
  getFlights,
  getHotels,
  getSites,
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
} = require("./controllers/itineraryController");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/itinerary", createItinerary);
app.get("/itinerary/:id", getItinerary);
app.get("/data/flights", getFlights);
app.get("/data/hotels", getHotels);
app.get("/data/sites", getSites);
app.get("/flights/search", getFlightsByOriginAndDestination);
app.get("/hotels/search", getHotelsByLocation);
app.get("/sites/search", getSitesByLocation);

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
