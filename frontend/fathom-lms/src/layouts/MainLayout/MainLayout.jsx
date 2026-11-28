import styles from './MainLayout.module.css'

export default function MainLayout ({content}) {
  return (
    <div className={ styles.mainLayout }>
      <div className={ styles.mainLayoutContainer }>
        { content }
      </div>
    </div>
  )
}