import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import p1 from '../assets/p1.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type FormData = {
  name: string,
  email: string,
  password: string,
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit
  } = useForm<FormData>()

  const CheckSignUpStatus = async (email: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/checkStatus`, { email })
      if (response.status === 200) {
        navigate('/courses')
        clearInterval(interval)
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/token`, email, {
          withCredentials: true
        })
      }
    } catch (err) {
      console.error((err as Error))
      toast.error('Something Went Wrong')
      clearInterval(interval)
    }
  }

  let interval: ReturnType<typeof setInterval>;

  const handleSignup = handleSubmit(async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        name, email, password
      })
      if (response.status === 200) {
        interval = setInterval(async () => {
          CheckSignUpStatus(email)
        }, 5000);
      }
    } catch (err) {
      console.error((err as Error).message)
      toast.error('Something Went Wrong') 
    }
  })

  return (
    <div className='min-h-[calc(100vh-4rem)] flex gap-10'>
      <div className='w-1/2 flex justify-end items-center'>
        <img src={p1} alt="login" />
      </div>
      <div className='w-1/2 flex flex-col gap-8 justify-center items-center font-manrope'>
        <div className='text-4xl font-bold'>Sign up and start learning</div>
        <form onSubmit={handleSignup} className='flex flex-col gap-4 w-3/5'>
          <div className="relative">
            <input 
              type="text" 
              {...register("name")} 
              className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-500 transition-all"
              placeholder=" "
            />
            <label 
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
              Full name
            </label>
          </div>
          <div className="relative">
            <input 
              type="email" 
              {...register("email")} 
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
              {...register("password")} 
              className="peer w-full p-2 pt-6 pb-2 border-2 border-gray-300 bg-white rounded-md outline-none focus:border-purple-500 transition-all"
              placeholder=" "
            />
            <label 
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-sm peer-focus:text-purple-500 transition-all">
              Password
            </label>
              <div className='absolute right-4 top-4 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className='text-2xl'/> : <FaEye className='text-2xl'/>}
              </div>
          </div>
          <input 
            type="submit"
            value="Sign up"
            className='w-full px-2 py-3 text-lg cursor-pointer bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors' 
          />
        </form>
        <div>Already have an Account? <Link to={'/login'} className='text-purple-600 font-bold'>Login</Link></div>
      </div>
    </div>
  )
}

export default Signup
