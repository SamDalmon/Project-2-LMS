import { useState } from 'react'
import { useNavigate, useOutletContext, Link  } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

export default function TeacherSignUp () {
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
        title='Teacher Sign Up'
        leftLink={ <Link to='/sign-in'>Sign In</Link> }
        rightLink={ <Link to='/student-sign-up'>Student Sign Up</Link> }
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