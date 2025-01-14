import error from '../assets/error.avif'
import {Link} from 'react-router-dom'

const Error: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-4rem)]'>
      <div className='text-4xl font-semibold font-manrope'>404 Page Not Found</div>
      <div>
      <img src={error} alt="" />
      </div>
      <div>
        <Link to={'/'} className='bg-[#A435F0] text-white py-3 px-8 text-xl font-semibold rounded-md'>Continue to Skilloria</Link>
      </div>
    </div>
  )
}

export default Error
