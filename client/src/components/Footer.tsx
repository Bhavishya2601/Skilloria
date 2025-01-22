// import React from 'react'

const Footer = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-center sm:justify-between md:px-20 px-10 py-5 md:text-lg bg-gradient-to-r from-[#202959] to-[#031d91] text-white">
      <div>&copy; {new Date().getFullYear()} copyright. All Rights Reserved</div>
      <div>Made by <a href="https://www.linkedin.com/in/bhavishya2601/" target="_blank" className="font-bold cursor-pointer">Bhavishya Garg</a></div>
    </div>
  )
}

export default Footer
