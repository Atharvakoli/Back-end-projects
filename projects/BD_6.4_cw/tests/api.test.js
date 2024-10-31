const request = require("supertest");
const { app } = require("../index");
const {
  getBooks,
  getBookById,
  getReviewById,
  getReviews,
  getUserById,
} = require("../book");
const http = require("http");

// creating a mock for all functions
jest.mock("../book", () => ({
  ...jest.requireActual("../book"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviewById: jest.fn(),
  getReviews: jest.fn(),
  getUserById: jest.fn(),
}));

// mock server
let server;
// creating mock server
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

// close the server once testing is done
afterAll((done) => {
  server.close(done);
});

// writing test for each api
describe("API ERROR, handling TEST", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api.books should return 404 if no books are found", async () => {
    getBooks.mockReturnValue([]);

    const response = await request(server).get("/api/books");
    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No books found");
  });

  it("GET /api/books/:id should be able to return 404 for non-existing book", async () => {
    getBookById.mockReturnValue(null);

    const response = await request(server).get("/api/books/666");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Book, Not Found");
  });

  it("GET /api/reviews should be able to return 404 if no reviews are found", async () => {
    getReviews.mockReturnValue([]);

    const response = await request(server).get("/api/reviews");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("NO reviews found");
  });

  it("GET /api/reviews/:id should be able to return 404 for non-existing review", async () => {
    getReviewById.mockReturnValue(null);

    const response = await request(server).get("/api/reviews/439");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Review, Not Found");
  });

  it("GET /api/users/:id should be able to return 404 for non-existing user", async () => {
    getUserById.mockReturnValue(null);

    let response = await request(server).get("/api/users/333");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User, Not Found");
  });
});
