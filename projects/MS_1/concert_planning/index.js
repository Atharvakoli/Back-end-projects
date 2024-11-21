const axiosInstance = require("./lib/axios");

require("dotenv").config();

axiosInstance
  .get("/health")
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));

const getConcertsByArtistAndCity = async (artist, city) => {
  try {
    const response = await axiosInstance.get("/concerts/search", {
      params: { artist, city },
    });

    return response.data;
  } catch (error) {
    console.log("Error occurred :) ", error.message);
  }
};

getConcertsByArtistAndCity("Taylor Swift", "Las Vegas")
  .then((concert) => console.log("Concert: ", concert))
  .catch((error) => console.log("Error", error.message));
