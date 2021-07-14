const data = require('../../config/data.json');

let menu = data.menu;

exports.getMenu = () => {
    return Object.values(menu);
}

exports.getItem = (itemId) => {
    return menu[itemId];
}