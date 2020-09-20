const router = require('express').Router();

// Create a new product
router.post('/', function (req, res) {
    console.log(req.body);
    res.status(200).json('OK - product created');
});

// Retrieve all products
router.get('/', function (req, res) {
    res.status(200).json('OK - product get all');
});

// Retrieve a single product by its id
router.get('/:id', function (req, res) {
    console.log(req.params);
    res.status(200).json('OK - product get by id');
});

// Update a single product by its id
router.put('/:id', function (req, res) {
    console.log(req.body);
    res.status(200).json('OK - product updated');
});

// Update some of the product properties.
router.patch('/:id', function (req, res) {
    console.log(req.body);
    res.status(200).json('OK - product updated');
});

// Delete a product with id
router.delete('/:id', function (req, res) {
    console.log(req.params);
    res.status(200).json('OK - product deleted');
});

// Search product by name
router.get('/search/:name', function (req, res) {
    console.log(req.body.name);
    res.status(200).json('OK - product search');
});


module.exports = router;