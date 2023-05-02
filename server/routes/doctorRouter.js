const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/doctorControllers')
const tokenMiddleware = require('../middleware/doctorTokenMiddleware')


// ----------------------------------------------------------------GET-------------------------------------------------------------------//

router.get('/resendOtp',Controller.resendOtp)
router.get('/verifyToken',Controller.tokenVerify)
router.get('/verificationStatus',Controller.verificationStatus)
router.get('/doctorDetails',Controller.getDoctorDetails)
router.get('/getScheduledTime',Controller.getScheduledTime)
router.get('/getBookedAppointments',Controller.getBookedAppointments)
router.get('/getDashboardDetails',tokenMiddleware,Controller.getDashboardDetails)
router.get('/getAppointmentGraph',tokenMiddleware,Controller.getAppointementGraph)

// ----------------------------------------------------------------POST-------------------------------------------------------------------//
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)
router.post('/login',Controller.Login)
router.post('/forgotPasswordOtp',Controller.ForgotPasswordOtp)
router.post('/ForgotPasswordOtpVerify',Controller.ForgotPasswordOtpVerify)
router.post('/addScheduleTime',Controller.addScheduleTime)
router.post('/deleteScheduledTime',Controller.deleteScheduleTime)
router.post('/filterAppointmentsByDate',Controller.filterAppointmentsByDate)
router.post('/getAppointmentDetailsWithId',Controller.getAppointmentDetailsWithId)
router.post('/editAppointmentDetails',Controller.editAppointmentDetails)

// ----------------------------------------------------------------PATCH-------------------------------------------------------------------//
router.patch('/resetPassword',Controller.resetPassword)
router.patch('/addDoctorDetails',Controller.addDoctorDetails)
router.patch('/updateProfile',Controller.updateProfile)
router.patch('/updateProfileDetails',Controller.updateProfileDetails)
router.patch('/cancelAppointment',Controller.cancelAppointment)
router.patch('/patientVisited',Controller.patientVisitedClinic)






module.exports = router ;