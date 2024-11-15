let request = require("supertest");
let {
  getArticles,
  getArticleById,
  getComments,
  getCommentsById,
  getUserById,
} = require("../articles");
let { app } = require("../index");
let http = require("http");

jest.mock("../articles", () => ({
  ...jest.requireActual("../articles"),
  getArticles: jest.fn(),
  getArticleById: jest.fn(),
  getComments: jest.fn(),
  getCommentsById: jest.fn(),
  getUsers: jest.fn(),
  getUserById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Articles Functions Error Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/articles should be able to return 404 if articles are not found", async () => {
    getArticles.mockReturnValue([]);

    let res = await request(server).get("/api/articles");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Articles, NOT FOUND");
  });

  it("GET /api/articles/:id should be able to return 404 for non-existing id", async () => {
    getArticleById.mockReturnValue(null);

    let res = await request(server).get("/api/articles/344");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Article, NOT FOUND");
  });

  it("GET /api/comments should be able to return 404 if comments are not found", async () => {
    getComments.mockReturnValue([]);

    let res = await request(server).get("/api/comments");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Comments, NOT FOUND");
  });

  it("GET /api/comments/:id should be able to return 404 for non-existing id", async () => {
    getCommentsById.mockReturnValue(null);

    let res = await request(server).get("/api/comments/567");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Comments, NOT FOUND");
  });

  it("GET /api/users/:id should be able to return 404 for non-existing id", async () => {
    getUserById.mockReturnValue(null);

    let res = await request(server).get("/api/users/990");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User, NOT FOUND");
  });
});
