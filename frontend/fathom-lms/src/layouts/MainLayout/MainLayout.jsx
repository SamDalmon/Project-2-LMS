import './MainLayout.css'

export default function MainLayout ({content}) {
  return (
    <div className='main-layout'>
      <div className='main-layout-container'>
        { content }
      </div>
    </div>
  )
}