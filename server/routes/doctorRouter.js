const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/doctorControllers')


// Post Methods
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)





module.exports = router ;