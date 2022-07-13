const Menu = require('../../../models/menu');

function updateController() {
    return {
        view(req, res) {
            Menu.findById(req.params.id, (err, doc) => {
                if(!err) {
                    doc = doc.toObject()
                    res.render('admin/update', {
                        menu: doc
                    })
                }
            })
        },
        add(req, res) {
            return res.render('admin/data')
        },
        data(req, res) {
            Menu.findByIdAndUpdate({_id: req.body._id}, req.body, { new:true }, (err, doc) => {
                if(!err) {
                    res.redirect("/admin/view");
                }
                else {
                    if(err.name == 'validationError') {
                        handleValidationError(err, req.body);
                        res.render('/admin/update', {
                            menu: req.body
                        })
                    }
                    else {
                        console.log('Error During Record Update :( ' + err);
                    }
                }
            })
        }
    }
}

module.exports = updateController