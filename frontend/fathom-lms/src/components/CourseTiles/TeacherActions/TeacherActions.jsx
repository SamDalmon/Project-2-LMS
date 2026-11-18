import './TeacherActions.css'
import { PRIMARY_THEME, SECONDARY_THEME, BUTTON_GREY } from "../../../constants";
import Button from '@mui/material/Button'
import { coursesApi } from '../../../api/coursesApi';

export default function TeacherActions({ 
  course, isEditing, setIsEditing, handleSubmit, handleCancel 
}) {
  const buttonStyles = {
    flex: 1,
    maxWidth: '30%',
    minWidth: 'max-content'
  }

  const onEdit = () => setIsEditing(true)

  const handleSave = async () => {
    try {
      const savedCourse = await coursesApi.addCourse(course)
      handleSubmit(savedCourse)
    } catch (error) {
      console.log(`Saving course ${course} failed for ${error}`)
    }
  }

  return (
    <>
      <div className='actions-container'>
        { 
          isEditing ? (
            <>
              <Button
                id='cancel-button'
                variant='contained'
                sx={{ ...buttonStyles, ...{ backgroundColor: BUTTON_GREY } }}
                onClick={ handleCancel }
              >Cancel</Button>
              <Button
                id='save-button'
                variant='contained'
                sx={{ ...buttonStyles, ...{ backgroundColor: PRIMARY_THEME } }}
                onClick={ handleSave }
              >Save</Button>
            </>
          ) : (
            <Button
              id='edit-button'
              variant='contained'
              sx={{ ...buttonStyles, ...{ backgroundColor: SECONDARY_THEME } }}
              onClick={ onEdit }
            >Edit</Button>
          )
        }
      </div>
    </>
  )
}