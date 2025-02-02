import mongoose, {Document, Schema, Model} from "mongoose";

interface ICourse extends Document {
    name: String;
    duration: String;
    author: String;
    email: String;
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

  const enrolledStudentSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
  })

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
    },
    duration: {
        type: String,
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
    enrolledStudents: {
        type: [enrolledStudentSchema],
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