import { APP_NAME } from '../../constants'
import logo from '../../assets/logo.png'
import styles from "./Header.module.css"
import AccountInfo from '../AccountInfo/AccountInfo'
import { Link, useMatch } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header () {
  const { user } = useAuth();
  const isUserManagement = useMatch('/user-management/')

  return (
    <>
      <div className={ styles.header }>
        <div className={ styles.heroContainer }>
          <img className={ styles.fathomLogo } src={logo} 
            alt='Fathom logo, also link to home screen'
          />
          <h1 className={ styles.appTitle }>{ APP_NAME }</h1>
        </div>
        { isUserManagement && 
          <Link to='/courses' className={ styles.backLink }>
            {'< Back to Course Catalog'}
          </Link>
        }
        <div className={ styles.accountInfoContainer }>
          { user && user.status === 'PENDING' &&
            <div className={ styles.pendingStatusWarning }>
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