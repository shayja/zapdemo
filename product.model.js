const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema(
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

module.exports = mongoose.model('Product', schema);
