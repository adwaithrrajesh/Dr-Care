const { Router } = require('express')
const router = Router()
const controller = require('../controllers/messagesController')
const userTokenMiddleware = require('../middleware/userTokenMiddleware')
const doctorTokenMiddleware = require('../middleware/doctorTokenMiddleware')


router.post('/addMessage',userTokenMiddleware,controller.addMessage)
router.post('/getMessages',userTokenMiddleware,controller.getAllMessages)
router.post('/getMessagesForDoctor',doctorTokenMiddleware,controller.getAllMessagesForDoctor)
router.post('/addMessageFromDoctor',doctorTokenMiddleware,controller.addMessageFromDoctor)


module.exports = router