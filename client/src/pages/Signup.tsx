// import {useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type FormData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Signup: React.FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit
  } = useForm<FormData>()

  const CheckSignUpStatus = async (email: string) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/checkStatus`, {email})
      console.log(response)
      if (response.status === 200) {
        navigate('/courses')
        clearInterval(interval)
      }
    } catch (err){
      console.log((err as Error))
      toast.error('Something Went Wrong')
      clearInterval(interval)
    }
  }
  
  let interval : ReturnType<typeof setInterval>;

  const handleSignup = handleSubmit(async ({ name, email, password }) => {
    console.log(name, email, password)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        name, email, password
      })
      if (response.status === 200) {
        // pop up for waiting
        interval = setInterval(async () => {
          CheckSignUpStatus(email)
        }, 5000);
      }
    } catch (err) {
      console.log((err as Error).message)
      toast.error('Something Went Wrong')
    }
  })

  return (
    <div>
      signup

      <form onSubmit={handleSignup}>
        <input type="name" {...register("name")} placeholder='full name' />
        <input type="email" {...register("email")} placeholder='email' />
        <input type="password" {...register("password")} placeholder='password' />
        <input type="password" {...register("confirmPassword")} placeholder='confirm password' id="" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Signup
