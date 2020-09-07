//console.log('Hello Zap');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

app.use('/products', require('./product.router'));

const PORT = process.env.PORT || 8080;

app.on('app-is-ready', function() { 
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}.`);
    });
});

//---------------------Start Mongoose

// Import the mongoose module
const mongoose = require('mongoose');
// Set up mongoose connection
mongoose.connect(
    //process.env.DB_CONN_STR, {
    'mongodb://localhost:27017/zapdemo_db', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }); 

// 27017 is the port where MongoDB runs locally
// "zapdemo_db" is the name of the database we are connecting.
mongoose.connection.once('open', () => { 
    // All OK - fire (emit) a ready event. 
    console.log('zap mongodb database connection successfull');
    app.emit('app-is-ready'); 
});

// log any db error.
mongoose.connection.on('error', err => {
    console.error(err);
});

//---------------------End Mongoose