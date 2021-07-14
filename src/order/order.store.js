const uuid = require('uuid');

let orders = [];

function Order(id, userId, amount, items, date) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.items = items;
    this.date = date;
    this.updateReview = function(rating, comments) {
        this.rating = rating;
        this.comments = comments;
    }
}

exports.placeOrder = (userId, items, amount) => {
    const order = new Order(uuid.v4(), userId, amount, items, new Date());
    orders.push(order);
    return order;
}

exports.postReview = (rating, comments, orderId) => {
    const order = orders.find(function (obj) {
        return obj.id === orderId;
    });
    if(!order) {
        throw "Invalid orderId"
    }
    if(order.rating === undefined) {
        order.updateReview(rating, comments);
        return order;
    }
    else {
        throw "Review already given";
    }
}