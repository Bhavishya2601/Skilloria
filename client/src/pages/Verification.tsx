import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

interface VerificationProps {
  setUserVerified: string
}

const Verification : React.FC<VerificationProps> = ({setUserVerified}) => {
  const token = useParams()
  console.log(token)
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
