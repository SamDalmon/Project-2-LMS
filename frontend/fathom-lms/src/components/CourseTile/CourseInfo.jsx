import { useState } from 'react' 
import './CourseInfo.css'
import TextField from "@mui/material/TextField"

export default function CourseInfo({ role, isEditing, title, description }) {
  const [titleState, setTitle] = useState(title)
  const [descriptionState, setDescription] = useState(description)


  return (
    <>
      <div className='info-container'> {
        (role === 'teacher' && isEditing) ? (
          <>
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
                '& fieldset': {
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '0px'
                }
              }}
            />
          </>
          
        ) : (
          <>
            <h3 className='title'>{ title }</h3>
            <p className='description'>{ description }</p>
          </>
        )
      } </div>
    </>
  )
}