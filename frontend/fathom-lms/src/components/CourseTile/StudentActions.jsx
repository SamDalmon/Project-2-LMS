import { useState } from "react"
import { PRIMARY_THEME, SECONDARY_THEME } from "../../constants"
import Button from "@mui/material/Button"

export default function StudentActions () {
  const [isEnrolled, setIsEnrolled] = useState(false)

  const buttonStyles = {
    width: '30%',
  }

  const onClick = () => { setIsEnrolled(!isEnrolled) }

  return (<>
    { isEnrolled ? 
      <Button
        id='unenroll-button'
        variant='contained'
        sx={{ ...buttonStyles, ...{ backgroundColor: SECONDARY_THEME } }}
        onClick={ onClick }
      > Unenroll </Button> :
      <Button 
        id='enroll-button'
        variant='contained'
        sx={{ ...buttonStyles, ...{ backgroundColor: PRIMARY_THEME } }}
        onClick={ onClick }
        > Enroll</Button>
      }
  </>)
}