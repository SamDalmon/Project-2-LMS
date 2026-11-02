import { APP_NAME } from '../../constants'
import logo from '../../assets/logo.png'
import "./Header.css"
import AccountInfo from '../AccountInfo/AccountInfo'

export default function Header ({ user, signedIn, setSignedIn }) {

  return (
    <>
      <div className='header'>
        <div className='hero-container'>
          <img id='fathom-logo' src={logo} 
            alt='Fathom logo, also link to home screen'
          />
          <h1>{ APP_NAME }</h1>
        </div>
        { signedIn &&
          <AccountInfo user={ user } setSignedIn={ setSignedIn }/>
        }
      </div>
    </>
  )
}