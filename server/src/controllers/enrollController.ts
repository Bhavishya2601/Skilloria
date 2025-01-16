import { Request, Response } from "express"
import Course from "../models/courseModel"
import User from "../models/userModel"

export const enrollCourse = async (req: Request, res: Response) => {
    const { name, email, courseId, courseName } = req.body

    try {
        // adding user to the course data
        const course = await Course.updateOne({ _id: courseId }, {
            $push: {
                enrolledStudents: {
                    name,
                    email
                }
            }
        })

        // adding course to the user data
        const user = await User.updateOne({ email }, {
            $push: {
                courseEnrolled: {
                    courseId,
                    courseName
                }
            }
        })
        
        res.status(200).json({
            course,
            user
        })
        return
    } catch (err) {
        console.log((err as Error).message)
        res.status(404).json('Something went wrong while enrolling in course')
        return
    }
}