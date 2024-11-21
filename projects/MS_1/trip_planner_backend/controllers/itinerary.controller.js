const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

const getFlights = async (req, res) => {
  try {
    const response = await axiosInstance.get("/flights", {
      headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed Fetch flights" });
  }
};

const getHotels = async (req, res) => {
  try {
    let response = await axiosInstance.get("/hotels");

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed Fetch hotels" });
  }
};

const getSites = async (req, res) => {
  try {
    let response = await axiosInstance.get("/sites");
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed Fetch sites" });
  }
};

module.exports = { getFlights, getHotels, getSites };
