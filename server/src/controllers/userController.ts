import {Request, Response} from "express"
import mailSender from "../utils/mailSender"

export const signUp = (req: Request, res: Response) => {
    const {name, email, password} =  req.body
    console.log(name, email, password)
}