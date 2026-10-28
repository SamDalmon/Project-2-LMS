import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import AuthForm from '../../components/AuthForm'
import SignUpForm from '../../components/SignUpForm'

export default function TeacherSignUp () {
  return (
    <>
      <AuthLayout 
        title='Teacher Sign Up'
        leftLink={ <Link to='/sign-in'>Sign In</Link> }
        rightLink={ <Link to='/student-sign-up'>Student Sign Up</Link> }
        content={
          <>
            <AuthForm/>
            <SignUpForm/>
          </>
        }
        onSubmit={ () => null } //TODO: Create OnSubmit function
      />
    </>
  )
}