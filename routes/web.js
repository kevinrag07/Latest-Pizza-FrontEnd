const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartcontroller');
const orderController = require('../app/http/controllers/customers/orderController');
const homeController = require('../app/http/controllers/homeController')
const adminOrderController = require('../app/http/controllers/admin/orderController');
const dataController = require('../app/http/controllers/admin/dataController');
const viewController = require('../app/http/controllers/admin/viewController');
const profileController = require('../app/http/controllers/customers/profileController');
const multer = require('multer')

// MiddleWare
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');
const statusController = require('../app/http/controllers/admin/statusController');
const updateController = require('../app/http/controllers/admin/updateController');

function initRoutes(app) {
    app.get("/", homeController().index)
    app.post("/", homeController().review)
    app.get("/login", guest, authController().login)
    app.post("/login", authController().postLogin)
    app.get("/register", guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get("/cart", cartController().index)
    app.post('/update-cart', cartController().update)
    app.get('/cart/delete/:id', cartController().delete)
    app.get('/cart/plus/:id', cartController().plus)

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)
    app.get('/user/:id', profileController().user)
    app.get('/update_user', auth, profileController().updateUser)
    app.post('/user/update', auth, profileController().update)


    const storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './public/img');
        },
        filename: (req, file, cb)=>{
            console.log(file)
            cb(null, Date.now() + file.originalname);
        }
    }); 
    const upload = multer({
        storage: storage
    });


    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.get('/admin/completedOrder', admin, adminOrderController().view)
    app.post('/admin/order/status', admin, statusController().update)
    app.get('/admin/view', admin, viewController().view)
    app.get('/admin/data', admin, dataController().add)
    app.post('/admin/data', admin, upload.single('image'), dataController().data)
    app.get('/admin/view/delete/:id', admin, dataController().delete)
    app.get('/admin/update/:id', admin, updateController().view)
    app.get('/admin/update', admin, updateController().add)
    app.post('/admin/update', admin, upload.single('image'), updateController().data)
}

module.exports = initRoutes;