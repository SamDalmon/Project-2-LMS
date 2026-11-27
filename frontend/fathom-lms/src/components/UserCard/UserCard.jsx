import './UserCard.css'
import React from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Stack, Button } from '@mui/material';

export default function UserCard ({ 
  user, setEditingId, handleApprove, handleReject, isCurrentUser 
}){

  const userInfo = { 
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    role: user.role
  }

  let iconColor = undefined

  switch ( user.status ) {
    case 'ACTIVE': 
      iconColor = '#59ff59';
      break;
    case 'PENDING': 
      iconColor = '#f7e300';
      break;
    case 'REJECTED': 
      iconColor = '#ff1c1c';
      break;
  }

  return (
    <div className='card-container'>
      <div className='account-icon-container'>
      <AccountCircle 
        className='account-icon'
        sx={{ 
          fontSize: '50px',
          border: `3px solid ${ iconColor }`, 
          borderRadius: '100%', 
        }}
      />
        { isCurrentUser && <p>(You)</p> }
      </div>
      <dl className='user-info-container'>
        {
          Object.entries(userInfo).map(([key, value]) => (
            <React.Fragment key={key}>
              <dt>{ key }</dt>
              <dd>{ value }</dd>
            </React.Fragment>
          ))  
        }
      </dl>
      <Stack 
        className='button-container' 
        spacing={0.5} 
        direction='column'
        sx={{ width: '90px' }}
      >
        { user.status === 'PENDING' && (<>
          <Button 
            id='approve-button'
            onClick={ () => handleApprove(user) }
            variant='contained'
            sx={{ backgroundColor: 'var(--primary-theme)' }}
          >Approve</Button>
          <Button 
            id='reject-button'
            onClick={ () => handleReject(user) }
            variant='contained'
            sx={{ backgroundColor: 'var(--secondary-theme)' }}
          >Reject</Button>
        </>)}
        { user.status !== 'PENDING' && (
          <Button
            id='edit-button'
            onClick={ () => setEditingId(user.pk) }
            variant='contained'
            sx={{ 
              backgroundColor: 'var(--button-grey)', 
            }}

          >Edit</Button>
        )}
      </Stack>
    </div>
  )
}