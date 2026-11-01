import './Courses.css'
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CourseTile from '../../components/CourseTiles/CourseTile/CourseTile';
import CourseAdd from '../../components/CourseTiles/CourseAdd/CourseAdd';

export default function Courses ({ role }) {
  const canAddCourses = ['teacher', 'admin'].includes(role)

  const coursesData = [
    { title: 'Amazing Course 1', description: 'This is the first amazing course' },
    { title: 'Amazing Course 2', description: 'This is the second amazing course' },
    { title: 'Amazing Course 3', description: 'This is the third amazing course' },

  ]
  
  return (
    <>
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