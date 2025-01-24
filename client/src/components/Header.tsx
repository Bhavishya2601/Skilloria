import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const { userData } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMouseClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <div className={`h-20 flex justify-between px-4 xs:px-10 lg:px-20 items-center ${menuOpen ? 'border-b-2 border-gray-200' : 'shadow-xl'} relative z-30 `}>
        <Link to={'/'} className='flex gap-1 font-dmSerif items-center'>
          <img src="/logo.png" alt="Skilloria" className='h-10' />
          <div className='text-3xl font-semibold tracking-wide'>Skilloria</div>
        </Link>
        <div className='flex gap-8 text-lg font-semibold text-gray-600 font-manrope items-center'>
          <div className='hidden md:flex gap-8 text-lg font-semibold text-gray-600 font-manrope items-center'>
            <Link to={'/'} className='hover:text-purple-600 transition-all duration-300'>Home</Link>
            {userData != null ? (
              <div className='flex gap-8 items-center'>
                <Link to={'/courses'} className='hover:text-purple-600 transition-all duration-300'>Courses</Link>
                <Link to={'/learning'} className='hover:text-purple-600 transition-all duration-300'>My Learning</Link>
                <Link to={`/profile/${userData?._id}`} className='hover:text-purple-600 transition-all duration-300'>Profile</Link>
              </div>
            ) : (
              <Link to={'/login'} className='hover:text-purple-600 transition-all duration-300'>Get Started</Link>
            )}
            {userData?.isAdmin && <Link to={'/admin'} className='hover:text-purple-600 transition-all duration-300'>Admin</Link>}
          </div>
          <div className='md:hidden flex items-center'>
            {menuOpen ? (
              <RxCross2 className='text-2xl cursor-pointer' onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars className='text-2xl cursor-pointer' onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      <div className={`absolute md:hidden flex flex-col top-20 left-0 w-full py-2 font-semibold bg-[#f6f6f6] text-lg font-manrope items-center transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'} z-20 shadow-xl`}>
        {
          userData != null ? (
            <>
              <Link to={'/courses'} className='w-full text-center py-2 border-b-2' onClick={handleMouseClick}>
                <div className={`hover:text-purple-600`}>Courses</div>
              </Link>
              <Link to={'/learning'} className='w-full text-center py-2 border-b-2' onClick={handleMouseClick}>
                <div className={`hover:text-purple-600`}>My Learning</div>
              </Link>
              <Link to={`/profile/${userData?._id}`} className='w-full text-center py-2 border-b-2' onClick={handleMouseClick}>
                Profile
              </Link>
              {userData?.isAdmin && <Link to={'/admin'} className='transition-all duration-300 py-2 border-b-2'>Admin</Link>}
            </>
          ) : (
            <Link to={'/login'} className='w-full text-center'>
              <div className={`hover:text-purple-600`} onClick={handleMouseClick}>Get Started</div>
            </Link>
          )
        }
      </div>

    </>
  );
}

export default Header;
