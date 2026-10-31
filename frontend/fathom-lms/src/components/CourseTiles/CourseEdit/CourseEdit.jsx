import './CourseEdit.css'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

export default function CourseEdit({ title = '', description = '' }) {
  const [ titleState, setTitle ] = useState(title)
  const [ descriptionState, setDescription ] = useState(description)
  
  return (
    <>
      <div className='edit-container'>
        <TextField 
          id='title-edit'
          label='Edit Title'
          variant='outlined'
          value={ titleState }
          onChange={ (event) => setTitle(event.target.value)}
          sx={{
            width: '100%',
            '& fieldset': {
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px'
            }
          }}
        />
        <TextField
          id='description-edit'
          label='Edit Description'
          variant='outlined'
          value={ descriptionState }
          onChange={ (event) => setDescription(event.target.value) }
          sx={{
            width: '100%',
            '& fieldset': {
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px'
            }
          }}
        />
      </div>
    </>
  )
}