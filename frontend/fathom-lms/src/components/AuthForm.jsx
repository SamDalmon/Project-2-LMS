import TextField from "@mui/material/TextField"

export default function AuthLayout ({ 
  authFields, setAuthFields, formErrors, setFormErrors 
}){
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setAuthFields({ ...authFields, [name]: value })

    if(value.trim()){
      setFormErrors({ ...formErrors, [name]: false })
    }
  }

  return (
    <>
      <TextField
        name='username'
        id='username'
        label='Username *'
        variant='outlined'
        value= { authFields.username }
        onChange={ handleChange }
        error={ formErrors.username }
      />
      <TextField
        name='password'
        id='password'
        label='Password *'
        variant='outlined'
        type='password'
        value={ authFields.password }
        onChange={ handleChange }
        error={ formErrors.password }
      />
    </>
  )    
}
