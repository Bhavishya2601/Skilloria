import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useUser } from "../context/UserContext"
import Loading from "./Loading"
import toast from "react-hot-toast"

interface CourseProps {
  course: {
    _id: string
    thumbnail: string,
    name: string,
    author: string,
    duration: string,
    adminApproved: boolean,
  }
}

// interface enrolledCourse{
//   courseId: string;
//   courseName: string;
// }

// interface User{
//   name: string;
//   email: string;
//   enrolledCourses: [enrolledCourse];
// }

const Course: React.FC<CourseProps> = ({ course }) => {
  const navigate = useNavigate()
  const { userData } = useUser()
  const [popupOpen, setPopupOpen] = useState(false)
  const [courseId, setCourseId] = useState('')
  const [enrolling, setEnrolling] = useState(false)

  const handleOpenCourse = (id : string) => () => {
    setPopupOpen(true)
    setCourseId(id)
  }
  
  const ConfirmEnroll = async () => {
    setEnrolling(true)
    try{
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/enroll/enrollCourse`, {
        name: userData!.name, 
        email : userData!.email,
        courseId: course._id,
        courseName: course.name
      })
      toast.success('Enrolled Successfully')
      navigate(`/courses/${courseId}`)
    } catch (err){
      console.log((err as Error).message)
    } finally {
      setPopupOpen(false)
      setEnrolling(false)
    }
  }
  
  return (
    <div className="w-[22vw] min-h-[250px] h-[335px] flex flex-col gap-2 cursor-pointer p-1 border-2 hover:bg-[#F8F8F8] rounded-lg duration-500 transition-all">
      <img src={course.thumbnail} alt="thumbnail" className="w-full h-[200px] rounded-lg" />
      <div className="flex flex-col px-1 gap-1">
        <div className="text-lg leading-5 font-semibold">{course.name}</div>
        <div className="text-sm text-gray-600">By {course.author}</div>
        <div className="text-sm text-gray-600">Duration : {course.duration}</div>
        {/* {userData.courseEnrolled.includes(course._id) && <div className="text-sm text-green-600">Enrolled</div>} */}
        <div className="bg-purple-600 px-4 py-2 rounded-xl text-white font-semibold w-1/2 text-center hover:bg-purple-500" onClick={handleOpenCourse(course._id)}>Enroll Now</div>

        {enrolling && <Loading />}
        
        {/* popup */}
        <div>
          {popupOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg h-40 w-[30vw] flex flex-col gap-4">
                <div className="text-2xl font-semibold">Are you sure you want to enroll in this course?</div>
                <div className="flex gap-4">
                  <div className="bg-purple-600 px-4 py-2 text-white font-semibold w-1/2 text-center uppercase hover:bg-transparent hover:text-purple-500 border-2 border-purple-500 text-xl transition-all duration-500" onClick={ConfirmEnroll}>Yes</div>
                  <div className="bg-transparent px-4 py-2 border-2 text-purple-500 border-purple-600 text-xl hover:bg-purple-600 hover:text-white font-semibold w-1/2 text-center transition-all duration-500" onClick={()=>{
                    setPopupOpen(false)
                    setCourseId('')
                  }}>No</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Course
