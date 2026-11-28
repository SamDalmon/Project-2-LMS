import styles from './Courses.module.css'
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
  const canAddEdit = user.permissions.includes('course_create') && user.permissions.includes('course_update')
  const canEnroll = user.permissions.includes('course_enroll') && user.permissions.includes('course_un-enroll')
  const userActive = user.status === 'ACTIVE'
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
      return prevCourses.map((course) => {
        return course.id === updatedCourse.id ? updatedCourse : course
      })
    })
  }

  const handleCourseAdd = async ( newCourse ) => {
    try {
      const addedCourse = await coursesApi.addCourse(newCourse)
      setCourses([...allCourses, addedCourse])
    } catch (error) {
      console.error(`Saving course ${JSON.stringify(newCourse)} failed for ${error}`)
    }
  }

  const handleCourseEdit = async ( editedCourse ) => {
    try {
      const course = await coursesApi.editCourse(editedCourse)
      handleCourseUpdate(course)
    } catch (error) {
      console.error(`Editing course ${JSON.stringify(editedCourse)} failed for ${error}`)
    }
  }

  const handleEnroll = async ( course ) => {
    try {
      await coursesApi.enrollInCourse(course.id)
      handleCourseUpdate({ ...course, is_enrolled: true })
    } catch {
      console.error(`Un-enrollment in course ${course.name} failed`)
    }
  } 

  const handleUnEnroll = async ( course ) => {
    try {
      await coursesApi.unEnrollInCourse(course.id)
      handleCourseUpdate({ ...course, is_enrolled: false })
    } catch {
      console.error(`Un-enrollment in course ${course.name} failed`)
    }
  }

  if(loading) return <h2>Loading Courses...</h2>
  if (error) return <h2>Error: {error}</h2>

  return (
    <>
      { canEnroll &&  
        <DualSwitch 
          alignment={ dualSwitchAlignment } setAlignment={ setDualSwitchAlignment }
          textLeft='All Courses' colorLeft={ 'var(--primary-theme)' } 
          textRight='Enrolled Courses' colorRight={ 'var(--secondary-theme)' }
        /> 
      }
      <MainLayout content={ 
          <div className={ styles.courses }>
            {
              (canAddEdit && userActive) && (
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
                  userActive = { userActive }
                  isEditing={ editingId === course.id }
                  setEditingId={ setEditingId }
                  handleCourseEdit={ handleCourseEdit }
                  handleEnroll={ handleEnroll }
                  handleUnEnroll={ handleUnEnroll }
                />
              ))
            }
          </div>
      }/>
    </>
  )
}