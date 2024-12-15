import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

type FormData = {
    email: string,
    password: string
}

const Login = () => {
    const {
        register,
        handleSubmit    
    } = useForm<FormData>()

    const handleLogin = handleSubmit(({email, password}) => {
        console.log(email, password)
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
