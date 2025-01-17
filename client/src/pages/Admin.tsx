import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface CourseDetails {
  _id: string;
  courseId: string;
  courseName: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  courseEnrolled: CourseDetails[];
  courseOffered: CourseDetails[];
}

interface Course {
  _id: string;
  name: string;
  author: string;
  email: string;
  thumbnail?: string;
  adminApproved: boolean;
  enrolledStudents: User[];
  like: number;
  dislike: number;
}

const Admin: React.FC = () => {
  const { userData, isLoading } = useUser()
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState([])
  const [allCourses, setAllCourses] = useState<Course[]>([])

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/allUsers`, {
        withCredentials: true
      })
      setAllUsers(response.data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchAllCourses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/AllCourses`, {
        withCredentials: true
      })
      setAllCourses(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAcceptCourse = async (id: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/course/acceptCourse`, { id })
      fetchAllCourses()
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  // check if user is admin or not
  useEffect(() => {
    if (!isLoading && !userData?.isAdmin) {
      navigate('/')
    } else {
      fetchAllUsers()
      fetchAllCourses()
    }
  }, [])

  return (
    <div className='p-8 flex flex-col gap-10'>
      <div>
        <div className='text-xl font-semibold'>Approval Pending</div>
        <table>
          <thead>
            <tr>
              <th className='border-2 py-2 px-3'>Course Name</th>
              <th className='border-2 py-2 px-3'>Author Name</th>
              <th className='border-2 py-2 px-3'>Author Email</th>
              <th className='border-2 py-2 px-3'>Thumbnail</th>
              <th className='border-2 py-2 px-3'>Content</th>
              <th className='border-2 py-2 px-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.filter(course => !course?.adminApproved).map((course: any) => (
              <tr key={course._id}>
                <td className='border-2 py-2 px-3'>{course.name}</td>
                <td className='border-2 py-2 px-3'>{course.author}</td>
                <td className='border-2 py-2 px-3'>{course.email}</td>
                <td className='border-2 py-2 px-3'><img src={course.thumbnail} alt="Thumbnail" className='h-[100px] w-[250px]' /></td>
                <td className='border-2 py-2 px-3'><Link to={`/courses/${course._id}`}>View Course</Link></td>
                <td className='border-2 py-2 px-3'>
                  <div className='bg-green-600 text-white py-2 px-4 rounded-lg cursor-pointer' onClick={() => handleAcceptCourse(course._id)}>Accept</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className='text-xl font-semibold'>All Users</div>
        <table>
          <thead>
            <tr>
              <th className='border-2 py-2 px-3'>Name</th>
              <th className='border-2 py-2 px-3'>Email</th>
              <th className='border-2 py-2 px-3'>isAdmin</th>
              <th className='border-2 py-2 px-3'>CourseEnrolled</th>
              <th className='border-2 py-2 px-3'>CourseOffered</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user: User) => (
              <tr key={user._id}>
                <td className='border-2 py-2 px-3'>{user.name}</td>
                <td className='border-2 py-2 px-3'>{user.email}</td>
                <td className='border-2 py-2 px-3 text-center'>{user.isAdmin ? 'True' : 'False'}</td>
                <td className='border-2 py-2 px-3 text-center'>
                  <ol>
                    {user.courseEnrolled.map((course: CourseDetails, index: number) => (
                      <li key={index}>{index + 1}. <span className='font-semibold'>{course.courseName}</span></li>
                    ))}
                  </ol>
                </td>
                <td className='border-2 py-2 px-3 text-center'>
                  <ol>
                    {user.courseOffered.map((course: CourseDetails, index: number) => (
                      <li key={index}>{index + 1}. <span className='font-semibold'>{course.courseName}</span></li>
                    ))}
                  </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className='text-xl font-semibold'>All Courses</div>
        <table>
          <thead>
            <tr>
              <th className='border-2 py-2 px-3'>Course Name</th>
              <th className='border-2 py-2 px-3'>Author Name</th>
              <th className='border-2 py-2 px-3'>Author Email</th>
              <th className='border-2 py-2 px-3'>Admin approved</th>
              <th className='border-2 py-2 px-3'>enrolledStudents</th>
              <th className='border-2 py-2 px-3'>Like</th>
              <th className='border-2 py-2 px-3'>Dislike</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((course: any) => (
              <tr key={course._id}>
                <td className='border-2 py-2 px-3'>{course.name}</td>
                <td className='border-2 py-2 px-3'>{course.author}</td>
                <td className='border-2 py-2 px-3'>{course.email}</td>
                <td className='border-2 py-2 px-3 text-center'>{course.adminApproved ? "Yes" : "No"}</td>
                <td className='border-2 py-2 px-3 text-center'>
                  <ol>
                    {course.enrolledStudents.map((user: User, index: number) => (
                      <li key={index}>{index + 1}. <span className='font-semibold'>{user.name} - {user.email}</span></li>
                    ))}
                  </ol>
                </td>
                <td className='border-2 py-2 px-3'>{course.like}</td>
                <td className='border-2 py-2 px-3'>{course.dislike}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin
