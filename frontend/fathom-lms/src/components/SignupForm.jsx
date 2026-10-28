import TextField from "@mui/material/TextField"

export default function SignUpForm () {
  return (
    <>
      <TextField
        id='email'
        label='Email'
        variant='outlined'
        type='email'
      />
      <TextField
        id='first-name'
        label='First Name'
        variant='outlined'
      />
      <TextField
        id='last-name'
        label='Last Name'
        variant='outlined'
      />
    </>
  )
}