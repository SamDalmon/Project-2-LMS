import { APP_NAME } from '../../constants'
import logo from '../../assets/logo.png'
import "./Header.css"
import AccountInfo from '../AccountInfo/AccountInfo'

export default function Header ({ user }) {

  return (
    <>
      <div className='header'>
        <div className='hero-container'>
          <img id='fathom-logo' src={logo} 
            alt='Fathom logo, also link to home screen'
          />
          <h1>{ APP_NAME }</h1>
        </div>
        <AccountInfo user={ user }/>
      </div>
    </>
  )
}