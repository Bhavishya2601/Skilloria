import { Request, Response } from "express"
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt, { JwtPayload as JwtPayloadBase } from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"
import verificationLinkTemplate from "../mailTemplates/verificationLink"
import mailSender from "../utils/mailSender"
import PendingVerification from "../models/PendingVerification"
import User from "../models/userModel"

const salt_rounds: string = process.env.SALT_ROUNDS || '10'

const generateToken = (user: { id: string, email: string }) => {
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

interface IUser {
    _id: string; // Or ObjectId if you're using that
    email: string;
    password: string;
    name: string;
    provider: string;
}

export const signUp = async (req: Request, res: Response) => {  // signup
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
        let htmlContent = verificationLinkTemplate(link)
        await mailSender(email, 'Skilloria - Confirm Your Email Address', htmlContent)
        res.status(200).json({ message: 'Email send Successfully' })
        return
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
        return
    }
}

export const checkSignUpStatus = async (req: Request, res: Response) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const id = user._id!.toString()
            const cookie = generateToken({ id: id, email: user.email });
            res.cookie('skilloria', cookie, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'none'
            })

            res.status(200).json({ message: 'Successfully Signed Up' })
            return
        }
        res.status(404).json({ error: 'User not found' })
        return
    } catch (err) {
        console.log((err as Error).message)
        res.status(500).json({ error: 'Something went wrong' })
        return
    }
}

export const verifiedUser = async (req: Request, res: Response) => { // for verification through mail
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

        const savedUser = await User.findById<IUser>(newUser._id);
        if (!savedUser) {
            res.status(500).json({ error: "Failed to fetch user after saving" });
            return;
        }

        await pendingVerification.deleteOne({ token })

        res.status(200).json({
            message: "Email verified successfully",
            user: savedUser
        })
        return
    } catch (err) {
        console.log((err as Error).message)
        res.status(500).json({ message: "Something went wrong" })
        return
    }
}

export const login = async (req: Request, res: Response) => { // login
    const { email, password } = req.body as LoginBody

    try {
        const user = await User.findOne({ email }) as {
            _id: string,
            email: string,
            password: string
        } | null
        if (!user) {
            res.status(400).json({ error: "user doesn't exist" })
            return
        }

        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const cookie = generateToken({ id: user._id, email: user.email })
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

export const checkStatus = async (req: Request, res: Response) => { // used in userContext to check if user is logged in or not
    const token = req.cookies.skilloria;

    if (!token) {
        console.log("No token found");
        res.status(400).json({ error: "No token found" });
        return;
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET || "SKILLORIA",
        async (err: any, decoded: any) => {
            if (err) {
                res.status(400).json({ error: "Invalid token" });
                return;
            }

            if (!decoded) {
                res.status(400).json({ error: "Token decoding failed" });
                return;
            }

            const { id } = decoded;

            try {
                const user = await User.findById(id);
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                res.json({ user });
            } catch (error: any) {
                console.log("Error fetching user data:", error.message);
                res.status(500).json({ error: "Something went wrong" });
            }
        }
    );
};

export const logout = async (req: Request, res: Response) => { // logout
    res.clearCookie('skilloria')
    res.status(200).json({ message: 'Logged out successfully' })
}

export const allUsers = async (req: Request, res: Response) => { // get all users
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}

const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL)

export const google = async (req: Request, res: Response) => { // google login
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline", 
        response_type: "code",
        scope: scopes,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL, 
      });
    res.redirect(url)
}

interface GoogleUserInfo {
    id: string;
    email: string;
    name: string;
}

export const googleMain = async (req: Request, res: Response) => { // google login
    try {
        const code = req.query.code as string
        if (!code) {
            res.redirect(`${process.env.FRONTEND_URL}/login`)	
            return
        }
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)

        const userInfoResponse = await oauth2Client.request({
            url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
        })
        const userInfo = userInfoResponse.data as GoogleUserInfo

        console.log(userInfo)
        const {id, email, name} = userInfo

        let user = await User.findOne({ email })
        if (!user){
            user = new User({
                provider: "google",
                name,
                email,
                password: id
            })
            await user.save()
        }

        const cookie = generateToken({ id: user._id!.toString(), email: user.email })
            res.cookie('skilloria', cookie, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'none'
            })
        
        res.redirect(`${process.env.FRONTEND_URL}/courses`)
        return
    } catch (err) {
        console.log(err)
        res.redirect(`${process.env.FRONTEND_URL}/login`)
        return
    }
}