import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

type FormData = {
    email: string,
    password: string
}

const Login = () => {
  const navigate = useNavigate()
    const {
        register,
        handleSubmit    
    } = useForm<FormData>()

    const handleLogin = handleSubmit( async ({email, password}) => {
        try{
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
            email, password
          })
          console.log(response.data)
          if (response.status === 200){
            toast.success('Login Successfully')
            navigate('/courses')
          }
        } catch (err){
          console.log((err as Error).message)
        }
    })

  return (
    <div className=''>
      <form onSubmit={handleLogin}>
        <input 
        type="email"
        {...register("email", {
            required: true
        })}
        />
        <br />
        <input 
        {...register("password", {
            required: true,
            min: 8,
            max: 16
        })}
        type="password" />
        <br />
        <input 
        type="submit" />
      </form>
      <br /><br />
      <Link to={'/signup'}>Signup</Link>
    </div>
  )
}

export default Login
