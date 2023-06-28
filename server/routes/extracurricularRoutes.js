const express = require('express')
const router = express.Router()

const extracurricularController = require('../controllers/extracurricularController')
router.put('/setYourCommittee',extracurricularController.setYourCommittee)
router.put('/deleteYourCommittee',extracurricularController.deleteYourCommittee)
router.put('/getYourCommittee',extracurricularController.getYourCommittee)
router.put('/setVolunteerWork',extracurricularController.setVolunteerWork)
router.put('/deleteYourVolunteerWork',extracurricularController.deleteYourVolunteerWork)
router.put('/getYourVolunteerWork',extracurricularController.getYourVolunteerWork)
router.put('/setParticipation',extracurricularController.setParticipation)
router.put('/deleteParticipation',extracurricularController.deleteParticipation)
router.put('/getParticipation',extracurricularController.getParticipation)
module.exports = router