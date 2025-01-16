import express from 'express'
import {
    enrollCourse
} from '../controllers/enrollController'

const router = express.Router()

router.post('/enrollCourse', enrollCourse)

export default router