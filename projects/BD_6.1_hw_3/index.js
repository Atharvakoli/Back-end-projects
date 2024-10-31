const express = require("express");
const { getAllProducts, getProductById, addNewProduct } = require("./product.controller");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Writing Test for Apis...!");
});

app.get('/products', (req, res) => {
  let products = getAllProducts();
  res.json({products});
})

app.get('/products/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let product = getProductById(id);
  res.json({product});
})

app.post('/products/new', (req, res) => {
  let newProductDetails = req.body;
  let product = addNewProduct(newProductDetails);
  res.status(201).json({product});
})

app.listen(port, () => {
  console.log(`Example app is listening on http://localhost:${port}`);
});

module.exports = { app };
