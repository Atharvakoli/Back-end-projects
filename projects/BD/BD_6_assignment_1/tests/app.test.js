let request = require("supertest");
let { app, getShows, addShow } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getShows: jest.fn(),
  addShow: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API ENDPOINT TESTS", () => {
  it("GET /shows should be able to return list of shows", async () => {
    let res = await request(server).get("/shows");
    expect(res.status).toBe(200);
    expect(res.body.shows).toEqual([
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ]);
  });

  it("GET /shows/:id should be able to return details of specified id", async () => {
    let res = await request(server).get("/shows/3");
    expect(res.status).toBe(200);
    expect(res.body.show).toEqual({
      showId: 3,
      title: "Wicked",
      theatreId: 3,
      time: "9:00 PM",
    });
  });

  it("POST /shows should be able to add details of show and return added show", async () => {
    let res = await request(server)
      .post("/shows")
      .send({ title: "Phantom of the Opera", theatreId: 2, time: "5:00 PM" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      showId: 5,
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    });
  });
});

describe("API Endpoints Error Handling", () => {
  it("GET /shows/:id should be able to handle error message if specified id not found", async () => {
    let res = await request(server).get("/shows/21");
    expect(res.status).toBe(404);
    expect(res.body.error).toEqual("Show, NOT FOUND");
  });

  it("POST /shows should be able to handling error if details are INVALID", async () => {
    let res = await request(server).post("/shows").send({
      title: "Phantom of the Opera",
      theatreId: "two",
      time: 5.0,
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      "Credentials are required and should be specifc type"
    );
  });
});

describe("Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getALlShows should be able return all list of shows", () => {
    let mockShows = [
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ];

    getShows.mockReturnValue(mockShows);

    let shows = getShows();
    expect(getShows).toHaveBeenCalled();
    expect(shows).toEqual(mockShows);
    expect(shows.length).toBe(4);
  });

  it("addShow should be able to add new show", async () => {
    let mockShow = {
      showId: 5,
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    };

    addShow.mockReturnValue(mockShow);

    let show = await addShow({
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    });
    expect(show).toEqual(mockShow);
    expect(addShow).toHaveBeenCalledWith({
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    });
  });
});
