const express = require('express');
const controller = require('./order.controller');
const validationMiddleware = require('../../middleware/validator');
const router = express.Router();

router.post('/', validationMiddleware.createOrder, controller.create);

router.post('/review', validationMiddleware.postReview, controller.postReview);

module.exports = router;