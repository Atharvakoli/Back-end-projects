const axiosInstance = require("../lib/axios.lib");

const {
  getConcertsByArtistAndCity,
  getMerchandiseStallsByStallName,
  getAfterPartiesByCity,
} = require("../controller/tourController");

jest.mock("../lib/axios.lib.js", () => ({
  get: jest.fn(),
}));

describe("Tour Controller Tests", () => {
  test("should be fetch Concerts by Artists and city", async () => {
    let mockResponse = {
      concerts: [
        {
          id: 2,
          artist: "Beyoncé",
          venue: "Madison Square Garden",
          city: "New York",
          date: "2024-08-15T20:00:00.000Z",
          ticketPrice: 6127,
          seatCategory: "Front Row",
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    let req = { query: { artist: "Beyoncé", city: "New York" } };
    let res = { json: jest.fn(), status: jest.fn(() => res) };

    await getConcertsByArtistAndCity(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/concerts/search?artist=Beyoncé&city=New York`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });

  test("should be fetch  merchandiseStalls by stallName", async () => {
    let mockResponse = {
      merchandiseStalls: [
        {
          id: 1,
          stallName: "Rocking Tees",
          itemAvailable: "T-Shirts",
          price: 250,
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    let req = { query: { stallName: "Rocking Tees" } };
    let res = { json: jest.fn(), status: jest.fn(() => res) };

    await getMerchandiseStallsByStallName(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/merchandiseStalls/search?stallName=Rocking Tees`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });

  test("should be fetch AfterParties by city", async () => {
    let mockResponse = {
      afterParties: [
        {
          id: 11,
          location: "Vortex Club",
          city: "Phoenix",
          date: "2024-12-11T22:30:00.000Z",
          ticketPrice: 800,
        },
        {
          id: 30,
          location: "Velvet Nightclub",
          city: "Phoenix",
          date: "2024-12-30T22:30:00.000Z",
          ticketPrice: 900,
        },
      ],
    };

    axiosInstance.get.mockResolvedValue(mockResponse);

    let req = { query: { city: "Phoenix" } };
    let res = { json: jest.fn(), status: jest.fn(() => res) };

    await getAfterPartiesByCity(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/afterParties/search?city=Phoenix`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });
});
