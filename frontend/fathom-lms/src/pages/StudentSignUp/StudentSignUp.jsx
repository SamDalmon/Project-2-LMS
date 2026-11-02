import { useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import AuthForm from '../../components/AuthForm'
import SignUpForm from '../../components/SignUpForm'

export default function StudentSignUp () {
  const navigate = useNavigate();
  const { setSignedIn }  = useOutletContext()

  return (
    <>
      <AuthLayout 
        title='Student Sign Up'
        leftLink={ <Link to='/sign-in'>Sign In</Link> }
        rightLink={ <Link to='/teacher-sign-up'>Teacher Sign Up</Link> }
        content={
          <>
            <AuthForm/>
            <SignUpForm/>
          </>
        }
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