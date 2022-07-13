const Menu = require('../../../models/menu')

function viewController() {
    return {
        async view(req, res) {
            const pizzas = await Menu.find()
            return res.render('admin/view', { pizzas: pizzas })
        }
    }
}

module.exports = viewController