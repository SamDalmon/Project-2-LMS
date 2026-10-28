import {
  RouterProvider, createBrowserRouter, createRoutesFromElements, Route
} from 'react-router-dom'
import './App.css'
import Root from './components/Root'
import SignIn from './pages/SignIn/SignIn'
import StudentSignUp from './pages/StudentSignUp/StudentSignUp'
import TeacherSignUp from './pages/TeacherSignUp/TeacherSignUp'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route path = "/sign-in" element={ <SignIn/> }/>
    <Route path = "/student-sign-up" element={ <StudentSignUp/> }/>
    <Route path = "/teacher-sign-up" element={ <TeacherSignUp/> }/>
  </Route>
))

function App() {
    return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
