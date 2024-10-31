let request = require("supertest");
let { getGames, getGameById, getGenres, getGenreById } = require("../games");
let { app } = require("../index");
let http = require("http");

jest.mock("../games", () => ({
  ...jest.requireActual("../games"),
  getGames: jest.fn(),
  getGameById: jest.fn(),
  getGenres: jest.fn(),
  getGenreById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Games Functions Error Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/games should be able to return 404 if games list not Found", async () => {
    getGames.mockReturnValue([]);

    let response = await request(server).get("/api/games");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Games, Not Found");
  });

  it("GET /api/games/:id should be able to return 404 for non-existing game", async () => {
    getGameById.mockReturnValue(null);

    let res = await request(server).get("/api/games/222");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Game, not found");
  });

  it("GET /api/genres should be able to return 404 if list of genres not Found", async () => {
    getGenres.mockReturnValue([]);

    let res = await request(server).get("/api/genres");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Genres, Not Found");
  });

  it("GET /api/genres/:id should be able to return 404 for non-existing id", async () => {
    getGenreById.mockReturnValue(null);

    let res = await request(server).get("/api/genres/:id");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Genre, not found");
  });
});
