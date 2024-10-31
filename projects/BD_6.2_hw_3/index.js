const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function addNewProduct(newProductsDetails) {
  let newProduct = { id: products.length + 1, ...newProductsDetails };
  products.push(newProduct);
  return;
}

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

module.export = { app, getAllProducts, getProductById, addNewProduct };
