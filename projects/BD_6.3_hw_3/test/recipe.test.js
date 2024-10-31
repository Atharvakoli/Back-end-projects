let { app, getAllRecipes, getRecipeById, addNewRecipe } = require("../index");

let http = require("http");
let request = require("supertest");

jest.mock("../index", () => ({
  ...jest.requireActual("../index"),
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addNewRecipe: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Recipes Functions Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be able to return a list of recipes", async () => {
    let mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];

    getAllRecipes.mockResolvedValue(mockRecipes);

    let recipes = await request(server).get("/recipes");
    expect(recipes.statusCode).toEqual(200);
    expect(recipes.body).toEqual(mockRecipes);
  });

  it("should be able to return details of specified recipe id", async () => {
    let mockRecipes = {
      id: 2,
      name: "Chicken Tikka Masala",
      cuisine: "Indian",
      difficulty: "Hard",
    };

    getRecipeById.mockResolvedValue(mockRecipes);

    let recipe = await request(server).get("/recipes/details/2");
    expect(recipe.statusCode).toEqual(200);
    expect(recipe.body).toEqual(mockRecipes);
  });

  it("should be able to return null, if specified id not find", async () => {
    getRecipeById.mockResolvedValue(null);

    let recipe = await request(server).get("/recipes/details/888");
    expect(recipe.statusCode).toEqual(404);
    expect(recipe.body).toEqual({ message: "Recipe, Not found :)" });
  });

  it("should be able to return added recipe", async () => {
    let mockRecipe = {
      id: 3,
      name: "Masala dosa with cheese",
      cuisine: "Indian",
      difficulty: "Easy",
    };

    addNewRecipe.mockResolvedValue(mockRecipe);

    let recipe = await request(server).post("/recipes/new").send({
      name: "Masala dosa with cheese",
      cuisine: "Indian",
      difficulty: "Easy",
    });

    expect(recipe.statusCode).toEqual(200);
    expect(recipe.body).toEqual(mockRecipe);
  });
});
