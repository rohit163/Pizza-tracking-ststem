const homeController = require('../app/http/controllers/homeControllers')
const authController = require('../app/http/controllers/auth.controller')
const cartController = require('../app/http/controllers/cartController')

function initRoutes(app) {

    app.get('/', homeController().index)

    app.get('/login', authController().login)

    app.get('/register', authController().register)

    app.get('/cart', cartController().cart)

    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes