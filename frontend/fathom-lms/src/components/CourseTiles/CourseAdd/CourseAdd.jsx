import { useState } from 'react'
import './CourseAdd.css'
import { ControlPoint } from '@mui/icons-material'
import { DARK_TEXT } from '../../../constants'

import CourseEdit from '../CourseEdit/CourseEdit'


export default function CourseAdd () {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div className='main-container' is-editing={ isEditing.toString() }>
        { isEditing ?
          (
            <div>
              <CourseEdit 
                isEditing={ isEditing }
                setIsEditing={ setIsEditing }
              />
            </div> 
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