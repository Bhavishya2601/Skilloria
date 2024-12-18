// import React from 'react'

interface CourseProps {
    course: {
      adminApproved: boolean,
    }
}

const Course : React.FC<CourseProps> = ({course}) => {
  console.log(course)
  return (
    <div>
      hello
    </div>
  )
}

export default Course
