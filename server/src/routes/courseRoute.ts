import express from 'express'
import { 
    AllCourses, 
    addCourse, 
    fetchCourse,
    acceptCourse
 } from '../controllers/courseController'

const router = express.Router()

router.get('/AllCourses', AllCourses)
router.post('/addCourse', addCourse)
router.post('/fetchCourse', fetchCourse)
router.post('/acceptCourse', acceptCourse)

export default router