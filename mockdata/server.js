// console.log('Hello Zap');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to zap api' });
});
/*
const logger = require('./logger');
logger.log('Hi Zap, hello from logger')
*/
app.use('/product', require('./product.router'));