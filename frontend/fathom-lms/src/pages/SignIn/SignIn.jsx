import { useNavigate }  from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import AuthForm from '../../components/AuthForm'

export default function TeacherSignUp () {
  const navigate = useNavigate()

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
        onSubmit={ () => navigate('/courses') } //TODO: Create OnSubmit function
      />
    </>
  )
}