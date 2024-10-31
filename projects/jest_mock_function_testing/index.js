const express = require("express");
let {
  getAllProducts,
  getProductById,
  addNewProduct,
} = require("./product.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jest mock function testing");
});

app.get("/products", (req, res) => {
  let products = getAllProducts();
  if (!products) {
    res.json({ message: "products not Found" });
  } else {
    res.json({ products });
  }
});

app.get("/products/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let productsById = getProductById(id);
  if (!productsById) {
    res.json({ message: "product not Found" });
  } else {
    res.json({ productsById });
  }
});

app.post("/products/new", (req, res) => {
  let newProductsDetails = req.body;
  let newProduct = addNewProduct(newProductsDetails);
  if (!newProduct) {
    res.json({ message: "products Not Added" });
  } else {
    res.json({ newProduct });
  }
});

module.exports = { app };
