const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const { authentication } = require('../middlewares')

router.get("/", authentication, controller.findAllUser)
router.post("/", controller.registerUser)
router.post("/login", controller.loginUser)
router.get("/:id", authentication, controller.findUserByPk)
router.patch("/:id", authentication, controller.updateUserByPk)
router.patch("/:id/role/:role", authentication, controller.updateUserRoleByPk)
router.delete("/:id", authentication, controller.deleteUser)

module.exports = router