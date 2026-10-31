import { useState } from 'react'
import './CourseAdd.css'
import { ControlPoint } from '@mui/icons-material'
import { DARK_TEXT } from '../../../constants'

import TeacherActions from '../TeacherActions/TeacherActions'
import CourseEdit from '../CourseEdit/CourseEdit'


export default function CourseAdd () {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div className='main-container'>
        { isEditing ?
          (
            <>
              <div className='course-edit-container'>
                <div className='edit-container'>
                  <CourseEdit />
                </div>
                <div className='actions-container'>
                  <TeacherActions 
                    isEditing={ isEditing }
                    setIsEditing={ setIsEditing }
                  />
                </div>
              </div>
            </> 
          ) : (
            <div 
              className='add-container' 
              onClick={ () => setIsEditing(true) }
            >
              <div className='content-container'>
                <ControlPoint 
                  sx={{
                    fontSize: 80,
                    color: DARK_TEXT
                  }}
                />
                <h2>Add Course</h2>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}