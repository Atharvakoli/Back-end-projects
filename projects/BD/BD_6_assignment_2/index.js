const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BD_6_assignment_1");
});

let stocks = [
  { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
  { stockId: 2, ticker: "GOOGL", companyName: "Alphabet Inc.", price: 2750.1 },
  { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
];

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
];

function getStocks() {
  return stocks;
}

function getStocksByTicker(ticker) {
  return stocks.find(
    (stock) => stock.ticker.toLowerCase() === ticker.toLowerCase()
  );
}

function validateTrade(newTrade) {
  if (
    !newTrade.stockId ||
    (typeof newTrade.stockId !== "number" && !newTrade.quantity) ||
    (typeof newTrade.quantity !== "number" && !newTrade.tradeType) ||
    (typeof newTrade.tradeType !== "string" && !newTrade.tradeDate) ||
    typeof newTrade.tradeDate !== "string"
  ) {
    return "Credential are required and should be in specific type";
  }
}

async function addTrade(trade) {
  let newTrade = {
    tradeId: trades.length + 1,
    ...trade,
  };
  trades.push(newTrade);
  return newTrade;
}

app.get("/stocks", async (req, res) => {
  let stocks = getStocks();

  if (!stocks) {
    return res.status(404).json({ error: "Stock, NOT FOUND" });
  }
  res.status(200).json({ stocks });
});

app.get("/stocks/:ticker", async (req, res) => {
  let ticker = req.params.ticker;
  let stocksByTicker = getStocksByTicker(ticker);

  if (!stocksByTicker) {
    return res
      .status(404)
      .json({ error: "Stocks of " + ticker + " Ticker NOT FOUND" });
  }
  res.status(200).json({ stocks: stocksByTicker });
});

app.post("/trades/new", async (req, res) => {
  let newTradeDetails = req.body;
  let isNotValid = validateTrade(newTradeDetails);

  if (isNotValid) {
    console.log(isNotValid);
    return res.status(400).json({ error: isNotValid });
  } else {
    let newTrade = await addTrade(newTradeDetails);
    res.status(201).json({ trade: newTrade });
  }
});

module.exports = { app, getStocks, getStocksByTicker, validateTrade, addTrade };
