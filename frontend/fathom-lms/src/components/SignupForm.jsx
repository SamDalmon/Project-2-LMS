import TextField from "@mui/material/TextField"

export default function SignUpForm ({ 
  signUpFields, setSignUpFields, formErrors, setFormErrors
}) {
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setSignUpFields({...signUpFields, [name]: value })

    if(value.trim()){
      setFormErrors({ ...formErrors, [name]: false })
    }
  }
  
  return (
    <>
      <TextField
        name='email'
        id='email'
        label='Email *'
        variant='outlined'
        type='email'
        value={ signUpFields.email }
        onChange={ handleChange }
        error={ formErrors.email }
      />
      <TextField
        name='first_name'
        id='first-name'
        label='First Name *'
        variant='outlined'
        value={ signUpFields.first_name }
        onChange={ handleChange }
        error={ formErrors.first_name }
      />
      <TextField
        name='last_name'
        id='last-name'
        label='Last Name *'
        variant='outlined'
        value={ signUpFields.last_name }
        onChange={ handleChange }
        error={ formErrors.last_name }
      />
    </>
  )
}