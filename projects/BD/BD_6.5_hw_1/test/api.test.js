let request = require("supertest");
let { app, validateGame, validateTournamet } = require("../index");

let http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Ending Testing of games", () => {
  it("POST /api/games should be able add game for valid input", async () => {
    let res = await request(server)
      .post("/api/games")
      .send({ title: "Ludo", genre: "Mind Game" });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ id: 1, title: "Ludo", genre: "Mind Game" });
  });

  it("POST /api/games should be able return 400 for invalid input", async () => {
    let res = await request(server)
      .post("/api/games")
      .send({ title: 666, genre: "Mind Game" });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual("Title is required and it should be string");
  });

  it("POST /api/tournaments should be able to add Tournament with valid input", async () => {
    let res = await request(server)
      .post("/api/tournaments")
      .send({ name: "Kabbadi", gameId: 1 });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ id: 1, name: "Kabbadi", gameId: 1 });
  });

  it("POST /api/tournaments should be able to return 400 Tournament with invalid input", async () => {
    let res = await request(server)
      .post("/api/tournaments")
      .send({ name: "Kabbadi" });
    expect(res.status).toEqual(400);
    expect(res.text).toEqual("GameId is required and it should be number");
  });
});

describe("Validating Functions", () => {
  it("should be able to return null if user inputs is valid", () => {
    expect(validateGame({ title: "Ludo", genre: "Mind Game" })).toBeNull();
  });

  it("should be able to handle games error if input are invalid", () => {
    expect(validateGame({ title: "Ludo" })).toEqual(
      "Genre is required and it should be string"
    );
    expect(validateGame({ genre: "Mind Game" })).toEqual(
      "Title is required and it should be string"
    );
  });

  it("should be able to return null if user inputs is valid", () => {
    expect(validateTournamet({ name: "Kabbadi", gameId: 1 })).toBeNull();
  });

  it("should be able to handle tournaments error if input are invalid", () => {
    expect(validateTournamet({ name: 331, gameId: 1 })).toEqual(
      "Name is required and it should be string"
    );
    expect(validateTournamet({ name: "Kabbadi", gameId: "six" })).toEqual(
      "GameId is required and it should be number"
    );
  });
});
