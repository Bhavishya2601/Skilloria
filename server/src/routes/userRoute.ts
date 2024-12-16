import express from 'express'
import {signUp, verifiedUser, login} from '../controllers/userController'

const router = express.Router()

router.post('/signup', signUp)
router.post('/verifiedUser', verifiedUser)
router.post('/login', login)

export default router