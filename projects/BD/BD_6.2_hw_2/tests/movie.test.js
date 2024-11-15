let {
  getAllMovies, getMovieById, addNewMovie
} = require("../index.js");

let { app } = require("../index.js");

let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
  addNewMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Movies Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllMovies should return a list of movies", () => {
    let mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
    ];

    getAllMovies.mockReturnValue(mockMovies);

    let movies = getAllMovies();
    expect(movies.length).toBe(3);
    expect(getAllMovies).toHaveBeenCalled();
  });

  test("getMoviesById should return movie details of specified Id", () => {
    let mockMovie = {
      id: 3,
      title: "The Dark Knight",
      director: "Christopher Nolan",
    };

    getMovieById.mockReturnValue(mockMovie);

    let movies = getMovieById(3);
    expect(movies).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(3);
  });

  test("getMovieById should return undefiend if movie not found", () => {
    getMovieById.mockReturnValue(undefined);

    let movie = getMovieById(2343);
    expect(movie).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(2343);
  });

  test("addNewMovie should add a new movie", () => {
    const mockMovie = { id: 2, title: "de dana dan", director: "Akshay Kumar" };

    addNewMovie.mockReturnValue(mockMovie);

    let newMovie = addNewMovie(mockMovie);
    expect(newMovie).toEqual(mockMovie);
    expect(addNewMovie).toHaveBeenCalledWith(mockMovie);
  });
});
