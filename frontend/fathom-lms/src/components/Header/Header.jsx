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
        <div className='account-info-container'>
          { user && user.status === 'PENDING' &&
            <div className= 'pending-status-warning'>
              <p>
                Your account has not been activated yet. 
                Your available actions are limited.
              </p>
            
            </div>
          }
          { user &&
            <AccountInfo />
          }
        </div>
      </div>
    </>
  )
}