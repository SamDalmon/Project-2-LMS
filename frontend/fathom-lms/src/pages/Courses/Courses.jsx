import './Courses.css'
import { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CourseTile from '../../components/CourseTiles/CourseTile/CourseTile';
import CourseAdd from '../../components/CourseTiles/CourseAdd/CourseAdd';
import DualSwitch from '../../components/DualSwitch';
import { useAuth } from '../../context/AuthContext';
import { coursesApi } from '../../api/coursesApi';

export default function Courses () {
  const { user } = useAuth()
  const role = user.role
  const canAddCourses = user.permissions.includes('course_create')
  const [filterEnrolled, setFilterEnrolled] = useState('left')
  const [editingId, setEditingId] = useState()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const PLACEHOLDER_ID = -1;

  /*const coursesData = [
    { id: 1, title: 'Amazing Course 1', description: 'This is the first amazing course' },
    { id: 2, title: 'Amazing Course 2', description: 'This is the second amazing course' },
    { id: 3, title: 'Amazing Course 3', description: 'This is the third amazing course' },
  ]*/

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCourses() {
      try {
        const response = await coursesApi.getAllCourses(controller.signal)

        if (!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        setCourses(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()


    return () => controller.abort()
  }, [])

  if(loading) return <h2>Loading Courses...</h2>
  if (error) return <h2>Error: {error}</h2>


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
              courses.map((course) => (
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