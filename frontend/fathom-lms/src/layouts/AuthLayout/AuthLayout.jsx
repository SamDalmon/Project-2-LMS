import './AuthLayout.css'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AuthForm from '@/components/AuthForm'
import SignUpForm from '@/components/SignupForm'
import { useState } from 'react'

export default function AuthLayout ({title, leftLink, rightLink, isSignUp, onSubmit}) {
  const [ authFields, setAuthFields ] = useState({ 
  username: '', password: '' 
})
  const [ signUpFields, setSignUpFields ] = useState({ 
    email: '', firstName: '', lastName: '' 
  })

  const [ formErrors, setFormErrors ] = useState({ 
    username: false, password: false,
    email: false, firstName: false, lastName: false
  })

  const allFields = {...authFields, ...(isSignUp && signUpFields)}

  const handleSubmit = (e) => {
    if( validateForm() ){
      onSubmit(e)
    }
  }

  const validateForm = () => {
    var isValid = true
    const currentErrors = {}

    for( const [field, value] of Object.entries(allFields)) {
      if( !value.trim() ){ 
        currentErrors[field] = true
        isValid = false
      }
    }

    setFormErrors(currentErrors)

    return isValid
  }

  return (
    <div className="auth-layout">
      <div className="auth-layout-container">
        <h2>{ title }</h2>
        <nav className='nav-container'>
          { leftLink }
          { rightLink }
        </nav>
        <Stack spacing={1} direction='column'>
          <AuthForm 
            authFields={ authFields } setAuthFields={ setAuthFields }
            formErrors= { formErrors } setFormErrors={ setFormErrors }
          />
          { isSignUp && 
            <SignUpForm 
              signUpFields={ signUpFields } setSignUpFields={ setSignUpFields }
              formErrors= { formErrors } setFormErrors={ setFormErrors }
            />
          }
          <Button
            id='submit-button'
            onClick={ handleSubmit }
            variant='contained'
            sx={{ backgroundColor: 'var(--primary-theme)' }}
          >
            Submit
          </Button>
        </Stack>
      </div>
    </div>
  )
}