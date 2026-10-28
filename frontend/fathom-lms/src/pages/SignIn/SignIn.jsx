import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import AuthForm from '../../components/AuthForm'

export default function TeacherSignUp () {
  return (
    <>
      <AuthLayout 
        title='Sign In'
        leftLink={ <Link to='/student-sign-up'>Student Sign Up</Link> }
        rightLink={ <Link to='/teacher-sign-up'>Teacher Sign Up</Link> }
        content={
          <>
            <AuthForm/>
          </>
        }
        onSubmit={ () => null } //TODO: Create OnSubmit function
      />
    </>
  )
}