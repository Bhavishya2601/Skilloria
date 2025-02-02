import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import d1 from '../assets/d1.jpg'
import Course from '../components/Course'
import { useUser } from '../context/UserContext'
import Footer from '../components/Footer'

interface Course {
    _id: string
    thumbnail: string,
    name: string,
    author: string,
    duration: string,
    adminApproved: boolean,
}

const Learning = () => {
    const navigate = useNavigate()
    const { userData, isLoading } = useUser()
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])

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
                setEnrolledCourses(response.data.filter((course: any) => userData?.courseEnrolled?.some(enrolledCourse => enrolledCourse.courseId === course._id)))
            } catch (err) {
                console.log((err as Error).message)
            }
        }
        fetchCourses()
    }, [])

    return (
        <>
            <div className='min-h-[calc(100vh-4rem)] flex flex-col gap-8 p-4 xs:p-6 bg-[#F9FAFB]'>
                <div className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white rounded-lg py-8 sm:p-8 flex lg:justify-center">
                    <div className="flex flex-col gap-5 w-full lg:w-2/3 px-4 py-5 lg:py-10 font-manrope">
                        <div className="text-4xl font-bold">Unlock Your Potential, Learn without Limits</div>
                        <div>Explore a wide variety of expert-led video courses, with fresh content <br /> added regularly to help you grow.</div>
                        <Link to={'/courses'} className="py-2 px-5 bg-gradient-to-r from-[#4169E1] to-[#8A2BE2] rounded-lg self-start">Explore Course</Link>
                    </div>
                    <div className="hidden w-1/3 lg:flex justify-end">
                        <img src={d1} alt="SKilloria" className="w-full h-full rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 font-manrope">
                    <div className="text-3xl xs:text-4xl px-4 tracking-wide font-dmSerif">Courses - Explore Your Potential</div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 xs:px-4">
                        {enrolledCourses.length > 0 ? enrolledCourses.map((course, index) => (
                            <Course key={index} course={course} />
                        )) : <div className="text-2xl text-center my-10">No Courses Enrolled</div>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Learning
