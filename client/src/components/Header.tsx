import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Header = () => {
  const { userData } = useUser()

  return (
    <div className="h-20 flex justify-between px-40 items-center shadow-xl">
      <Link to={'/'} className='flex gap-1 font-dmSerif items-center'>
        <img src="/logo.png" alt="Skilloria" className='h-10' />
        <div className='text-3xl font-semibold tracking-wide'>Skilloria</div>
      </Link>
      <div className='flex gap-8 text-lg font-semibold text-gray-600 font-manrope'>
        <Link to={'/'} className='hover:text-purple-600 transition-all duration-300'>Home</Link>
        {userData != null ? 
        <div className='flex gap-8'>
        <Link to={'/courses'} className='hover:text-purple-600 transition-all duration-300'>Courses</Link> 
        <Link to={'/learning'} className='hover:text-purple-600 transition-all duration-300'>My Learning</Link> 
        </div>
        :
          <Link to={'/login'} className='hover:text-purple-600 transition-all duration-300'>Get Started</Link>
        }
        
        {userData?.isAdmin && <Link to={'/admin'} className='hover:text-purple-600 transition-all duration-300'>Admin</Link>}
      </div>
    </div>
  )
}

export default Header
