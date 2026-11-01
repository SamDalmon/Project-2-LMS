import { APP_NAME } from '../../constants'
import logo from '../../assets/logo.png'
import "./Header.css"
import { AccountCircle } from '@mui/icons-material'
import AccountMenu from '../AccountMenu/AccountMenu'
import { useState } from 'react'

export default function Header ({ user }) {
  const [showMenu, setShowMenu] = useState(true)

  return (
    <>
      <div className='header'>
        <div className='hero-container'>
          <img id='fathom-logo' src={logo} 
            alt='Fathom logo, also link to home screen'
          />
          <h1>{ APP_NAME }</h1>
        </div>
        <div 
          className='account-container' 
          aria-label='Account options'
          onClick= { () => setShowMenu(true) }
        >
          <div className='vertical-line'></div>
          <div className='user-info-container'>
            <span className='username'>{ `${user.firstName} ${user.lastName}` }</span> 
            <span className='role'>{ user.role }</span>
          </div>
          <AccountCircle 
            className='account-icon'
            sx={{ fontSize: 'var(--account-icon-height)' }}
          />
        </div>
      </div>
      { showMenu && 
        <AccountMenu role={ user.role }/>
      }
    </>
  )
}