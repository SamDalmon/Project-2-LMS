import './CourseTile.css'
import Stack from '@mui/material/Stack'
import CourseInfo from '../CourseInfo/CourseInfo'
import StudentActions from '../StudentActions/StudentActions'
import TeacherActions from '../TeacherActions/TeacherActions'
import CourseEdit from '../CourseEdit/CourseEdit'

export default function CourseTile({ 
  course, canEdit, canEnroll, userActive, isEditing, setEditingId, handleCourseUpdate 
}){

  const setIsEditing = (active=true) => {
    setEditingId( active ? course.id : null )
  }
  
  return (
    <>
      <div className='course-tile'>
        { (canEdit && isEditing) ?
          <CourseEdit
              course={ course }
              isEditing={ isEditing }
              setIsEditing={ setIsEditing }
          /> : 
          <>
            <CourseInfo
              title={ course.title }
              description={ course.description }
            /> 
            <Stack 
              direction='row' 
              spacing={1}  
              sx={{ 
                width: '100%',
                justifyContent: 'flex-end'
              }}
            >
              { (canEdit && userActive) &&
                <TeacherActions 
                  isEditing={ isEditing } 
                  setIsEditing={ setIsEditing }
                  handleSubmit={ null }
                  handleCancel={ null }
                />
              }
              { (canEnroll && (userActive || course.is_enrolled)) &&
                <StudentActions 
                  course={ course }
                  handleCourseUpdate={ handleCourseUpdate }
                />
              }
            </Stack>
          </>
        }
      </div>
    </>
        
  )
}