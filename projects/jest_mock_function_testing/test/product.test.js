let {
  getAllProducts,
  getProductById,
  addNewProduct,
} = require("../product.controller");

let { app } = require("../index");

let http = require("http");

jest.mock("../product.controller", () => ({
  ...jest.requireActual("../product.controller"),
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  addNewProduct: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Prducts Functions Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllProducts should return a list of products", () => {
    let mockProducts = [
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ];

    getAllProducts.mockReturnValue(mockProducts);

    let products = getAllProducts(mockProducts);
    expect(products.length).toBe(4);
    expect(products).toEqual(mockProducts);
    expect(getAllProducts).toHaveBeenCalled();
  });

  test("getProductById should return product details with specified ID", () => {
    let mockProduct = { id: 3, name: "Headphones", category: "Electronics" };

    getProductById.mockReturnValue(mockProduct);

    let product = getProductById(3);
    expect(product).toEqual(mockProduct);
    expect(getProductById).toHaveBeenCalledWith(3);
  });

  test("getProductById, should return a undefined value if product id not found", () => {
    getProductById.mockReturnValue(undefined);

    let product = getProductById(3455);
    expect(product).toBeUndefined();
    expect(getProductById).toHaveBeenCalledWith(3455);
  });

  test("addNewProduct should return a added product into database", () => {
    let mockNewProduct = { name: "Laptop", category: "Electronics" };

    addNewProduct.mockReturnValue(mockNewProduct);

    let newProduct = addNewProduct(mockNewProduct);
    expect(newProduct).toEqual(mockNewProduct);
    expect(addNewProduct).toHaveBeenCalledWith(mockNewProduct);
  });
});
