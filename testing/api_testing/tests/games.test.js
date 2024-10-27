const request = require("supertest");
const {
  getAllGames,
  getGameById,
  addNewGame,
  getDeveloperById,
  addNewDeveloper,
} = require("../controllers/games.controller.js");

let { app } = require("../server.js");
const http = require("http");

jest.mock("../controllers/games.controller", () => ({
  ...jest.requireActual("../controllers/games.controller"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addNewGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addNewDeveloper: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Games Functions Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be return all games", async () => {
    let mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];

    getAllGames.mockResolvedValue(mockGames);

    let games = await request(server).get("/games");
    expect(games.statusCode).toEqual(200);
    expect(games.body).toEqual({ games: mockGames });
  });

  it("should return null if no games are found", async () => {
    getAllGames.mockResolvedValue(null);

    let games = await request(server).get("/games");
    expect(games.status).toEqual(404);
    expect(games.body).toEqual({ message: "Games, NOT FOUND" });
    expect(getAllGames).toHaveBeenCalled();
  });

  it("should return details of specified id", async () => {
    let mockGame = {
      id: 2,
      title: "Super Mario Bros",
      genre: "Platformer",
      developer: "Nintendo",
    };

    getGameById.mockResolvedValue(mockGame);

    let game = await request(server).get("/games/details/2");
    expect(game.statusCode).toEqual(200);
    expect(game.body).toEqual({ game: mockGame });
    expect(getGameById).toHaveBeenCalledWith(2);
  });

  it("should be return null if specified id is not exist", async () => {
    getGameById.mockResolvedValue(null);

    let games = await request(server).get("/game/details/666");
    expect(games.statusCode).toEqual(404);
    expect(games.body).toEqual({});
  });

  it("should be return added details", async () => {
    let mockGame = {
      id: 3,
      title: "Ludo",
      genre: "mobile",
      developer: "Atharva koli",
    };

    addNewGame.mockResolvedValue(mockGame);

    const game = await request(server)
      .post("/games/new")
      .send({ title: "Ludo", genre: "mobile", developer: "Atharva koli" });
    expect(game.statusCode).toEqual(201);
    expect(game.body).toEqual(mockGame);
    expect(addNewGame).toHaveBeenCalledWith({
      title: "Ludo",
      genre: "mobile",
      developer: "Atharva koli",
    });
  });

  it("should be return null, if game details not found", async () => {
    addNewGame.mockResolvedValue(null);

    let game = await request(server)
      .post("/games/new")
      .send({ title: null, genre: null, developer: null });
    expect(game.statusCode).toEqual(404);
    expect(game.body).toEqual({ message: "Game not Added" });
    expect(addNewGame).toHaveBeenCalledWith({
      title: null,
      genre: null,
      developer: null,
    });
  });

  it("should be return return developer details with specified id", async () => {
    let mockDeveloper = {
      id: 1,
      name: "Atharva",
      country: "India",
    };

    getDeveloperById.mockResolvedValue(mockDeveloper);

    let developer = await request(server).get("/developers/details/1");
    expect(developer.statusCode).toEqual(200);
    expect(developer.body).toEqual(mockDeveloper);
    expect(getDeveloperById).toHaveBeenCalledWith(1);
  });

  it("should be returned null if specified id, not found", async () => {
    getDeveloperById.mockResolvedValue(null);

    let developer = await request(server).get("/developers/details/345");
    expect(developer.statusCode).toEqual(404);
    expect(developer.body).toEqual({ message: "developer not found" });
    expect(getDeveloperById).toHaveBeenCalledWith(345);
  });

  it("should be return new developers details", async () => {
    let mockDeveloper = {
      id: 3,
      name: "Harry",
      country: "Hogwart",
    };

    addNewDeveloper.mockResolvedValue(mockDeveloper);

    let developer = await request(server).post("/developer/new").send({
      name: "Harry",
      country: "Hogwart",
    });

    expect(addNewDeveloper).toHaveBeenCalledWith({
      name: "Harry",
      country: "Hogwart",
    });
    expect(developer.statusCode).toEqual(201);
    expect(developer.body).toEqual(mockDeveloper);
  });

  it("should be return null, if new develpers details not found", async () => {
    addNewDeveloper.mockResolvedValue(null);

    let newDeveloper = await request(server).post("/developer/new").send({
      name: null,
      country: null,
    });

    expect(addNewDeveloper).toHaveBeenCalledWith({
      name: null,
      country: null,
    });
    expect(newDeveloper.statusCode).toEqual(404);
    expect(newDeveloper.body).toEqual({ message: "developer, not Added" });
  });
});
