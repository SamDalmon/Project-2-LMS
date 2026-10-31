import { PRIMARY_THEME, SECONDARY_THEME, BUTTON_GREY } from "../../constants";
import Button from '@mui/material/Button'

export default function TeacherActions({ isEditing, setIsEditing }) {
  const buttonStyles = {
    flex: 1,
    maxWidth: '30%',
  }

  const onCancel = () => setIsEditing(false)
  const onEdit = () => setIsEditing(true)

  return (
    <>
      { 
        isEditing ? (
          <>
            <Button
              id='cancel-button'
              variant='contained'
              sx={{ ...buttonStyles, ...{ backgroundColor: BUTTON_GREY } }}
              onClick={ onCancel }
            >Cancel</Button>
            <Button
              id='save-button'
              variant='contained'
              sx={{ ...buttonStyles, ...{ backgroundColor: PRIMARY_THEME } }}
              onClick={ onCancel }
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
    </>
  )
}