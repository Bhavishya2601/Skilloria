import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="text-red-500">
      <Link to={'/login'}>get started</Link>
    </div>
  )
}

export default Home
