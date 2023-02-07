const express = require('express')
const RoutesController = require('../controllers/routesController')
const router = express.Router()

router.get('/', RoutesController.getAllRoutes)
router.post('/', RoutesController.addRoute)
router.get('/:UserId', RoutesController.getOneRoute)
router.delete('/:UserId', RoutesController.deleteOneRoute)

module.exports = router