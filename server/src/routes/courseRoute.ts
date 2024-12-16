import express from 'express'
import { getAll } from '../controllers/courseController'

const router = express.Router()

router.get('/getAll', getAll)

export default router