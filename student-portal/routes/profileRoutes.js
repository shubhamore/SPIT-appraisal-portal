const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profileController')
router.put('/personal', profileController.updatePersonalInfo)
router.put('/parental', profileController.updateParentalInfo)
router.put('/photo', profileController.updateProfilePic)
router.put('/educational',profileController.updateEducationalInfo)
module.exports = router