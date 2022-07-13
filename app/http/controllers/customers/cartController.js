const { json } = require("express")
const { session } = require("passport")

function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
            
            // for the first time creating cart and adding basic object structure
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // Check if item does not exist in cart 
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1,
                    price : req.body.price
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })
        },
        delete(req, res) {
            let cart = req.session.cart
            let cid = req.params.id
            if( cart.totalQty >= 1 ) {
                cart.items[cid].qty = cart.items[cid].qty - 1                
                cart.totalQty = cart.totalQty - 1
                cart.totalPrice = cart.totalPrice - cart.items[cid].price

                if( cart.totalQty == 0 ) {
                    delete req.session.cart
                    return res.redirect('/cart')
                }
                res.redirect('/cart')
            }
        },
        plus(req, res) {
            let cart = req.session.cart
            let cid = req.params.id
            if( cart.items[cid].qty >= 1 ) {
                cart.items[cid].qty = cart.items[cid].qty + 1                
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + cart.items[cid].price
                res.redirect('/cart')
            }
        }
    }
}

module.exports = cartController