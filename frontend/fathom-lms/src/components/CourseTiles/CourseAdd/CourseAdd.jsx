import styles from './CourseAdd.module.css'
import { ControlPoint } from '@mui/icons-material'
import { DARK_TEXT } from '../../../constants'

import CourseEdit from '../CourseEdit/CourseEdit'


export default function CourseAdd ({
  dummyCourse, isEditing, setEditingId, handleCourseAdd
}) {

  const setIsEditing = (active=true) => {
    setEditingId( active ? dummyCourse.id : null )
  }

  return (
    <>
      <div className={ styles.mainContainer } is-editing={ isEditing.toString() } aria-label='Add Course'>
        { isEditing ?
          (
            <div>
              <CourseEdit 
                initialCourse={{ title: '', description: '' }}
                isEditing={ isEditing }
                setIsEditing={ setIsEditing }
                handleCourseChange={ handleCourseAdd }
              />
            </div> 
          ) : (
            <div 
              className={ styles.addContainer } 
              onClick={ () => setIsEditing(true) }
            >
              <div className={ styles.contentContainer }>
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