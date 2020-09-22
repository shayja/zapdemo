//console.log('Hello Zap, let\'s build node.js app!');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

/*
const logger = require('./logger');
logger.log('Hi Zap, hello from logger')
*/
const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 8080;

app.on('app-is-ready', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to zap product api!' });
});

app.use('/product', require('./product.router'));

//---------------------Start Mongoose

// Import the mongoose module
const mongoose = require('mongoose');
// Set up mongoose connection
mongoose.connect(
    //process.env.DB_CONN_STR, {
    'mongodb+srv://shayja:shayshay@clusterzapapi.rc68j.gcp.mongodb.net/zapapi_db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// MongoDB is connecting via port 27017
// "zapapi_db" is the name of the database we are connecting.
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