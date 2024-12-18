import express from 'express'
import {
    signUp, 
    verifiedUser, 
    login, 
    checkStatus, 
    token
} from '../controllers/userController'

const router = express.Router()

router.post('/signup', signUp)
router.post('/verifiedUser', verifiedUser)
router.post('/login', login)
router.post('/checkStatus', checkStatus)
router.post('/token', token)

export default router