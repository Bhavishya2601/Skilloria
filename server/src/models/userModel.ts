import mongoose, {Document, Schema, Model} from "mongoose";

interface IUser extends Document {
    provider?: string;
    name: string;
    email: string;
    password: string;
    courseEnrolled?: string[];
    courseOffered?: string[];
    createdAt?: Date;
}

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
    courseEnrolled: {
        type: [String]
    },
    courseOffered: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User : Model<IUser> = mongoose.model<IUser>('User', userSchema)
export default User