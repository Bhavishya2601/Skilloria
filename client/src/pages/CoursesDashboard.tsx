import { useEffect, useState } from "react"
import axios from "axios"
import Course from "../components/Course"
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { IoIosAddCircle } from "react-icons/io";
import Footer from "../components/Footer"

interface Course {
  _id: string
  thumbnail: string,
  name: string,
  author: string,
  duration: string,
  adminApproved: boolean,
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const { userData, isLoading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData && !isLoading) {
      navigate('/');
    } else if (userData && Object.entries(userData).length === 0 && !isLoading) {
      navigate('/');
    }
  }, [userData, isLoading, navigate]);

  useEffect(() => {

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/AllCourses`)
        setCourses(response.data)
      } catch (err) {
        console.log((err as Error).message)
      }
    }
    fetchCourses()
  }, [])

  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col gap-4 p-6">
        <div className="w-full bg-red-500 h-[50vh] rounded-lg p-5">
          div
        </div>
        <div className="flex flex-col gap-2 font-manrope">
          <div className="text-4xl px-4 font-semibold font-mono">Courses</div>

          <div className="flex-grow overflow-auto flex justify-between gap-4 flex-wrap px-4">
            {courses.filter(course => course.adminApproved).map((course, index) => (
              <Course key={index} course={course} />
            ))}
            <div className="w-[22vw] min-h-[250px] h-[335px] flex flex-col justify-center items-center cursor-pointer border-2 border-dotted border-black hover:bg-[#F8F8F8] rounded-lg duration-500 transition-all" onClick={() => navigate('/courseform')}>
              <IoIosAddCircle className="text-4xl" />
              <div className="text-gray-600">Add Course</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Courses
