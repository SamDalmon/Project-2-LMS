import { useNavigate }  from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function SignIn () {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [authFields, setAuthFields] = useState({ username: '', password:'' })
  const [errors, setErrors] = useState({})

  const onSubmit = async () => {
    const {success, error} = await login(authFields)
    if ( success ) {
      console.log('Sign in successful')
      navigate('/courses')
    } else {
      console.error(`Sign in Failed: ${JSON.stringify(error)}`)
      setErrors(error)
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
        authErrors={ errors }
        setAuthErrors={ setErrors }
      />
    </>
  )
}