import { PRIMARY_THEME, SECONDARY_THEME } from "../../../constants"
import Button from "@mui/material/Button"
import { coursesApi } from "../../../api/coursesApi"

export default function StudentActions ({ course, handleCourseUpdate }) {
  
  const buttonStyles = {
    width: '30%',
    minWidth: 'max-content'
  }

  const onClick = async () => { 
    if (course.is_enrolled) {
      try {
        await coursesApi.unEnrollInCourse(course.id)
        handleCourseUpdate({ ...course, is_enrolled: false })
      } catch {
        console.log(`Un-enrollment in course ${course.name} failed`)
      }
    } else {
      try {
        await coursesApi.enrollInCourse(course.id)
        handleCourseUpdate({ ...course, is_enrolled: true })
      } catch {
        console.log(`Un-enrollment in course ${course.name} failed`)
      }
    }
  }

  return (<>
    { course.is_enrolled ? 
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