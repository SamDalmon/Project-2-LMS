import './AuthLayout.css'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AuthForm from '@/components/AuthForm'
import SignUpForm from '@/components/SignupForm'
import { useEffect, useState, useCallback, useMemo } from 'react'

export default function AuthLayout ({ 
  title, leftLink, rightLink, 
  authFields, setAuthFields, 
  signUpFields=null, setSignUpFields=null, 
  onSubmit, authError, setAuthError
}) {

  const allFields = useMemo (() => 
    ({...authFields, ...signUpFields}),
    [authFields, signUpFields]
  )

  const [ formErrors, setFormErrors ] = useState(
    /*Creates an object with keys for all the fields being 
      used, and assigns 'false' to all of them */
    Object.fromEntries(
      Object.keys(allFields).map(key => [key, false])
    )
  )

  const validateForm = useCallback (() => {
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
  }, [allFields])

  const handleSubmit = useCallback(() => {
    setAuthError('')
    if( validateForm() ){
      onSubmit()
    }
  }, [validateForm, onSubmit, setAuthError])

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleSubmit()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [handleSubmit])

  return (
    <div className="auth-layout">
      <div className="auth-layout-container">
        <h2>{ title }</h2>
        <nav className='nav-container'>
          { leftLink }
          { rightLink }
        </nav>
        <Stack spacing={1} direction='column' sx={{width: '100%'}}>
          <AuthForm 
            authFields={ authFields } setAuthFields={ setAuthFields }
            formErrors={ formErrors } setFormErrors={ setFormErrors }
          />
          { signUpFields && 
            <SignUpForm 
              signUpFields={ signUpFields } setSignUpFields={ setSignUpFields }
              formErrors={ formErrors } setFormErrors={ setFormErrors }
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
        <p className='auth-error'>{ authError }</p>
      </div>
    </div>
  )
}