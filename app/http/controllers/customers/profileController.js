const User = require('../../../models/user')


function profileController() {
    return {
        user (req, res) {
            User.findById(req.params.id, (err, doc) => {
                if(!err) {
                    doc = doc.toObject()
                    res.render('customers/user', {
                        user: doc
                    })
                }
            })
        },
        updateUser (req, res) {
            return res.render('customers/update_user')
        },
        update (req, res) {
            User.findByIdAndUpdate({_id: req.body._id}, req.body, { new:true }, (err, doc) => {
                if(!err) {
                    res.redirect("/");
                }
                else {
                    if(err.name == 'validationError') {
                        handleValidationError(err, req.body);
                        res.render('/user/update', {
                            user: req.body
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

module.exports = profileController