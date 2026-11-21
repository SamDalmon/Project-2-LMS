import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function StudentSignUp () {
  const navigate = useNavigate()
  const { studentSignUp } = useAuth()
  const [ authFields, setAuthFields ] = useState({ 
    username: '', password: '' 
  })
  const [ signUpFields, setSignUpFields ] = useState({ 
    email: '', first_name: '', last_name: '' 
  })

  const onSubmit = async () => {
    const { success, error } = await studentSignUp({...authFields, ...signUpFields})
  
    if (success) {
      console.log('Student sign up successful')
      navigate('/courses')
    } else {
      console.log(`Student sign up failed: ${error}`)
    }
  }

  return (
    <>
      <AuthLayout 
        title='Student Sign Up'
        leftLink={ <Link to='/sign-in'>Sign In</Link> }
        rightLink={ <Link to='/teacher-sign-up'>Teacher Sign Up</Link> }
        authFields={ authFields }
        setAuthFields={ setAuthFields }
        signUpFields={ signUpFields }
        setSignUpFields={ setSignUpFields }
        onSubmit={ onSubmit }
      />
    </>
  )
}