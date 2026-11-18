import './Courses.css'
import { useState, useEffect, useMemo } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CourseTile from '../../components/CourseTiles/CourseTile/CourseTile';
import CourseAdd from '../../components/CourseTiles/CourseAdd/CourseAdd';
import DualSwitch from '../../components/DualSwitch';
import { useAuth } from '../../context/AuthContext';
import { coursesApi } from '../../api/coursesApi';
import { isRequestCanceled } from '../../api/apiClient';

export default function Courses () {
  const { user } = useAuth()
  const role = user.role
  const canAddEdit = user.permissions.includes('course_create') && user.permissions.includes('course_update')
  const canEnroll = user.permissions.includes('course_enroll') && user.permissions.includes('course_un-enroll')
  const [dualSwitchAlignment, setDualSwitchAlignment] = useState('left')
  const [editingId, setEditingId] = useState()
  const [allCourses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const PLACEHOLDER_ID = -1;

  const filterEnrolled = dualSwitchAlignment === 'right'

  const displayCourses = useMemo(() => {
    return filterEnrolled ? allCourses.filter((course) => course.is_enrolled) : allCourses
  }, [allCourses, filterEnrolled])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCourses() {
      setLoading(true)
      setError(null)

      try {
        const data = await coursesApi.getAllCourses(controller.signal)
        setCourses(data)

      } catch (err) {
        if (!isRequestCanceled(err)) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      } 
    }
  
    fetchCourses()

    return () => controller.abort()
  }, [])

  const handleCourseUpdate = ( updatedCourse ) => {
    setCourses(( prevCourses ) => {
      console.log(updatedCourse)
      return prevCourses.map((course) => {
        return course.id === updatedCourse.id ? updatedCourse : course
      })
    })
  }

  const handleCourseAdd = ( newCourse ) => {
    setCourses([...allCourses, newCourse])
  }

  if(loading) return <h2>Loading Courses...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <>
      { role === 'student' &&  
        <DualSwitch 
          alignment={ dualSwitchAlignment } setAlignment={ setDualSwitchAlignment }
          textLeft='All Courses' colorLeft={ 'var(--primary-theme)' } 
          textRight='Enrolled Courses' colorRight={ 'var(--secondary-theme)' }
        /> 
      }
      <MainLayout content={ 
          <div className='courses'>
            {
              canAddEdit && (
                <CourseAdd 
                  dummyCourse={{ id: PLACEHOLDER_ID, title: '', description: '' }}
                  isEditing={ editingId === PLACEHOLDER_ID }
                  setEditingId={ setEditingId }
                  handleCourseAdd={ handleCourseAdd }
                />
              )
            }
            {
              displayCourses.map((course) => (
                <CourseTile 
                  key={ course.id }
                  course={ course }
                  canEdit={ canAddEdit }
                  canEnroll = { canEnroll }
                  isEditing={ editingId === course.id }
                  setEditingId={ setEditingId }
                  handleCourseUpdate={ handleCourseUpdate }
                />
              ))
            }
          </div>
      }/>
    </>
  )
}