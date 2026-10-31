import { useState } from 'react'
import './CourseTile.css'
import Stack from '@mui/material/Stack'
import CourseInfo from './CourseInfo'
import StudentActions from './StudentActions'
import TeacherActions from './TeacherActions'

export default function CourseTile({ role, title, description }){
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <>
      <div className='course-tile'>
        <CourseInfo
          role={ role }
          isEditing={ isEditing }
          title={ title }
          description={ description }
        />  
        <Stack 
          direction='row' 
          spacing={1}  
          sx={{ 
            width: '100%',
            justifyContent: 'flex-end'
           }}
        >
          {
            role === 'teacher' ?
            <TeacherActions isEditing={ isEditing } setIsEditing={ setIsEditing }/> :
            <StudentActions />
          }
        </Stack>
      </div>
    </>
  )
}