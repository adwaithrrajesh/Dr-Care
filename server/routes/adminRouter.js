const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/adminControllers')


// ----------------------------------------------------------------POST-------------------------------------------------------------------//

router.post('/login',Controller.login)
router.post('/addDepartment',Controller.addDepartment)
router.post('/blockUser',Controller.blockUser)
router.post('/unBlockUser',Controller.unBlockUser)
router.post('/blockDoctor',Controller.blockDoctor)
router.post('/unBlockDoctor',Controller.unBlockDoctor)
router.post('/hideDepartment',Controller.hideDepartment)
router.post('/showDepartment',Controller.showDepartment)
router.post('/verifyDoctor',Controller.verifyDoctor)
router.post('/unVerifyDoctor',Controller.unVerifyDoctor)

// ----------------------------------------------------------------Get-------------------------------------------------------------------//

router.get('/getUsers',Controller.getUsers)
router.get('/getDoctors',Controller.getDoctors)
router.get('/viewDepartments',Controller.viewDepartments)
router.get('/verificationRequests',Controller.getVerificationRequests)
router.get('/tokenVerify',Controller.tokenVerify)
router.get('/getDashboardDetailsForAdmin',Controller.getDashboardDetails)





module.exports = router ;