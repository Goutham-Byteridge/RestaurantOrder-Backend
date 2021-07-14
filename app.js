const express = require('express');
const cors = require('cors');

const app = express();

require('./utils/errorHandler');

const orderRouter = require('./src/order/order.routes');

const menuRouter = require('./src/menu/menu.routes');

app.disable('x-powered-by');

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(cors({
    origin: ['http://localhost:4401', 'http://localhost:4200']
}));

app.use('/order', orderRouter);

app.use('/menu', menuRouter);

module.exports = app;