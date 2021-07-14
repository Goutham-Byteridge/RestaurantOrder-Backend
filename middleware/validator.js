exports.createOrder = (req, res, next) => {
    const { userId, items } = req.body;
    if (userId === undefined || items === undefined) {
        errorHandler("Missing required fields", res);
    }
    else if (typeof (userId) !== 'string') {
        errorHandler("Invalid userId", res);
    }
    else if (typeof (items) !== 'object') {
        errorHandler("Invalid items", res);
    }
    else if (items.length === 0) {
        errorHandler("Items cannot be empty", res);
    }
    else {
        next();
    }
}

exports.postReview = (req, res, next) => {
    const commentsRegex = /^[a-z0-9]+(\s+[a-z0-9]+)*$/i;
    const { orderId, rating, comments } = req.body;
    if (orderId === undefined || rating === undefined || comments === undefined) {
        errorHandler("Missing required fields", res);
    }
    else if (typeof (orderId) !== 'string') {
        errorHandler("Invalid orderId", res);
    }
    else if (typeof (rating) !== 'number') {
        errorHandler("Invalid rating", res);
    }
    else if (typeof (comments) !== 'string' || !commentsRegex.test(comments)) {
        errorHandler("Invalid comments", res);
    }
    else {
        next();
    }
}