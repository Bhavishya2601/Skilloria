// import React from 'react'

interface CourseProps {
    course: string
}

const Course : React.FC<CourseProps> = ({course}) => {
  return (
    <div>
      {course}
    </div>
  )
}

export default Course
