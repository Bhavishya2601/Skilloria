// import React from 'react'

import { useEffect, useState } from "react"
import axios from "axios"
import Course from "../components/Course"

interface Course {
  adminApproved: boolean;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {

    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/getAll`)
        setCourses(response.data)
      } catch (err) {
        console.log((err as Error).message)
      }
    }
    fetchContacts()
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-yellow-500 flex flex-col">
      <div className="h-2/3 w-full bg-red-500 p-2">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum laudantium magni atque aliquid iure. Quae aliquam dicta laborum debitis mollitia corporis expedita reprehenderit consequuntur beatae soluta nobis inventore sit velit optio aliquid laboriosam totam sint quidem suscipit sed accusantium, impedit recusandae perspiciatis dignissimos? Perspiciatis atque at fugit iure, sed dignissimos necessitatibus aspernatur? Est recusandae, animi nihil sed rem cum totam laudantium? Rem saepe quaerat adipisci accusamus vel assumenda eius fugiat atque quasi vitae dolorum voluptate mollitia soluta iste id tenetur neque, sed repudiandae quas. Non, placeat molestiae. Eaque repellat, enim labore ullam inventore aperiam, provident iste deserunt unde assumenda corrupti?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium molestiae ad officiis, a minima voluptas dicta repudiandae libero. Dolor corrupti sint aut temporibus cumque totam, perspiciatis fugiat voluptatem! Nemo quisquam quia commodi possimus minima quibusdam neque excepturi, assumenda, delectus ullam cum voluptatem temporibus beatae quae quam officiis aliquid magni deleniti! Illum sapiente praesentium architecto? Quaerat voluptas modi neque in! Nulla, ducimus quibusdam sequi facilis laboriosam excepturi non suscipit voluptatibus perferendis corrupti omnis saepe nihil asperiores aliquam obcaecati pariatur distinctio ipsam quisquam. Vel sint voluptates sunt, non provident, eaque aspernatur in quae tempora repudiandae aperiam et laudantium officia amet impedit corporis.
      </div>
      <div className="flex-grow overflow-auto">
        {courses.filter(course => course.adminApproved).map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </div>
    </div>
  )
}

export default Courses
