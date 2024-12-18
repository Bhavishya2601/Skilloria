import express from 'express'
import { getAll, addCourse, fetchCourse } from '../controllers/courseController'

const router = express.Router()

router.get('/getAll', getAll)
router.post('/addCourse', addCourse)
router.post('/fetchCourse', fetchCourse)

export default router