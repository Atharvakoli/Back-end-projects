let {
  getAllRecipes,
  getRecipeById,
  addNewRecipe,
} = require("../controllers/recipe.controller");

let { app } = require("../index");
let http = require("http");
let request = require("supertest");

jest.mock("../controllers/recipe.controller", () => ({
  ...jest.requireActual("../controllers/recipe.controller"),
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
  beforeEach(() => {
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
    expect(getAllRecipes).toHaveBeenCalled();
  });

  it("should be able to return null, if recipes not found", async () => {
    getAllRecipes.mockResolvedValue(null);

    let recipes = await request(server).get("/recipes");
    expect(recipes.statusCode).toEqual(404);
    expect(recipes.body).toEqual({ message: "Recipes Not found :)" });
    expect(getAllRecipes).toHaveBeenCalled();
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
    expect(getRecipeById).toHaveBeenCalledWith(2);
  });

  it("should be able to return null, if specified id not find", async () => {
    getRecipeById.mockResolvedValue(null);

    let recipe = await request(server).get("/recipes/details/888");
    expect(recipe.statusCode).toEqual(404);
    expect(recipe.body).toEqual({ message: "Recipe, Not found :)" });
    expect(getRecipeById).toHaveBeenCalledWith(888);
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
    expect(addNewRecipe).toHaveBeenCalledWith({
      name: "Masala dosa with cheese",
      cuisine: "Indian",
      difficulty: "Easy",
    });
  });

  it("should be able to return null, if recipe is not created", async () => {
    addNewRecipe.mockResolvedValue(null);

    let recipe = await request(server).post("/recipes/new").send({});
    expect(recipe.statusCode).toEqual(404);
    expect(recipe.body).toEqual({ message: "Recipe, Not found :)" });
  });
});
