import './AccountMenu.css'
import { ButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export default function AccountMenu({ role }){
  const navigate = useNavigate()

  const buttons = [
    {text:'Sign Out', onClick: () => navigate('/sign-in')}
  ]
  if (role === 'admin'){
    buttons.unshift({
      text: 'User Management', onClick: () => navigate('/user-management')
    })
  }

  const buttonGroupStyle = { 
    borderRadius: '0px 0px var(--radius-sm) var(--radius-sm)',
    boxShadow: '0px 4px 4px -2px rgba(0,0,0,0.2)',
    width: 'var(--width-account-menu)',
    gap: '0px',
    backgroundColor: 'var(--header-background-color)',
    border: '1px solid var(--header-background-color)',
    padding: '5px',
    '& .MuiButtonGroup-grouped': { 
      fontSize: 'var(--font-sm)',
      textWrap: 'nowrap',
      height: '5sp',
      border: '1px solid var(--header-background-color)',
      BorderColor: 'var(--header-background-color)',
      background: '#FFFFFF',
      color: 'var(--dark-text)',
      padding: '2px',
    },
  }

  return (
    <div className='account-menu'>
      <ButtonGroup
        orientation='vertical'
        variant='contained'
        aria-label='Account Menu'
        sx={ buttonGroupStyle }
      >
        {
          buttons.map(({text, onClick}, index) => (
            <Button
              key={ index }
              onClick={ onClick }
              size='small'
            >
              { text }
            </Button>
          ))
        }
      </ButtonGroup>
    </div>
  )
}