import { useState, useEffect } from 'react'
import axios from 'axios'
import Course from '../components/Course'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface Course {
    _id: string
    thumbnail: string,
    name: string,
    author: string,
    duration: string,
    adminApproved: boolean,
}

const Profile = () => {
    const navigate = useNavigate()
    const { userData, setReTrigger, isLoading } = useUser()
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
    const [courseCreated, setCourseCreated] = useState<Course[]>([])

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
                setCourseCreated(response.data.filter((course: any) => course.author === userData?.name))
            } catch (err) {
                console.log((err as Error).message)
            }
        }
        fetchCourses()
    }, [])

const handleLogout = async () => {
    try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, { withCredentials: true })
        navigate('/')
        setReTrigger((prev) => prev+1)
        toast.success('Logged out successfully')
    } catch (err) {
        console.log((err as Error).message)
        toast.error('Failed to logout')
    }
}

    return (
        <>
            <div className='min-h-[calc(100vh-4rem)] flex flex-col gap-4 p-6'>
                <div className='font-manrope text-xl font-semibold bg-red-500 text-white self-start rounded-lg px-4 py-1 cursor-pointer mx-4' onClick={handleLogout}>Logout</div>
                <div className='flex gap-3 text-xl px-4 tracking-wide font-dmSerif'>
                    <div className='underline'>Name:</div>
                    <div className='font-manrope'>{userData?.name}</div>
                </div>
                <div className='flex gap-3 text-xl px-4 tracking-wide font-dmSerif'>
                    <div className='underline'>Email:</div>
                    <div className='font-manrope'>{userData?.email}</div>
                </div>
                <div className="flex flex-col gap-4 font-manrope">
                    <div className="text-2xl px-4 tracking-wide font-dmSerif underline">Enrolled Courses</div>
                    <div className="grid grid-cols-4 gap-4 px-4">
                        {enrolledCourses.length > 0 ? enrolledCourses.map((course, index) => (
                            <Course key={index} course={course} />
                        )) : <div className="text-2xl text-center my-10">No Courses Enrolled</div>}
                    </div>
                </div>
                <div className="flex flex-col gap-4 font-manrope">
                    <div className="text-2xl px-4 tracking-wide font-dmSerif underline">Courses Created</div>
                    <div className="grid grid-cols-4 gap-4 px-4">
                        {courseCreated.length > 0 ? courseCreated.map((course, index) => (
                            <Course key={index} course={course} />
                        )) : <div className="text-2xl text-center my-10">No Courses Created</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
