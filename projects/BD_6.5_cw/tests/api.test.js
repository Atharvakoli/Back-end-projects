const request = require("supertest");
let { app, validateBook, validateReview, validateUser } = require("../index");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Api endpoints to Add data", () => {
  it("should add a new user with valid input", async () => {
    const res = await request(server)
      .post("/api/users")
      .send({ name: "John doe", email: "john.doe@gmail.com" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John doe",
      email: "john.doe@gmail.com",
    });
  });

  it("should return 400 for invalid input", async () => {
    const res = await request(server).post("/api/users").send({ name: "John" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Email is required and should be string");
  });

  it("should add a new book with valid input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Captain Philipes", author: "Atharva koli" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      title: "Captain Philipes",
      author: "Atharva koli",
    });
  });

  it("should return 400 from invalid book input", async () => {
    const res = await request(server)
      .post("/api/books")
      .send({ title: "Captain Philipes" });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe("Author is required and should be a string");
  });

  it("should be able to add review with valid input", async () => {
    const res = await request(server)
      .post("/api/reviews")
      .send({ content: "Great Writing..!!", userId: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      content: "Great Writing..!!",
      userId: 1,
    });
  });

  it("should return 400 from invalid reviews input", async () => {
    const res = await request(server).post("/api/reviews").send({ userId: 1 });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toBe("Content is required and should be a string");
  });
});

// making a set of similiar kinds tests together
describe("Validation function", () => {
  it("should validate user input correctly", () => {
    expect(
      validateUser({ name: "John", email: "johndoe@email.com" })
    ).toBeNull();

    expect(validateUser({ name: "John" })).toEqual(
      "Email is required and should be string"
    );

    expect(validateUser({ email: "johndoe.@gmail.com" })).toEqual(
      "Name is required and should be string"
    );
  });

  it("should validate book input correctly", () => {
    expect(
      validateBook({ title: "Harry Potter", author: "J.K Rowling" })
    ).toBeNull();

    expect(validateBook({ title: "Harry Potter" })).toEqual(
      "Author is required and should be a string"
    );

    expect(validateBook({ author: "J.K Rowling" })).toEqual(
      "Title is required and should be a string"
    );
  });

  it("should validate review input correctly", () => {
    expect(validateReview({ content: "Great Poet", userId: 1 })).toBeNull();

    expect(validateReview({ content: "Great Poet" })).toEqual(
      "UserId is required and should be a number"
    );

    expect(validateReview({ userId: 1 })).toEqual(
      "Content is required and should be a string"
    );
  });
});
