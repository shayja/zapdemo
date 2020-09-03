const mongoose = require('mongoose');
const Product = require('./product.model');

mongoose
    .connect('mongodb://localhost:27017/zapdemo_db', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the zap mongodb database!');
    })
    .catch(err => {
        console.log('Cannot connect to zap mongodb database!', err);
        process.exit();
    });

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
