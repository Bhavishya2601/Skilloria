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

const Course: React.FC<CourseProps> = ({ course }) => {
  const navigate = useNavigate()
  const { userData } = useUser()
  const [popupOpen, setPopupOpen] = useState(false)
  const [courseId, setCourseId] = useState('')
  const [enrolling, setEnrolling] = useState(false)

  const handleOpenCourse = (id: string) => () => {
    setPopupOpen(true)
    setCourseId(id)
  }

  const handleOpenEnrolledCourse = () => {
    navigate(`/courses/${course._id}`)
  }

  const ConfirmEnroll = async () => {
    setEnrolling(true)
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/enroll/enrollCourse`, {
        name: userData!.name,
        email: userData!.email,
        courseId: course._id,
        courseName: course.name
      })
      toast.success('Enrolled Successfully')
      navigate(`/courses/${courseId}`)
    } catch (err) {
      console.log((err as Error).message)
    } finally {
      setPopupOpen(false)
      setEnrolling(false)
    }
  }

  const isEnrolled = userData?.courseEnrolled?.some(userCourse => userCourse.courseId === course._id)

  return (
    <div className=" min-h-[250px] xs:h-[335px] flex flex-col gap-2 border-2 bg-white shadow-md rounded-lg">
      <img src={course.thumbnail} alt="thumbnail" className="w-full h-[120px] xs:h-[200px] rounded-t-lg" />
      <div className="flex flex-col px-2 gap-1">
        <div className="text-lg leading-5 font-semibold">{course.name}</div>
        <div className="flex flex-col">
        <div className="text-sm text-gray-600">By {course.author}</div>
        <div className="text-sm text-gray-600">Duration : {course.duration}</div>
        </div>
        {
          isEnrolled ? 
          <div className="bg-gradient-to-b hover:bg-gradient-to-tr from-[#4169E1] to-[#8A2BE2] px-4 py-2 rounded-xl text-white font-bold w-full xs:w-2/3 xl:w-1/2 text-center cursor-pointer hover:scale-105 transition-all duration-700" onClick={handleOpenEnrolledCourse}>Open</div>
          : 
        <div className="bg-gradient-to-r hover:bg-gradient-to-tr from-[#4169E1] to-[#8A2BE2] px-4 py-2 rounded-xl text-white font-bold w-full xs:w-2/3 xl:w-1/2 text-center cursor-pointer hover:scale-105 transition-all duration-700" onClick={handleOpenCourse(course._id)}>Enroll Now</div>
        }

        {enrolling && <Loading />}

        {/* popup */}
        <div>
          {popupOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg xs:h-40 mx-10 xs:w-[60vw] lg:w-[30vw] flex flex-col gap-4">
                <div className="text-2xl font-semibold">Are you sure you want to enroll in this course?</div>
                <div className="flex gap-4">
                  <div className="bg-purple-600 px-4 py-2 text-white font-semibold w-1/2 text-center uppercase hover:bg-transparent hover:text-purple-500 border-2 border-purple-500 text-xl transition-all duration-500 cursor-pointer" onClick={ConfirmEnroll}>Yes</div>
                  <div className="bg-transparent px-4 py-2 border-2 text-purple-500 border-purple-600 text-xl hover:bg-purple-600 hover:text-white font-semibold w-1/2 text-center transition-all duration-500 cursor-pointer" onClick={() => {
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
