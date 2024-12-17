import express from 'express'
import {signUp, verifiedUser, login, checkStatus} from '../controllers/userController'

const router = express.Router()

router.post('/signup', signUp)
router.post('/verifiedUser', verifiedUser)
router.post('/login', login)
router.post('/checkStatus', checkStatus)

export default router