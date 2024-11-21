require("dotenv").config();
const { error } = require("console");
const axiosInstance = require("./lib/axios");

axiosInstance
  .get("/health")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log("Error fetching the axios health" + error);
  });

const getFlight = async (origin, destination) => {
  try {
    const response = await axiosInstance.get("/flights/search", {
      params: {
        origin: origin,
        destination: destination,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
//
getFlight("bengaluru", "dehradun")
  .then((flights) => console.log("flights data: ", flights))
  .catch((error) => console.log(error));
