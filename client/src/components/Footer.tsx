// import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-between px-20 py-5 text-lg bg-gradient-to-r from-[#202959] to-[#031d91] text-white">
      <div>&copy; {new Date().getFullYear()} copyright. All Rights Reserved</div>
      <div>Made by <a href="https://www.linkedin.com/in/bhavishya2601/" target="_blank" className="font-bold cursor-pointer">Bhavishya Garg</a></div>
    </div>
  )
}

export default Footer
