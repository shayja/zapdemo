module.exports = (app) => {

    const router = require('express').Router();
  
    // Create a new product
    router.post('/', function(req, res){ 
        res.status(200).json({ message: 'ok create'}); 
    });

    // Retrieve all products
    router.get('/', function(req, res){ 
        res.status(200).json({ message: 'ok findAll' }); 
    });

    // Retrieve a single product by its id
    router.get('/:id', function(req, res){ 
        res.status(200).json({ message: 'ok findOne' }); 
    });

    // Update a single product by its id
    router.put('/:id', function(req, res){ 
        res.status(200).json({ message: 'ok update' }); 
    });

    // Update some of the product properties.
    router.patch('/:id', function(req, res){ 
        res.status(200).json({ message: 'ok updateProps' }); 
    });

    // Delete a product with id
    router.delete('/:id', function(req, res){ 
        res.status(200).json({ message: 'ok delete' }); 
    });
  
    // Search product by name
    router.get('/search/:name', function(req, res){ 
        res.status(200).json({ message: 'ok search' }); 
    });

    app.use('/product', router);

};
