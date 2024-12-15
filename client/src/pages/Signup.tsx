// import {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

type FormData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Signup = () => {
  const {
    register,
    handleSubmit
  } = useForm<FormData>()

  const handleSignup = handleSubmit( async ({name, email, password}) => {
    console.log(name, email, password)
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        name, email, password
      })
      console.log(response.data)
    } catch (err){
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
