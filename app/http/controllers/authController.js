const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/'
    }
    
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res) {
         const { name, email, phone, address, password } = req.body
         // Validate request 
         if(!name || !email || !phone || !password) {
             req.flash('error', 'All fields are required')
             req.flash('name', name)
             req.flash('email', email)
             req.flash('phone', phone)
            return res.redirect('/register')
         }

         // Check if email exists 
         User.exists({ email: email }, (err, result) => {
             if(result) {
                req.flash('error', 'Email already taken')
                req.flash('name', name)
                req.flash('email', email)
                req.flash('phone', phone)
                return res.redirect('/register')
             }
         })

         // Hash password 
         const hashedPassword = await bcrypt.hash(password, 10)
         // Create a user 
         const user = new User({
             name,
             email,
             phone,
             address,
             password: hashedPassword
         })

         user.save().then((user) => {
            // Login
            return res.redirect('/login')
         }).catch(err => {
            req.flash('error', 'Something went wrong')
                console.log(err);
                return res.redirect('/register')
         })
        },
        logout(req, res) {
          req.logout()
          delete req.session.cart;
          return res.redirect('/login')  
        }
    }
}

module.exports = authController