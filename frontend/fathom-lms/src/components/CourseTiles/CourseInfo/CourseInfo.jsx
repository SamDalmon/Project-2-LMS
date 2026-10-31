import './CourseInfo.css'

export default function CourseInfo({ title, description }) {

  return (
    <>
      <div className='info-container'> 
        <h3 className='title'>{ title }</h3>
        <p className='description'>{ description }</p>
      </div>
    </>
  )
}