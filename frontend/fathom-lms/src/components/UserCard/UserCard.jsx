import './UserCard.css'
import React, { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Stack, Button } from '@mui/material';

export default function UserCard ({ 
  user: { firstName, lastName, email, role, status } 
}){
  const [userStatus, setUserStatus] = useState(status)

  const userInfo = { 
    name: `${firstName} ${lastName}`,
    email,
    role
  }

  let iconColor = undefined

  switch ( userStatus ) {
    case 'active': 
      iconColor = '#59ff59';
      break;
    case 'pending': 
      iconColor = '#f7e300';
      break;
    case 'rejected': 
      iconColor = '#ff1c1c';
      break;
  }

  return (
    <div className='card-container'>
      <AccountCircle 
        className='account-icon'
        sx={{ 
          fontSize: '50px',
          border: `3px solid ${ iconColor }`, 
          borderRadius: '100%', 
        }}
      />
      <dl className='user-info-container'>
        {
          Object.entries(userInfo).map(([key, value]) => (
            <React.Fragment key={key}>
              <dt>{ key }:</dt>
              <dd>{ value }</dd>
            </React.Fragment>
          ))  
        }
      </dl>
      { userStatus === 'pending' && (
        <Stack className='button-container' spacing={0.5} direction='column'>
          <Button 
            id='approve-button'
            onClick={ () => setUserStatus('active') }
            variant='contained'
            sx={{ backgroundColor: 'var(--primary-theme)' }}
          > Approve </Button>
          <Button 
            id='reject-button'
            onClick={ () => setUserStatus('rejected') }
            variant='contained'
            sx={{ backgroundColor: 'var(--secondary-theme)' }}
          > Reject </Button>
        </Stack>
      )}
    </div>
  )
}