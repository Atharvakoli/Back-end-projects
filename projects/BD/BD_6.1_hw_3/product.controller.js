const {products} = require('./productsData.js');

function getAllProducts() {
  return products;
}

function getProductById(id) {
  let findProductById = products.find((product) => product.id === id);
  return findProductById;
}

function addNewProduct(newProductDetails) {
  let newProduct = {
    id: products.length + 1,
    ...newProductDetails,
  }

  products.push(newProduct);

  return newProduct;
}

 
module.exports = { getAllProducts, getProductById, addNewProduct };