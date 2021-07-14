const menuService = require('./menu.service');

exports.fetch = (req, res) => {
    try {
        const menu = menuService.fetch();
        res.status(200).json({
            success: true,
            data: menu
        });
    } catch (err) {
        errorHandler(err, res);
    }
}