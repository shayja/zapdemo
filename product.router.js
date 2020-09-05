
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

// Update some of the product properties.
router.patch('/:id', products.updateProps);

// Delete a product with id
router.delete('/:id', products._delete);

// Search product by name
router.get('/search/:name', products.search);

module.exports = router;