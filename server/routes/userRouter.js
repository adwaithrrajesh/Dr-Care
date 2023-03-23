const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/userControllers')

// Post Methods
router.post('/login',Controller.login)
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)





module.exports = router ;