const Product = require('./product.model');

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ error: 'Product name cannot be empty!' });
        return;
    }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price ? req.body.price : 0
    });

    console.log('Product to save', product);

    try {
        // Save Product in the database
        await product.save();
        res.send(product);
    } catch(err) {
        console.error(err);
        res.status(500).send({ error: err.message || 'Error occurred while creating the product.' });
    }
};

exports.findAll = async (req, res) => { 
    try {
        const products = await Product.find();
        res.send(products);
    } catch(err) {
        console.error(err);
        res.status(500).send({ error: err.message || 'Some error occurred while retrieving products.' });
    }
};

exports.findOne = async (req, res) => {
    console.log(`calling api method: findOne, id: ${req.params.id}`);

    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product){
            res.status(404).send({ error: `Product with id=${id} not found!`});
        } else {
            res.send(product);
        }
    } catch(err) {
        console.error(err);
        res.status(500).send({ message: `Error retrieving Product with id=${id}` });
    }
};

exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: 'Product to update can not be empty!' });
    }

    const id = req.params.id;

    try {
        const data = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
        if (!data) {
            res.status(404).send({ error: `Product with id=${id} not found!` });
        } else {
            res.send({ message: 'Product was updated successfully.' });
        }
    } catch(err) {
        console.error(err);
        res.status(500).send({ error: `Cannot update Product #${id}` });
    }
};

// Update few properties of a model.
exports.updateProps = async (req, res) => {
    
    const id = req.params.id;

    try {
        const product = await Product.findOne({ _id: id });
    
        if (req.body.name) {
            product.name = req.body.name;
        }
        await product.save();
        res.send(product);
    } catch {
        res.status(404).send({ message: `Product Not found # id ${id}` });
    }
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findByIdAndRemove(id, { useFindAndModify: false });
        console.log('Product was deleted successfully!');
        res.status(204).send();
    } catch(err) {
        console.error(err);
        res.status(404).send({ error: `Product with id=${id} not found!` });
    }
};


exports.search = async (req, res) => {
    const name = req.params.name;
    
    // Validate request
    if (!name) {
        return res.status(400).send({ error: 'Product name cannot be empty!' });
    }

    try {
        const data = await Product
            .find()
            .where('name').equals(name)
            .where('price').gt(500).lt(5000)    //Additional where query
        // .skip(100)                           // skip the first 100 items
            .limit(5)                           // limit to n items
            .sort({ price: 1 })                 // sort ascending by price
            .select('name price')               // select name+price
            .exec(/*callback here*/);            // execute the query
        if (!data) {
            res.status(404).send({ error: `Product with name=${name} not found!` });
        } else {
            res.send(data);
        }
    } catch(err) {
        console.error(err);
        res.status(500);
        res.send({ error: `Cannot find Product with name${name}` });
    }
};