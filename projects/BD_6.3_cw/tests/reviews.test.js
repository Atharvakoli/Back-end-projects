const request = require("supertest");
let {
  app,
  getAllReviews,
  getReviewById,
  addReviews,
  getUserById,
  addNewUser,
} = require("../index");

let http = require("http");

jest.mock("../index", () => ({
  ...jest.requireActual("../index"),
  getAllReviews: jest.fn(),
  getReviewById: jest.fn(),
  getUserById: jest.fn(),
  addNewUser: jest.fn(),
  addReviews: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // for testing apis use it
  it("should review endpoint return all reviews", async () => {
    let mockReviews = [
      { id: 1, content: "Greate product!", userId: 1 },
      { id: 2, content: "Not bad, could be better!", userId: 2 },
    ];

    getAllReviews.mockResolvedValue(mockReviews); // async function

    const reviews = await request(server).get("/reviews");
    expect(reviews.statusCode).toEqual(200);
    expect(reviews.body).toEqual(mockReviews);
  });

  it("should retrive a specific review by id", async () => {
    const mockReview = { id: 1, content: "Greate product!", userId: 1 };
    getReviewById.mockResolvedValue(mockReview);

    let review = await request(server).get("/reviews/details/1");
    expect(review.statusCode).toEqual(200);
    expect(review.body).toEqual(mockReview);
  });

  it("should add a new review", async () => {
    let mockReview = { id: 3, content: "Bad product!", userId: 1 };

    addReviews.mockResolvedValue(mockReview);

    let review = await request(server)
      .post("/reviews/new")
      .send({ content: "Bad product!", userId: 1 });
    expect(review.statusCode).toEqual(201);
    expect(review.body).toEqual(mockReview);
  });

  it("should return user by specified id", async () => {
    let mockUser = {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    };

    getUserById.mockResolvedValue(mockUser);

    let user = await request(server).get("/users/details/2");
    expect(user.statusCode).toEqual(200);
    expect(user.body).toEqual(mockUser);
  });

  it("should add a new user", async () => {
    let mockUser = {
      id: 3,
      name: "Atharva koli",
      email: "koli.atharva@example.com",
    };

    addNewUser.mockResolvedValue(mockUser);

    let newUser = await request(server)
      .post("/users/new")
      .send({ name: "Atharva koli", email: "koli.atharva@example.com" });
    expect(newUser.statusCode).toEqual(201);
    expect(newUser.body).toEqual(mockUser);
  });

  it("should return 404 if review not found", async () => {
    getReviewById.mockResolvedValue(null);
    let review = await request(server).get("/reviews/details/999");
    expect(review.statusCode).toEqual(404);
  });

  it("should return 404 if user not found", async () => {
    getUserById.mockResolvedValue(null);
    let user = await request(server).get("/users/details/999");
    expect(user.statusCode).toEqual(404);
  });
});
