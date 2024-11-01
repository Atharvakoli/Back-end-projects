let request = require("supertest");
let { app, getStocks, addTrade } = require("../index");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getStocks: jest.fn(),
  addTrade: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints Tests", () => {
  it("GET /stocks should be able to return list of stocks", async () => {
    let res = await request(server).get("/stocks");
    expect(res.status).toBe(200);
    expect(res.body.stocks).toEqual([
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ]);
  });

  it("GET /stocks/:ticker should be able to return details of specified ticker", async () => {
    let res = await request(server).get("/stocks/GOOGL");
    expect(res.status).toBe(200);
    expect(res.body.stocks).toEqual({
      stockId: 2,
      ticker: "GOOGL",
      companyName: "Alphabet Inc.",
      price: 2750.1,
    });
  });

  it("POST /trades should be able to add new trade return new trade", async () => {
    let res = await request(server).post("/trades/new").send({
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    });
    expect(res.status).toBe(201);
    expect(res.body.trade).toEqual({
      tradeId: 4,
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    });
  });
});

describe("API Enpoints Error handling", () => {
  it("GET /stocks/:ticker should be able to handle error for invalid inputs", async () => {
    let ticker = "ggoogl";
    let res = await request(server).get(`/stocks/${ticker}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toEqual("Stocks of " + ticker + " Ticker NOT FOUND");
  });

  it("POST /trades should be able to handle error message correctly", async () => {
    let res = await request(server).post("/trades/new").send({
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      "Credential are required and should be in specific type"
    );
  });
});

describe("API Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("getAllStocks should be able to return list of stocks", () => {
    let mockStock = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ];

    getStocks.mockReturnValue(mockStock);

    let stocks = getStocks();
    expect(getStocks).toHaveBeenCalled();
    expect(stocks.length).toBe(3);
    expect(stocks).toEqual(mockStock);
  });

  it("addTrade should be able to add trade return added trade", async () => {
    let mockTrade = {
      tradeId: 4,
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    };

    addTrade.mockReturnValue(mockTrade);

    let trade = await addTrade({
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    });
    expect(addTrade).toHaveBeenCalledWith({
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    });
    expect(trade).toEqual(mockTrade);
  });
});
