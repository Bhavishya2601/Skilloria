import { Request, Response } from "express"
import Course from "../models/courseModel"
import User from "../models/userModel"

export const AllCourses = async (req : Request, res : Response) => {
    try{
        const courses = await Course.find({})
        res.status(200).json(courses)
    } catch (err){
        console.log((err as Error).message)
        res.status(500).json({error: "Something went wrong"})
    }
}

export const addCourse = async (req : Request, res : Response) => {
    const {name, email, author, duration, sections, thumbnail} = req.body
    try{
        const course = new Course({
            name,
            email,
            author,
            duration,
            thumbnail,
            content: sections
        })
        await course.save()

        const user = await User.updateOne({ email }, {
            $push: {
                courseOffered: {
                    courseId : course._id,
                    courseName : name
                }
            }
        })

        res.status(200).json({message: "Added Successfully"})
        return
    } catch (err){
        console.log((err as Error).message)
        res.status(500).json({error: "Error inserting data"})
        return
    }

}

export const fetchCourse = async (req : Request, res : Response) => {
    const {token} = req.body

    try {
        console.log(token)
        const course = await Course.findOne({_id : token})
        console.log(course)
        if (!course){
            res.status(404).json({error: 'Token doesn\'t exist'})
            return
        }
        res.status(200).json(course)
    } catch (err){
        console.log((err as Error).message)
    }
}

export const acceptCourse = async (req : Request, res : Response) => {
    const {id} = req.body
    try {
        const course = await Course.updateOne({ _id: id }, {
            adminApproved: true
        })
        console.log(course)
        res.status(200).json({course})
        return
    } catch (err){
        console.log((err as Error).message)
        res.status(500).json({error: 'Something went wrong'})
        return
    }
}