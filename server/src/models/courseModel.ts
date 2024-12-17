import mongoose, {Document, Schema, Model} from "mongoose";

interface ICourse extends Document {
    id: String;
    name: String;
    duration: Number;
    author: String;
    email: String;
    like?: Number;
    dislike?: Number;
    comment?: string[];
    enrolledStudents?: string[];
    content?: string[];
}

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        requried: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    comment: {
        type: [String],
    },
    enrolledStudents: {
        type: [String],
    },
    content: {
        type: [String]
    }
})

const Course : Model<ICourse> = mongoose.model<ICourse>("Courses", courseSchema)
export default Course