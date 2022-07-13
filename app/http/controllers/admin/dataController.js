const Menu = require('../../../models/menu');

function dataController() {
    return {
        data(req, res) {
            var menu = new Menu({
                name: req.body.name,
                image: req.file.filename,
                price: req.body.price,
                category: req.body.category,
                size: req.body.size
            });
            // console.log(menu);
            menu.save((err, doc) => {
                if (!err)
                    res.redirect('data');
            });
        },
        add(req, res) {
            return res.render('admin/data')
        },
        delete(req,res) {
            Menu.findByIdAndRemove(req.params.id, (err,doc) => {
                if(!err) {
                    res.redirect('/admin/view')
                }
                else {
                    console.log('Failed To Delete Data :( ' + err);
                }
            });
        }
    }
}

module.exports = dataController