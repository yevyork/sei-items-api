const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()

router.get('/', (req, res) => res.send('This is root!'))
router.get('/users/:id', controllers.getUserById)
router.post('/users', controllers.createUser)
router.get('/users', controllers.getAllUsers)
router.put('/users/:id', controllers.updateUser)
router.delete('/users/:id', controllers.deleteUser)

router.get('/users/:user_id/items/:item_id', controllers.getItemByUserId)
router.get('/users/:user_id/items', controllers.getItemsFromUser)
router.get('/users/:id/items', controllers.getItemsFromUser)
router.post('/users/:user_id/items', controllers.createItem)
router.get('/items/:id', controllers.getItem)
router.put('/items/:id', controllers.updateItem)
router.delete('/items/:id', controllers.deleteItem)

module.exports = router
