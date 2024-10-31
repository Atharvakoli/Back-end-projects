let { getAllProducts, getProductById, addNewProduct } = require('../product.controller');


describe('Products Functions', () => {
  it('should be able to get all products', () => {
    let products = getAllProducts();
    expect(products.length).toBe(4);
    expect(products).toEqual([
                              { id: 1, name: 'Laptop', category: 'Electronics' },
                              { id: 2, name: 'Coffee Maker', category: 'Appliances' },
                              { id: 3, name: 'Headphones', category: 'Electronics' },
                              { id: 4, name: 'Running Shoes', category: 'Footwear' }
                            ]);
  });

  it("should be able to get product by id", () => {
    const product = getProductById(2);
    expect(product).toEqual( { 'id': 2, 'name': 'Coffee Maker', 'category': 'Appliances' });
  });

  it('should be able to identify non-existing product id', () => {
    const product = getProductById(21);
    expect(product).toBeUndefined();
  })

  it('should be able to add a new product', () => {
    let newProduct = { name: 'Coffee Maker', category: 'Appliances' };
    let addedProduct = addNewProduct(newProduct);
    expect(addedProduct).toEqual({ id: 5, name: 'Coffee Maker', category: 'Appliances' });
  })
})