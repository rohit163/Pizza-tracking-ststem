const Menu = require('../../models/Menu')

const homeController = () => {
    return {
        index: async (req, res) => {
            try {
                const pizzas = await Menu.find({})
                res.render('home', { pizzas })
            } catch (error) {
                res.send(error)
            }
        }
    }
}

module.exports = homeController
