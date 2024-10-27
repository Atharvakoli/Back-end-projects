let { products } = require("./productsData");

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

module.exports = { getAllProducts, getProductById, addNewProduct };
