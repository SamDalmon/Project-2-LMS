import './EditUserCard.css'
import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Stack, Button, TextField } from '@mui/material';

export default function EditUserCard ({ 
  initialUser, handleSave, handleCancel, isCurrentUser 
}){

  const [user, setUser] = useState(initialUser);
  const editableFields = ['username', 'email', 'first_name', 'last_name'];

  const [ formErrors, setFormErrors ] = useState(
    Object.fromEntries(
      Object.keys(user).map(key => [key, false])
    )
  )

  const onSave = () => {
    if( validateForm() ){
      handleSave(user);
      setUser(initialUser);
    }
  };

  const onCancel = () => {
    handleCancel();
    setUser(initialUser);
  };

  const validateForm = () => {
    var isValid = true;
    const currentErrors = {};

    for( const [field, value] of Object.entries(user)) {
      if( editableFields.includes(field) && !value.trim() ){
        currentErrors[field] = true;
        isValid = false;
      }
    }

    setFormErrors(currentErrors);

    return isValid;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});

    if(value.trim()){
      setFormErrors({ ...formErrors, [name]: false });
    };
  };

  let iconColor = undefined;

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
  };

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
      <div className='user-edit-container'>
        <Stack spacing={1} direction='column' sx={{ width: '100%' }}>
        {
          Object.entries(user).map(([key, value]) =>
            editableFields.includes(key) && (
              <TextField 
                name={ key }
                id={ `${key}-edit` }
                label={ key.replace('_', ' ') }
                variant='outlined'
                value={ value }
                onChange={ handleChange }
                error={ formErrors[key] }
                sx={{
                  '& .MuiInputLabel-root': {
                    textTransform: 'capitalize'
                  },
                  flexGrow: 1
                }}
              />
            )
          )
        }
        </Stack>
      </div>
      <Stack className='button-container' spacing={0.5} direction='column'>
        <Button 
          id='save-button'
          onClick={ onSave }
          variant='contained'
          sx={{ backgroundColor: 'var(--primary-theme)' }}
        >Save</Button>
        <Button 
          id='cancel-button'
          onClick={ onCancel }
          variant='contained'
          sx={{ backgroundColor: 'var(--button-grey)' }}
        >Cancel</Button>
      </Stack>
    </div>
  )
}