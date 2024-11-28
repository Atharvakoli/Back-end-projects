const axiosInstance = require("../lib/axios.lib");
const {
  validateConcertsQueryParams,
  validateMerchandiseStallsQueryParams,
  validateAfterPartiesQueryParams,
} = require("../validation/index.inputValidation");

const getConcertsByArtistAndCity = async (req, res) => {
  let errors = validateConcertsQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    let { artist, city } = req.query;
    let response = await axiosInstance.get(
      `/concerts/search?artist=${artist}&city=${city}`
    );

    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve Concert since, ${error.message}` });
  }
};
const getMerchandiseStallsByStallName = async (req, res) => {
  let errors = validateMerchandiseStallsQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    let { stallName } = req.query;
    let response = await axiosInstance.get(
      `/merchandiseStalls/search?stallName=${stallName}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: `Failed to retrieve MerchandiseStalls since, ${error.message}`,
    });
  }
};
const getAfterPartiesByCity = async (req, res) => {
  let errors = validateAfterPartiesQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    let { city } = req.query;
    let response = await axiosInstance.get(`/afterParties/search?city=${city}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: `Failed to retrieve After Parties since, ${error.message}`,
    });
  }
};

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

module.exports = {
  getConcerts,
  getMerchandiseStalls,
  getAfterParties,
  getAfterPartiesByCity,
  getConcertsByArtistAndCity,
  getMerchandiseStallsByStallName,
};
