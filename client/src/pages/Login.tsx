import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import p1 from '../assets/p1.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useUser } from '../context/UserContext.tsx'

type FormData = {
  email: string,
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { userData, setReTrigger, isLoading } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit
  } = useForm<FormData>()

  useEffect(() => {
    if (!isLoading && userData && Object.entries(userData).length !== 0) {
      navigate('/courses')
    }
  })

  const handleLogin = handleSubmit(async ({ email, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
        email, password
      }, {
        withCredentials: true
      })
      setReTrigger((prev) => prev + 1)
      if (response.status === 200) {
        toast.success('Login Successfully')
        navigate('/courses')
      }
    } catch (err) {
      console.log((err as Error).message)
    }
  })
  return (
    <div className='min-h-[calc(100vh-4rem)] flex gap-10'>
      <div className='w-1/2 flex justify-end items-center'>
        <img src={p1} alt="login" />
      </div>
      <div className='w-1/2 flex flex-col gap-8 justify-center items-center font-manrope'>
        <div className='text-4xl font-bold text-center'>
          <div>Log in to continue your</div>
          <div>learning journey</div>
        </div>
        <form onSubmit={handleLogin} className='flex flex-col gap-4 w-3/5'>
          <div className="relative">
            <input
              type="email"
              {...register("email", {
                required: true
              })}
              className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-500 transition-all"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register("password", {
                required: true,
                min: 8,
                max: 16
              })}
              className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-500 transition-all"
              placeholder=" "
            />
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
              Password
            </label>
            <div className='absolute right-4 top-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash className='text-2xl' /> : <FaEye className='text-2xl' />}
            </div>
          </div>
          <input
            type="submit"
            value="Sign up"
            className='w-full px-2 py-3 text-lg cursor-pointer bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors'
          />
        </form>
        <div>Don't have an Account? <Link to={'/signup'} className='text-purple-600 font-bold'>Signup</Link></div>
      </div>
    </div>
  )
}

export default Login
