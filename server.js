//console.log('Hello Zap');

const express = require('express');
const cors = require('cors');
/*
const logger = require('./logger');
logger.log('Hi Zap');
*/
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
    res.json({message: 'Welcome to zap new api'});
});

require('./product.router')(app);

const PORT = process.env.PORT || 8080;

const initMongoDb = () => {
    
    // Import the mongoose module
    const mongoose = require('mongoose');

    // Set up mongoose connection
    const mongo_url = 'mongodb://localhost:27017/zapdemo_db';
    
    // 27017 is the port where MongoDB runs locally
    // "zapdemo_db" is the name of the database we are connecting.
    mongoose.connect(
        mongo_url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        .then(() => console.log('zap mongodb database connection successfull'))
        .catch((err) => {
            console.log('Cannot connect to zap mongodb database!', err);
            process.exit();
        });

    // log any db error.
    mongoose.connection.on('error', err => {
        console.error(err);
    });
};

app.listen(PORT, ()=>{
    initMongoDb();
    console.log(`Server is running on port ${PORT}.`);
});
