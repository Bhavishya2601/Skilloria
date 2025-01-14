// import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="h-16 flex justify-between px-40 items-center shadow-xl">
      <div>
        logo
      </div>
      <div className='flex gap-8 text-lg font-semibold text-gray-600'>
        <Link to={'/'} className='hover:text-[#20BFF0] transition-all duration-300'>Home</Link>
        <Link to={'/login'} className='hover:text-[#20BFF0] transition-all duration-300'>Get Started</Link>
      </div>
    </div>
  )
}

export default Header
