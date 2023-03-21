const { Router } = require('express')
const router = Router()
const Controller = require('../controllers/userControllers')

// Post Methods
router.post('/login',Controller.login)
router.post('/register',Controller.Register)





module.exports = router ;