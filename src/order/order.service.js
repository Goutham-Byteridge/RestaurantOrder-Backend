const orderStore = require('./order.store');

exports.create = (userId, items, amount) => {
    return orderStore.placeOrder(userId, items, amount);
}

exports.postReview = (rating, comments, orderId) => {
    return orderStore.postReview(rating, comments, orderId);
}