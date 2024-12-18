import mongoose, {Document, Schema, Model} from "mongoose";

interface ICourse extends Document {
    // id: String;
    name: String;
    duration: Number;
    author: String;
    email: String;
    like?: Number;
    dislike?: Number;
    comment?: string[];
    enrolledStudents?: string[];
    content?: Section[];
    thumbnail: String;
    adminApproved: Boolean
}

type Section = {
    name: string;
    modules: {
      name: string;
      file: string;
    }[];
  };

  const moduleSchema = new Schema({
    name: {type: String, required: true},
    file: {type: String, required: true}
  })

  const sectionSchema = new Schema({
    name: {type: String, required: true},
    modules: {type: [moduleSchema], required: true}
  })

const courseSchema = new mongoose.Schema({
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
        type: [sectionSchema]
    },
    thumbnail: {
        type: String,
        required: true
    },
    adminApproved: {
        type: Boolean,
        default: false
    }
})

const Course : Model<ICourse> = mongoose.model<ICourse>("Courses", courseSchema)
export default Course