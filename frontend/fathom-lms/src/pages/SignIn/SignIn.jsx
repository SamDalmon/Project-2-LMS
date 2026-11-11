import { useNavigate, useOutletContext }  from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

export default function SignIn () {
  const navigate = useNavigate()
  const { setSignedIn }  = useOutletContext()
  const [authFields, setAuthFields] = useState({ username: '', password:'' })

  return ( 
    <>
      <AuthLayout 
        title='Sign In'
        leftLink={ <Link to='/student-sign-up'>Student Sign Up</Link> }
        rightLink={ <Link to='/teacher-sign-up'>Teacher Sign Up</Link> }
        authFields={ authFields }
        setAuthFields={ setAuthFields }
        onSubmit={ 
          () => {
            setSignedIn(true)
            navigate('/courses')
          } 
        } //TODO: Create OnSubmit function
      />
    </>
  )
}