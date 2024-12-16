import express, {Request, Response} from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import helmet from "helmet"
import mongoose from "mongoose"
import session from 'express-session'
import MongoStore from "connect-mongo"
dotenv.config()

import userRoutes from './routes/userRoute'
import courseRoutes from './routes/courseRoute'

const port = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const connectToDB = async () : Promise<void> => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }
    try{
        await mongoose.connect(mongoUri)
        console.log('connected to DB')
    } catch (err : unknown){
        console.log('Error connecting to database', (err as Error).message)
    }
}

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14*24*60*60
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24*60*60*1000,
        sameSite: 'strict'
    }
}))

app.get('/', (req: Request, res: Response)=>{
    res.send('Backend Started')
})

app.use('/user', userRoutes)
app.use('/course', courseRoutes)

const startServer = async () : Promise<void> => {
    await connectToDB()
    app.listen(port, ()=>{
        console.log(`Server listening at port ${port}`)
    })
}

startServer()

export default app