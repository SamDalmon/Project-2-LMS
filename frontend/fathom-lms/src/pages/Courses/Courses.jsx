import './Courses.css'
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CourseTile from '../../components/CourseTiles/CourseTile/CourseTile';
import CourseAdd from '../../components/CourseTiles/CourseAdd/CourseAdd';
import DualSwitch from '../../components/DualSwitch';
import { useOutletContext } from 'react-router-dom';

export default function Courses () {
  const { role } = useOutletContext()
  const canAddCourses = ['teacher', 'admin'].includes(role)
  const [filterEnrolled, setFilterEnrolled] = useState('left')


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
        <>
          
          <div className='courses'>
            {
              canAddCourses && (
                <CourseAdd role={ role }/>
              )
            }
            {
              coursesData.map((course) => (
                <CourseTile 
                  key={ course.id }
                  role={ role }
                  title={ course.title } 
                  description={ course.description }
                />
              ))
            }
          </div>
        </>
      }/>
    </>
  )
}