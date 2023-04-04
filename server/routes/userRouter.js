const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/userControllers')

// Post Methods
router.post('/login',Controller.login)
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)
router.post('/login',Controller.login)
router.post('/forgotPasswordOtp',Controller.ForgotPasswordOtp)
router.post('/forgotPasswordOtpVerify',Controller.ForgotPasswordOtpVerify)
router.post('/resetPassword',Controller.resetPassword)


// Get Method
router.get('/resendOtp',Controller.resendOtp)
router.get('/tokenVerify',Controller.TokenVerify)
router.get('/viewDepartments',Controller.viewDepartments)
router.get('/viewDoctors',Controller.viewDoctors)



module.exports = router ;