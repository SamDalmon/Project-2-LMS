import { APP_NAME } from '../constants'
import logo from '../assets/logo.jpg'

export default function Header () {
  return ( 
    <div className="header">
      <img src={logo}/>
      <h1>{ APP_NAME }</h1>
      <p>
        User Name 
        Role
      </p>
    </div>)
}