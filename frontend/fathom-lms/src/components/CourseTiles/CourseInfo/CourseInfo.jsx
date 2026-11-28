import styles from './CourseInfo.module.css'

export default function CourseInfo({ title, description }) {

  return (
    <>
      <div className={ styles.infoContainer }> 
        <h3>{ title }</h3>
        <p>{ description }</p>
      </div>
    </>
  )
}