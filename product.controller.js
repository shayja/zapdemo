const Product = require('./product.model');

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: 'Product name cannot be empty!' });
        return;
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price ? req.body.price : 0
    });

    console.log('Product to save', product);

    // Save Product in the database
    product
        .save(product)
        .then(data => {
            console.log('then(data', data);
            res.send(data);
        })
        .catch(err => {
            console.error('Products save err', err);

            res.status(500).send({
                message:
                err.message || 'Some error occurred while creating the product.'
            });
        });
};

exports.findAll = (req, res) => {
    Product.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving products.'
            });
        });
};

exports.findOne = (req, res) => {
    console.log(`calling api method: findOne, id: ${req.params.id}`);
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (!data){
                res.status(404).send({ message: `Product Not found # id ${id}` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: `Error retrieving Product with id=${id}` });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!'
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Product with id=${id} not found!` });
            } else {
                res.send({ message: 'Product was updated successfully.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: `Cannot update Product #${id}`
            });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Product with id=${id} not found!`
                });
            } else {
                res.send({
                    message: 'Product was deleted successfully!'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: `Cannot delete Product #${id}`
            });
        });
};

exports.search = (req, res) => {
    const name = req.params.name;
    // Validate request
    if (!name) {
        res.status(400).send({ message: 'Product name cannot be empty!' });
        return;
    }

    Product.
        find()
        .where('name').equals(name)
        .where('price').gt(500).lt(5000)    //Additional where query
        // .skip(100)                       // skip the first 100 items
        .limit(5)                           // limit to n items
        .sort({ price: 1 })                 // sort ascending by price
        .select('name price')               // select name+price
        .exec(/*callback here*/)            // execute the query
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Product with name=${name} not found!`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                message: `Cannot find Product with name${name}`
            });
        });
};