const axiosInstance = require("../lib/axios.lib");
const {
  validateFlightQueryParams,
  validateHotelsQueryParams,
  validateSitesQueryParams,
} = require("../validations/index.inputValidate");

const getFlightsByOriginAndDestination = async (req, res) => {
  const errors = validateFlightQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    const { origin, destination } = req.query;
    const response = await axiosInstance.get(
      `/flights/search?origin=${origin}&destination=${destination}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: `Failed to GET flights by origin and destination, since ${error.message}`,
    });
  }
};

const getHotelsByLocation = async (req, res) => {
  let errors = validateHotelsQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    let { location } = req.query;
    let response = await axiosInstance.get(
      `/hotels/search?location=${location}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: `Failed to GET hotels by location, since ${error.message}`,
    });
  }
};

const getSitesByLocation = async (req, res) => {
  let errors = validateSitesQueryParams(req.query);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  try {
    let { location } = req.query;
    let response = await axiosInstance.get(
      `/sites/search?location=${location}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: `Failed to GET sites by location, since ${error.message}`,
    });
  }
};

// 3rd party API Error handling Error Handling
// -- Rate limiting :- usually applied, when you want to protect your servers from an overwhelming API request, suppose their are lot of requests coming in from the server, so applying rate limiting ensures that the requests are handled evenly, and the server does not crash

const getFlights = async (req, res) => {
  try {
    // here test_error, is what error messages will we get upon testing for errors
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;
    const response = await axiosInstance.get(
      `/flights?test_error=${test_error}&rate_limit=${rate_limit}`,
      {
        headers: {
          CLIENT_KEY: process.env.CLIENT_KEY,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    // console.log(error);
    // we catch error and populate errors accordingly
    // 429 => associated with your rate limit
    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded, please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }
    res.status(500).json({ error: "Failed to Fetch flights." });
  }
};

const getHotels = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;
    let response = await axiosInstance.get(
      `/hotels?test_error=${test_error}&rate_limit=${rate_limit}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);

    if (error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit is exceeded please try again later" });
    } else if (
      error.response.status === 500 &&
      error.response.data.error === "Simulated error for testing purposes."
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes." });
    }
    res.status(500).json({ error: "Failed Fetch hotels." });
  }
};

const getSites = async (req, res) => {
  try {
    const rate_limit = req.query.rate_limit;
    const test_error = req.query.test_error;
    let response = await axiosInstance.get(
      `/sites?test_error=${test_error}&rate_limit=${rate_limit}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
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
    res.status(500).json({ error: "Failed Fetch sites" });
  }
};

module.exports = {
  getFlights,
  getHotels,
  getSites,
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
};
