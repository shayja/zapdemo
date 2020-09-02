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

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});
