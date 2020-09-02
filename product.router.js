module.exports = (app) => {

    const router = require('express').Router();
  
    const products = require('./product.controller');

    // Create a new product
    router.post('/', products.create);

    // Retrieve all products
    router.get('/', products.findAll);

    // Retrieve a single product by its id
    router.get('/:id', products.findOne);

    // Update a single product by its id
    router.put('/:id', products.update);

    // Delete a product with id
    router.delete('/:id', products.delete);
  
    app.use('/product', router);

};
