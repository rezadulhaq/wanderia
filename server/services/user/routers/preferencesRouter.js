const express = require('express')
const router = express.Router()
const controller = require('../controllers/preferencesController')
const { authentication } = require('../middlewares')


router.get("/", controller.findAllPreferences)
router.post("/",authentication, controller.registerPreferences)
router.get("/:id", controller.findPreferencesByPk)
router.patch("/:id",authentication, controller.updatePreferencesByPk)
router.delete("/:id",authentication, controller.deletePreferences)

module.exports = router