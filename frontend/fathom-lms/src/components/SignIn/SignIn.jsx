import './SignIn.css'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function SignIn () {
  return (
    <div className='sign-in'>
      <div className='sign-in-container'>
        <h2>Sign In</h2>
        <Stack spacing={1} direction='column'>
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
          <Button
            variant='contained'
            sx={{
              backgroundColor: 'var(--primary-theme)'
            }}
          >
            Submit
          </Button>
        </Stack> 
      </div>
    </div>
  )
}