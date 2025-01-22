import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import p from '../assets/p.jpg'

const Header = () => {
  const { userData } = useUser()

  return (
    <div className="h-20 flex justify-between px-20 mdd:px-40 items-center shadow-xl"> 
    {/* change to hamburger at md */}
      <Link to={'/'} className='flex gap-1 font-dmSerif items-center'>
        <img src="/logo.png" alt="Skilloria" className='h-10' />
        <div className='text-3xl font-semibold tracking-wide'>Skilloria</div>
      </Link>
      <div className='flex gap-8 text-lg font-semibold text-gray-600 font-manrope items-center'>
        <Link to={'/'} className='hover:text-purple-600 transition-all duration-300'>Home</Link>
        {userData != null ?
          <div className='flex gap-8 items-center'>
            <Link to={'/courses'} className='hover:text-purple-600 transition-all duration-300'>Courses</Link>
            <Link to={'/learning'} className='hover:text-purple-600 transition-all duration-300'>My Learning</Link>
            <Link to={`/profile/${userData?._id}`} className='hover:text-purple-600 transition-all duration-300'>
              <img src={p} alt="user" className='h-8'/>
            </Link>
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
