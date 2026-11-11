import { useState } from 'react'
import { useNavigate, useOutletContext, Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

export default function StudentSignUp () {
  const navigate = useNavigate()
  const { setSignedIn }  = useOutletContext()
  const [ authFields, setAuthFields ] = useState({ 
    username: '', password: '' 
  })
  const [ signUpFields, setSignUpFields ] = useState({ 
    email: '', firstName: '', lastName: '' 
  })

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