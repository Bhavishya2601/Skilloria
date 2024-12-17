import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"


const Verification: React.FC = () => {
  const token = useParams()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const verifyEmail = async () => {
      console.log('hello')
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verifiedUser`, token)
        console.log(response.data)
        if (response.status === 200){
          setVerified(true)
        }
      } catch (err) {
        console.log((err as Error).message)
      }
    }
    verifyEmail()
  }, [])

  return (
    <>
    {
      verified ? 
      <div>verified successfully</div>
      : 
      <div>please wait....</div>
      
    }
    </>
  )
}

export default Verification
