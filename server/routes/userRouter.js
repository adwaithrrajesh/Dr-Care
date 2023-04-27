const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/userControllers')
const tokenMiddleware = require('../middleware/tokenMiddleware')

// ----------------------------------------------------------------POST-------------------------------------------------------------------//

router.post('/login',Controller.login)
router.post('/otp',Controller.otp)
router.post('/otpVerify',Controller.otpVerify)
router.post('/login',Controller.login)
router.post('/forgotPasswordOtp',Controller.ForgotPasswordOtp)
router.post('/forgotPasswordOtpVerify',Controller.ForgotPasswordOtpVerify)
router.post('/resetPassword',Controller.resetPassword)
router.post('/departmentSearchResult',Controller.departmentSearchResult)
router.post('/fetchDoctorWithId',Controller.fetchDoctorWithId)
router.post('/getBookingDetails',Controller.getBookingDetails)
router.post('/initializePayment',Controller.initializePayment)
router.post('/verifyPayment',tokenMiddleware,Controller.verifyPayment)
router.post('/doWalletPayment',tokenMiddleware,Controller.doWalletPayment)

// ----------------------------------------------------------------GET-------------------------------------------------------------------//

router.get('/resendOtp',Controller.resendOtp)
router.get('/tokenVerify',Controller.TokenVerify)
router.get('/viewDepartments',Controller.viewDepartments)
router.get('/viewDoctors',tokenMiddleware,Controller.viewDoctors)
router.get('/fetchDoctors',Controller.fetchDoctor)
router.get('/getUserProfilePhoto',tokenMiddleware,Controller.getUserProfilePhoto)
router.get('/getUserDetails',tokenMiddleware,Controller.getUserDetails)
router.get('/getBookedAppointments',tokenMiddleware,Controller.getBookedAppointments)
router.get('/walletBalance',Controller.getWalletBalance)
router.get('/getCancelledAppointments',tokenMiddleware,Controller.getCancelledAppointments)


// ----------------------------------------------------------------PATCH-------------------------------------------------------------------//

router.patch('/updateProfilePhoto',Controller.updateProfilePhoto)
router.patch('/updateProfileDetails',tokenMiddleware,Controller.updateProfileDetails)
router.patch('/cancelAppointment',Controller.cancelAppointment)



module.exports = router ;