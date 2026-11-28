import styles from './AuthLayout.module.css'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AuthForm from '@/components/AuthForm'
import SignUpForm from '@/components/SignupForm'
import { useEffect, useState, useCallback, useMemo } from 'react'

export default function AuthLayout ({ 
  title, leftLink, rightLink, 
  authFields, setAuthFields, 
  signUpFields=null, setSignUpFields=null, 
  onSubmit, authErrors, setAuthErrors
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
    setAuthErrors('')
    if( validateForm() ){
      onSubmit()
    }
  }, [validateForm, onSubmit, setAuthErrors])

  const errorEntries = typeof authErrors === 'string'
    ? (authErrors ? [['', authErrors]] : [])
    : Object.entries(authErrors ?? {})

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
    <div className={ styles.authLayout }>
      <div className={ styles.authLayoutContainer }>
        <h2>{ title }</h2>
        <nav className={ styles.navContainer }>
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
        { errorEntries.map(([field, errors]) => {
          const messages = Array.isArray(errors) ? errors : [errors]
          const fieldTitle = field.replaceAll('_', ' ').replace(/\d/g, '')
          return (
            <div className={ styles.authErrorContainer } key={ field || 'auth-error' } >
              { field && <h4 className={ styles.authErrorHeader }>{ fieldTitle }</h4> }
              <ul>
                { messages.map((error, index) => (
                  <li className={ styles.auth-error } key={ `${field}-${index}` }  >
                    { String(error) }
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}