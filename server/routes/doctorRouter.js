const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/doctorControllers')


// Post Methods
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)
router.post('/login',Controller.Login)
router.post('/forgotPasswordOtp',Controller.ForgotPasswordOtp)
router.post('/ForgotPasswordOtpVerify',Controller.ForgotPasswordOtpVerify)
router.post('/resetPassword',Controller.resetPassword)
router.post('/addDoctorDetails',Controller.addDoctorDetails)


// Get method 
router.get('/resendOtp',Controller.resendOtp)
router.get('/verificationStatus',Controller.doctorVerificationStatus)





module.exports = router ;