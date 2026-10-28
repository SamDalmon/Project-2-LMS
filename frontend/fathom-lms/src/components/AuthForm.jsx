import TextField from "@mui/material/TextField"

export default function AuthLayout (){
  return (
    <>
      <TextField
        id='username'
        label='Username'
        variant='outlined'
      />
      <TextField
        id='password'
        label='Password'
        variant='outlined'
        type='password'
      />
    </>
  )    
}
