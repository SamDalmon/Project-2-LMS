import styles from './AccountInfo.module.css'
import React, { useState } from 'react'
import { AccountCircle } from "@mui/icons-material"
import { useNavigate, useMatch } from 'react-router-dom'
import  { Menu, MenuItem } from '@mui/material'
import { useAuth } from '../../context/AuthContext'

export default function AccountInfo(){
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const showCoursesButton = !useMatch('/courses/')
  const showUserManagementButton = !useMatch('/user-management/')

  const id = React.useId()
  const buttonId = `${id}-button`
  const menuId = `${id}-menu`
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    logout()
    handleClose()
  }

  const buttons = [
    {
      key: 1,
      text:'Sign Out', 
      onClick: handleSignOut
    }
  ]
  if (showCoursesButton){
    buttons.unshift({
      key: 3,
      text: 'Courses',
      onClick: () => {
        handleClose()
        navigate('/courses')
      }
    })
  }
  if (user.permissions.includes('user_manage') && showUserManagementButton){
    buttons.unshift({
      key: 2,
      text: 'User Management', 
      onClick: () => {
        handleClose()
        navigate('/user-management')
      }
    })
  }
  
  return (
    <>
      <div 
        className={ styles.accountContainer } 
        aria-label='Account options'
        onClick= { handleClick }
      >
        <div className={ styles.verticalLine }></div>
        <div className={ styles.userInfoContainer }>
          <span className={ styles.username }>{ `${user.first_name} ${user.last_name}` }</span> 
          <span className={ styles.role }>{ user.role }</span>
        </div>
        <AccountCircle 
          className={ styles.accountIcon }
          sx={{ fontSize: 'var(--account-icon-height)' }}
        />
      </div>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        anchorOrigin={{ 
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
        marginThreshold={0}
        slotProps={{
          paper: {
            sx: {
              border: '4px solid var(--header-background-color)',
              boxShadow: '0px 5px 10px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px -3px rgba(0, 0, 0, 0.14)',
              borderRadius: '0px 0px var(--radius-sm) var(--radius-sm)',
              backgroundColor: 'var(--header-background-color)'
            }
          },
          list: {
            'aria-labelledby': buttonId,
            sx: {
              display: 'flex',
              flexDirection: 'column',
              '& .MuiMenuItem-root': {
                backgroundColor: '#FFF',
                gap: '0px',
                border: '1px solid var(--header-background-color)',

                '&:hover': {
                  backgroundColor: '#f3f3f3',
                }
              }
            }
          }
        }}
      >
        {
          buttons.map(({key, text, onClick}) => (
            <MenuItem key={ key } onClick={ onClick }>{ text }</MenuItem>
          ))
        }
      </Menu>
    </>
  )
}