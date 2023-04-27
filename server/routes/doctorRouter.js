const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/doctorControllers')


// ----------------------------------------------------------------GET-------------------------------------------------------------------//

router.get('/resendOtp',Controller.resendOtp)
router.get('/verifyToken',Controller.tokenVerify)
router.get('/verificationStatus',Controller.verificationStatus)
router.get('/doctorDetails',Controller.getDoctorDetails)
router.get('/getScheduledTime',Controller.getScheduledTime)
router.get('/getBookedAppointments',Controller.getBookedAppointments)

// ----------------------------------------------------------------POST-------------------------------------------------------------------//
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)
router.post('/login',Controller.Login)
router.post('/forgotPasswordOtp',Controller.ForgotPasswordOtp)
router.post('/ForgotPasswordOtpVerify',Controller.ForgotPasswordOtpVerify)
router.post('/addScheduleTime',Controller.addScheduleTime)
router.post('/deleteScheduledTime',Controller.deleteScheduleTime)
router.post('/filterAppointmentsByDate',Controller.filterAppointmentsByDate)

// ----------------------------------------------------------------PATCH-------------------------------------------------------------------//
router.patch('/resetPassword',Controller.resetPassword)
router.patch('/addDoctorDetails',Controller.addDoctorDetails)
router.patch('/updateProfile',Controller.updateProfile)
router.patch('/updateProfileDetails',Controller.updateProfileDetails)






module.exports = router ;