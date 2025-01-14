import { Request, Response } from "express"
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import verificationLinkTemplate from "../mailTemplates/verificationLink"
import mailSender from "../utils/mailSender"
import PendingVerification from "../models/PendingVerification"
import User from "../models/userModel"

const salt_rounds: string = process.env.SALT_ROUNDS || '10'

const generateToken = (user : {id: string, email: string}) => {
    return jwt.sign({
        id: user.id, email: user.email
    }, 
    process.env.JWT_SECRET || 'SKILLORIA', 
    {
        expiresIn: '1d'
    })
}

interface LoginBody {
    email: string;
    password: string
}

interface SignupRequestBody extends LoginBody {
    name: string;
}

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as SignupRequestBody

    const existingUser = await PendingVerification.findOne({ email })
    if (existingUser) {
        await PendingVerification.deleteOne({ email })
    }

    const user = await User.findOne({ email })
    if (user) {
        console.log('User already exists')
        res.status(400).json({ message: "User already Exists" })
        return
    }

    const token = crypto.randomBytes(32).toString('hex')
    const hashedPassword = await bcrypt.hash(password, parseInt(salt_rounds))
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    const pendingVerification = new PendingVerification({
        name,
        email,
        password: hashedPassword,
        token,
        expiresAt
    })
    await pendingVerification.save()

    try {
        let link = `${process.env.FRONTEND_URL}/verify/${token}`
        let htmlContent = verificationLinkTemplate(name, link)
        await mailSender(email, 'Verification link', htmlContent)
        res.status(200).json({ message: 'Email send Successfully' })
        return
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
        return
    }
}

export const verifiedUser = async (req: Request, res: Response) => {
    const { token } = req.body
    try {

        if (!token) {
            res.status(400).json({ error: "No token found" })
            return
        }

        const pendingVerification = await PendingVerification.findOne({ token })
        if (!pendingVerification) {
            res.status(400).json({ error: "Invalid or expired Token" })
            return
        }
        const { name, email, password, expiresAt } = pendingVerification

        if (expiresAt < new Date()) {
            await pendingVerification.deleteOne({ token })
            res.status(404).json({ error: "Token expired" })
            return
        }

        const newUser = new User({
            provider: "local",
            name,
            email,
            password,
        })
        await newUser.save()

        await pendingVerification.deleteOne({ token })

        res.status(200).json({ message: "Email verified successfully" })
        return
    } catch (err) {
        console.log((err as Error).message)
        res.status(500).json({ message: "Something went wrong" })
        return
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginBody

    try {
        const user = await User.findOne({ email }) as {
            _id : string,
            email : string,
            password : string
        } | null
        if (!user) {
            res.status(400).json({ error: "user doesn't exist" })
            return
        }

        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const cookie = generateToken({id: user._id, email: user.email})
            res.cookie('skilloria', cookie, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'none'
            })
            res.status(200).json({ message: "Email Verified Successfully" })
            return
        }
        res.status(400).json({ message: 'Wrong Password' })
        return

    } catch (err) {
        console.log((err as Error).message)
    }
}

export const checkStatus = async (req: Request, res: Response) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(202).json({ error: 'User not found' })
            return
        }
        res.status(200).json({ message: "Authenticated successfully" })
        return
    } catch (err) {
        console.log((err as Error).message)
        res.status(500).json({ error: "something went wrong" })
        return
    }
}