import { useEffect, useState } from "react"
import axios from "axios"
import Course from "../components/Course"
import { useUser } from "../context/UserContext"
import { useNavigate, Link } from "react-router-dom"
import { IoIosAddCircle } from "react-icons/io";
import Footer from "../components/Footer"
import d1 from '../assets/d1.jpg'

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
      <div className="min-h-[calc(100vh-4rem)] flex flex-col gap-8 p-6 bg-[#F9FAFB]">
        <div className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white h-[50vh] rounded-lg p-8 flex justify-center">
          <div className="flex flex-col gap-5 w-2/3 px-4 py-10 font-manrope">
            <div className="text-4xl font-bold">Unlock Your Potential, Learn without Limits</div>
            <div>Explore a wide variety of expert-led video courses, with fresh content <br /> added regularly to help you grow.</div>
            <Link to={'/courseform'} className="py-2 px-5 bg-gradient-to-r from-[#4169E1] to-[#8A2BE2] rounded-lg self-start">Add Course</Link>
          </div>
          <div className="w-1/3 flex justify-end">
            <img src={d1} alt="SKilloria" className="w-full h-full rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap- font-manrope">
          <div className="text-4xl px-4 tracking-wide font-dmSerif">Courses - Explore Your Potential</div>

          <div className="grid grid-cols-4 gap-4 my-4 px-4">
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
