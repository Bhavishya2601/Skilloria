import mongoose, {Document, Schema, Model} from "mongoose";

interface IUser extends Document {
    provider?: string;
    name: string;
    email: string;
    password: string;
    isAdmin?: Boolean;
    courseEnrolled?: string[];
    courseOffered?: string[];
    createdAt?: Date;
}

const courseDetails = new Schema({
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    provider: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    courseEnrolled: {
        type: [courseDetails]
    },
    courseOffered: {
        type: [courseDetails]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User : Model<IUser> = mongoose.model<IUser>('User', userSchema)
export default User