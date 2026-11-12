import { useNavigate, useOutletContext }  from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function SignIn () {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { setSignedIn }  = useOutletContext()
  const [authFields, setAuthFields] = useState({ username: '', password:'' })

  const onSubmit = () => {
    const {success, error} = login(authFields)
    if ( success ) {
      setSignedIn(true)
      console.log('Sign in successful')
      navigate('/courses')
    } else {
      console.log(`Sign in Failed: ${error}`)
    }
  }

  return ( 
    <>
      <AuthLayout 
        title='Sign In'
        leftLink={ <Link to='/student-sign-up'>Student Sign Up</Link> }
        rightLink={ <Link to='/teacher-sign-up'>Teacher Sign Up</Link> }
        authFields={ authFields }
        setAuthFields={ setAuthFields }
        onSubmit={ onSubmit } 
      />
    </>
  )
}