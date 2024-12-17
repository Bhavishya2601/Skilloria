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