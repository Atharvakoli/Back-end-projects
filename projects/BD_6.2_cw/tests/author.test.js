let { app, getAuthors, getAuthorById, addAuthor } = require("../index.js");

let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAuthors: jest.fn(),
  getAuthorById: jest.fn(),
  addAuthor: jest.fn(),
}));

let server;

// before
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

// after
afterAll((done) => {
  server.close(done);
});

describe("Function Tests", () => {
  // before running each of the test clear all the data from previous test or any initial data was their you clear all that, so that it deos hamper ours result for next test
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // use test for writing mock functions
  test("getAuthor should return a list of authors", () => {
    const mockAuthors = [
      { authorId: 1, name: "George Orwell", book: "1984" },
      { authorId: 2, name: "Alduous Huxley", book: "Brave New World" },
      { authorId: 3, name: "Ray Bradbury", book: "Fahrenhit 451" },
    ];

    getAuthors.mockReturnValue(mockAuthors);

    let authors = getAuthors();
    expect(authors).toEqual(mockAuthors);
    expect(getAuthors).toHaveBeenCalled();
  });

  test("getAuthorById should be able to return detail of author by its id speified", () => {
    let mockAuthor = {
      authorId: 2,
      name: "Alduous Huxley",
      book: "Brave New World",
    };

    getAuthorById.mockReturnValue(mockAuthor);

    let author = getAuthorById(2);
    expect(author).toEqual(mockAuthor);
    expect(getAuthorById).toHaveBeenCalledWith(2);
  });

  test("getAuthorById should return undefined if author id not found", () => {
    getAuthorById.mockReturnValue(undefined);

    let result = getAuthorById(666);
    expect(result).toBeUndefined();
    expect(getAuthorById).toHaveBeenCalledWith(666);
  });

  test("addAuthor should be able to return a added author", () => {
    let newAuthor = { authorId: 4, name: "J.K Rowling", book: "Harry Potter" };

    addAuthor.mockReturnValue(newAuthor);

    let author = addAuthor(newAuthor);
    expect(author).toEqual(newAuthor);
    expect(addAuthor).toHaveBeenCalledWith(newAuthor);
  });
});
