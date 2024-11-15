const { getMovies, getMovieById, addNewMovie } = require("../movies.controller");


describe("Movies function", () => {
  it("should get all movies", () => {
    let movies = getMovies();
    expect(movies.length).toBe(4);
    expect(movies).toEqual([
      { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
      { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
      { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' },
      { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino' }
    ]);
  });
  
  it('should be able to get a movie by id', () => {
    let movie = getMovieById(2);
    expect(movie).toEqual( { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' })
  })
  
  it('should be a non-existing movie', () => {
    let movie = getMovieById(34);
    expect(movie).toBeUndefined();
  })
  
  it('should be able to add a new movie', () => {
    let newMovie = {title: 'The Godfather', director: 'Francis Ford Coppola' };
    let addedMovie = addNewMovie(newMovie);
    expect(addedMovie).toEqual({ id: 5, title: 'The Godfather', director: 'Francis Ford Coppola' });

    const movies = getMovies();
    expect(movies.length).toBe(5);

    expect(movies).toEqual([
                            { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
                            { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
                            { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' },
                            { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino' }, { id: 5, title: 'The Godfather', director: 'Francis Ford Coppola' }
                          ])
  })
})