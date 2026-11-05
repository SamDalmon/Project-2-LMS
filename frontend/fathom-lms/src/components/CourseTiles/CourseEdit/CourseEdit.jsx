import './CourseEdit.css'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import TeacherActions from '../TeacherActions/TeacherActions'

export default function CourseEdit({ title='', description='', isEditing, setIsEditing }) {

  const [courseInfo, setCourseInfo] = useState({ title, description })
  
  const [formErrors, setFormErrors] = useState({ title: false, description: false })
    
  const handleSubmit = () => {
    if( validateForm() ){
      setCourseInfo({ title, description })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setCourseInfo({ title, description })
    setIsEditing(false)
  }
  
  const validateForm = () => {
    var isValid = true
    const currentErrors = {}

    for( const [field, value] of Object.entries(courseInfo)) {
      if( !value.trim() ){ 
        currentErrors[field] = true
        isValid = false
      }
    }
  
    setFormErrors(currentErrors)

    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCourseInfo({ ...courseInfo, [name]: value })

    if(value.trim()){
      setFormErrors({ ...formErrors, [name]: false })
    }
  }

  return (
    <div className='course-edit-container'>
      <div className='edit-container'>
        <TextField 
          name='title'
          id='title-edit'
          label='Edit Title'
          variant='outlined'
          value={ courseInfo.title }
          onChange={ handleChange }
          error={ formErrors.title }
          sx={{
            width: '100%',
            '& fieldset': {
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px'
            }
          }}
        />
        <TextField
          name='description'
          id='description-edit'
          label='Edit Description'
          variant='outlined'
          value={ courseInfo.description }
          onChange={ handleChange }
          error={ formErrors.description }
          sx={{
            width: '100%',
            '& fieldset': {
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px'
            }
          }}
        />
        <TeacherActions 
          isEditing={ isEditing } 
          setIsEditing={ setIsEditing }
          handleSubmit={ handleSubmit }
          handleCancel={ handleCancel }
        />
      </div>
    </div>
  )
}