import { useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

export default function TeacherSignUp () {
  const navigate = useNavigate()
  const { setSignedIn }  = useOutletContext()

  return (
    <>
      <AuthLayout 
        title='Teacher Sign Up'
        leftLink={ <Link to='/sign-in'>Sign In</Link> }
        rightLink={ <Link to='/student-sign-up'>Student Sign Up</Link> }
        isSignUp={ true }
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