const orderService = require('./order.service');
const menuService = require('../menu/menu.service');

exports.create = (req, res) => {
    try {
        const { userId, items } = req.body;
        const amount = menuService.validateItems(items);
        const order = orderService.create(userId, items, amount);
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        errorHandler(err, res);
    }
}

exports.postReview = (req, res) => {
    try {
        const { orderId, rating, comments } = req.body;
        const order = orderService.postReview(rating, comments, orderId)
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (err) {
        errorHandler(err, res);
    }
}