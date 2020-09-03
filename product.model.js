const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/zapdemo_db';

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

schema.method('toJSON', function() {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
  
db.Product = mongoose.model('Product', schema);

module.exports = db;
