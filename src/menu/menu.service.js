const menuStore = require('./menu.store');

exports.fetch = () => {
    return menuStore.getMenu();
}

exports.validateItems = (items) => {
    //Check if the items exist in the menu. Return total amount for all items.
    let amount = 0;
    items.forEach((itemId) => {
        const item = menuStore.getItem(itemId);
        if (typeof(itemId) !== 'string' || !item) {
            throw "Invalid Item";
        }
        amount += item.amount;
    })
    return amount;
}