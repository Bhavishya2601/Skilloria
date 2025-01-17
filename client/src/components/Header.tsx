import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Header = () => {
  const { userData } = useUser()

  return (
    <div className="h-16 flex justify-between px-40 items-center shadow-xl">
      <div>
        logo
      </div>
      <div className='flex gap-8 text-lg font-semibold text-gray-600'>
        <Link to={'/'} className='hover:text-[#20BFF0] transition-all duration-300'>Home</Link>
        {userData != null ? <Link to={'/courseform'} className='hover:text-[#20BFF0] transition-all duration-300'>Add Course</Link> :
          <Link to={'/login'} className='hover:text-[#20BFF0] transition-all duration-300'>Get Started</Link>
        }
        {userData?.isAdmin && <Link to={'/admin'} className='hover:text-[#20BFF0] transition-all duration-300'>Admin</Link>}
      </div>
    </div>
  )
}

export default Header
