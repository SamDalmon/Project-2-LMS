import { useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function TeacherSignUp () {
  const navigate = useNavigate();
  const { teacherSignUp } = useAuth();
  const [error, setError] = useState('');
  const [ authFields, setAuthFields ] = useState({ 
    username: '', password: '' 
  });
  const [ signUpFields, setSignUpFields ] = useState({ 
    email: '', first_name: '', last_name: '' 
  });

  const onSubmit = async () => {
    const { success, error } = await teacherSignUp({...authFields, ...signUpFields})
    
    if (success) {
      console.log('Teacher sign up successful');
      navigate('/courses');
    } else {
      console.error(`Teacher sign up failed: ${error}`);
      setError(`Sign up failed: ${error}`)
    }
  }

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
        onSubmit={ onSubmit }
        authError={ error }
        setAuthError={ setError }
      />
    </>
  )
}