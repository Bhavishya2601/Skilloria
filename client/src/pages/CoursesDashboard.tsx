// import React from 'react'

import { useEffect, useState } from "react"
import axios from "axios"
import Course from "../components/Course"

interface Course {
  adminApproved: boolean;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(()=>{

    const fetchContacts = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/getAll`)
      setCourses(response.data)
    } catch (err){
      console.log((err as Error).message)
    }
  }
  fetchContacts()
  }, [])

  return (
    <div>
      courses
      {courses.filter(course => course.adminApproved).map((course, index)=>{
        return (
          <Course key={index} course={course} />
        )
      })}
    </div>
  )
}

export default Courses
