import { useState } from 'react'
import './CourseTile.css'
import Stack from '@mui/material/Stack'
import CourseInfo from '../CourseInfo/CourseInfo'
import StudentActions from '../StudentActions/StudentActions'
import TeacherActions from '../TeacherActions/TeacherActions'
import CourseEdit from '../CourseEdit/CourseEdit'

export default function CourseTile({ role, title='', description='' }){
  const [isEditing, setIsEditing] = useState(false)
  const canEdit = ['teacher', 'admin'].includes(role)
  
  return (
    <>
      <div className='course-tile'>
        { (canEdit && isEditing) ?
          <CourseEdit
              title={ title }
              description={ description }
              isEditing={ isEditing }
              setIsEditing={ setIsEditing }
          /> : 
          <>
            <CourseInfo
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
              { canEdit ?
                <TeacherActions 
                  isEditing={ isEditing } 
                  setIsEditing={ setIsEditing }
                  handleSubmit={ null }
                  handleCancel={ null }
                /> :
                <StudentActions />
                
              }
            </Stack>
          </>
        }
      </div>
    </>
        
  )
}