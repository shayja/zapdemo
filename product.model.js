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
    {
        timestamps: true,
        versionKey: false
    }
);

schema.set('toJSON', {
    transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Product', schema);
