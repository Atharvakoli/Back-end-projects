let { app, validateArticle, validateAuthor } = require("../index");
let request = require("supertest");
let http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints Testing", () => {
  it("POST /articles should be able to add new article with VALID input", async () => {
    let res = await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });

  it("POST /articles should be able to return error message for articles INVALID input", async () => {
    let res = await request(server).post("/articles").send({
      title: true,
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({});
    expect(res.text).toEqual(
      "Article title is required and it should be string"
    );
  });

  it("POST /authors should be able to add new author with VALID input", async () => {
    let res = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: 3,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 3,
      name: "Alice Johnson",
      articleId: 3,
    });
  });

  it("POST /authors should be able to return error message for authors INVALID input", async () => {
    let res = await request(server).post("/authors").send({
      name: "Alice Johnson",
      articleId: "Three",
    });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({});
    expect(res.text).toEqual("Article Id is required and it should be string");
  });
});

describe("Validation Function Testing", () => {
  it("should be able to validate articles details return null if details are VALID", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      })
    ).toBeNull();
  });

  it("should be able to validate articles details return error message if details are INVALID", () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: 4.5,
      })
    ).toEqual("Content is required and it should be string");

    expect(
      validateArticle({
        title: false,
        content: "Node.js is a powerful tool for backend development...",
      })
    ).toEqual("Article title is required and it should be string");
  });

  it("should be able to validate author details return null if details are VALID", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: 3,
      })
    ).toBeNull();
  });

  it("should be able to validate articles details return error message if details are INVALID", () => {
    expect(
      validateAuthor({
        name: "Alice Johnson",
        articleId: "Three",
      })
    ).toEqual("Article Id is required and it should be string");

    expect(
      validateAuthor({
        name: 3.14,
        articleId: 3,
      })
    ).toEqual("Author Name is required and it should be string");
  });
});
