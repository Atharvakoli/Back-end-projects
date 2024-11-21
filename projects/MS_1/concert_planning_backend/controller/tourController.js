const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

const getConcerts = async (req, res) => {
  try {
    let rate_limit = req.query.rate_limit;
    let test_error = req.query.test_error;
    let concerts = await axiosInstance.get(
      `/concerts?test_error=${test_error}&rate_limit=${rate_limit}`,
      {
        headers: {
          CLIENT_KEY: process.env.CLIENT_KEY,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
        },
      }
    );

    res.json(concerts.data);
  } catch (error) {
    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes" });
    }

    res
      .status(500)
      .json({ error: `Failed to GET Concerts, since ${error.message}` });
  }
};

const getMerchandiseStalls = async (req, res) => {
  try {
    let rate_limit = req.query.rate_limit;
    let test_error = req.query.test_error;
    let response = await axiosInstance.get(
      `/merchandiseStalls?test_error=${test_error}&rate_limit=${rate_limit}`
    );
    res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded please try again later." });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }
    res.status(500).json({
      error: `Failed to GET MerchandiseStalls, since ${error.message}`,
    });
  }
};

const getAfterParties = async (req, res) => {
  try {
    let rate_limit = req.query.rate_limit;
    let test_error = req.query.test_error;
    let response = await axiosInstance.get(
      `/afterParties?test_error=${test_error}&rate_limit=${rate_limit}`
    );
    res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }
    res.status(500).json({
      error: `Failed to GET After Parties, since ${error.message}`,
    });
  }
};

module.exports = { getConcerts, getMerchandiseStalls, getAfterParties };
