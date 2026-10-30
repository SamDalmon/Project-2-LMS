import { BUTTON_GREY, PRIMARY_THEME } from '../../constants'
import './CourseTile.css'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function CourseTile({ title, description }){
  let isEditing = true;
  
  const buttonStyles = {
    flex: 1,
    maxWidth: '30%',
  }
  
  return (
    <>
      <div className='course-tile'>  
        <div className='info-container'>
          <h3 className='title'>{ title }</h3>
          <p className='description'>{ description }</p>
        </div>
        <Stack 
          direction='row' 
          spacing={1}  
          sx={{ 
            width: '100%',
            justifyContent: 'flex-end'
           }}
        >
          { 
            isEditing && 
            <Button 
              id='enroll-button'
              variant='contained'
              sx={{ ...buttonStyles, ...{ backgroundColor: BUTTON_GREY }}}
            >Cancel</Button>
          }
          <Button 
            id='enroll-button'
            variant='contained'
            sx={{ ...buttonStyles, ...{ backgroundColor: PRIMARY_THEME }}}
          >Save</Button>
        </Stack>
      </div>
    </>
  )
}