// import React from 'react'

import { useEffect, useState } from "react"
import axios from "axios"
import Course from "../components/Course"

const Courses = () => {
  const [courses, setCourses] = useState([])

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
      {courses.map((course)=>{
        return (
          <div>
          <Course course={course} />
          </div>
        )
      })}
    </div>
  )
}

export default Courses
