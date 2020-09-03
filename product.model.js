const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minlength: 2
        },
        description: String,
        price: Number
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', schema);

module.exports = Product;
