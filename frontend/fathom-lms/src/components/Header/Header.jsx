import { APP_NAME } from '../../constants'
import logo from '../../assets/logo.png'
import "./Header.css"
import AccountInfo from '../AccountInfo/AccountInfo'
import { Link, useMatch } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header () {
  const { user } = useAuth();
  const isUserManagement = useMatch('/user-management/')

  return (
    <>
      <div className='header'>
        <div className='hero-container'>
          <img id='fathom-logo' src={logo} 
            alt='Fathom logo, also link to home screen'
          />
          <h1>{ APP_NAME }</h1>
        </div>
        { isUserManagement && 
          <Link to='/courses' className='back-link'>
            {'< Back to Course Catalog'}
          </Link>
        }
        { user &&
          <AccountInfo />
        }
      </div>
    </>
  )
}