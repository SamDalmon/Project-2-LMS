import './AuthLayout.css'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function AuthLayout ({title, leftLink, rightLink, content, onSubmit}) {
  return (
    <div className="auth-layout">
      <div className="auth-layout-container">
        <h2>{ title }</h2>
        <nav className='nav-container'>
          { leftLink }
          { rightLink }
        </nav>
        <Stack spacing={1} direction='column'>
          { content }
          <Button
            id='submit-button'
            onClick={ onSubmit }
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