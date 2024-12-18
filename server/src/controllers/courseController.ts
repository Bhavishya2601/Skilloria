import { Request, Response } from "express"
import Course from "../models/courseModel"

export const getAll = async (req : Request, res : Response) => {
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