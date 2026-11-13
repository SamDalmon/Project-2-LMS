import './Courses.css'
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CourseTile from '../../components/CourseTiles/CourseTile/CourseTile';
import CourseAdd from '../../components/CourseTiles/CourseAdd/CourseAdd';
import DualSwitch from '../../components/DualSwitch';
import { useAuth } from '../../context/AuthContext';

export default function Courses () {
  const { user } = useAuth()
  const role = user.role
  const canAddCourses = ['teacher', 'admin'].includes(role)
  const [filterEnrolled, setFilterEnrolled] = useState('left')
  const [editingId, setEditingId] = useState()

  const PLACEHOLDER_ID = -1;

  const coursesData = [
    { id: 1, title: 'Amazing Course 1', description: 'This is the first amazing course' },
    { id: 2, title: 'Amazing Course 2', description: 'This is the second amazing course' },
    { id: 3, title: 'Amazing Course 3', description: 'This is the third amazing course' },
  ]

  return (
    <>
      { role === 'student' &&  
        <DualSwitch 
          alignment={ filterEnrolled } setAlignment={ setFilterEnrolled }
          textLeft='All Courses' colorLeft={ 'var(--primary-theme)' } 
          textRight='Enrolled Courses' colorRight={ 'var(--secondary-theme)' }
        /> 
      }
      <MainLayout content={ 
          <div className='courses'>
            {
              canAddCourses && (
                <CourseAdd 
                  dummyCourse={{ id: PLACEHOLDER_ID, title: '', description: '' }}
                  isEditing={ editingId === PLACEHOLDER_ID }
                  setEditingId={ setEditingId }
                />
              )
            }
            {
              coursesData.map((course) => (
                <CourseTile 
                  key={ course.id }
                  role= { role }
                  course={ course }
                  description={ course.description }
                  isEditing={ editingId === course.id }
                  setEditingId={ setEditingId }
                />
              ))
            }
          </div>
      }/>
    </>
  )
}