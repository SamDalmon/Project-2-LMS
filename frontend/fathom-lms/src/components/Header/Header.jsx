import { APP_NAME } from '../../constants'
import logo from '../../assets/logo.png'
import "./Header.css"
import { AccountCircle } from '@mui/icons-material'

export default function Header () {
  const imageSize = 50
  const accountIconHeight = 45

  return (<div className='header'>
    <div className='hero-container'>
      <img id='fathom-logo' src={logo} 
        width={imageSize} height={imageSize}
        alt='Fathom logo, also link to home screen'
      />
      <h1>{ APP_NAME }</h1>
    </div>
    <div className='account-container' aria-label='Account options'>
      <div className='vertical-line'></div>
      <div className='user-info-container'>
        <span className='username'>User Name</span> 
        <span className='role'>Role</span>
      </div>
      <AccountCircle 
        className='account-icon'
        sx={{ fontSize: accountIconHeight }}
      />
    </div>
  </div>)
}