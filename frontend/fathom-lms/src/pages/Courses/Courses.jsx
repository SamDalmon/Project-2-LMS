import './Courses.css'
import MainLayout from "../../layouts/MainLayout/MainLayout";
import CourseTile from "../../components/CourseTile/CourseTile";

export default function Courses () {
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
              coursesData.map((course) => (
                <CourseTile 
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