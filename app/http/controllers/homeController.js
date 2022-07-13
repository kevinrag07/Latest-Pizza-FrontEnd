const Menu = require('../../models/menu')
const Feedback = require('../../models/feedback')

function homeController() {
    return {
        async index(req, res) {
            const pizzas = await Menu.find()
            return res.render('home', { pizzas: pizzas })
        },
        review(req, res) {
            var feedback = new Feedback({
                fname: req.body.fname,
                email: req.body.email,
                feedback: req.body.feedback
            });
            feedback.save((err, doc) => {
                if (!err)
                    res.redirect('/#contact');
            });
        },
    }
}

module.exports = homeController