import {
  RouterProvider, createBrowserRouter, createRoutesFromElements, Route,
  Navigate
} from 'react-router-dom'
import './App.css'
import Root from './components/Root'
import SignIn from './pages/SignIn/SignIn'
import StudentSignUp from './pages/StudentSignUp/StudentSignUp'
import TeacherSignUp from './pages/TeacherSignUp/TeacherSignUp'
import Courses from './pages/Courses/Courses'
import UserManagement from './pages/UserManagement/UserManagement'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route path = "/sign-in" element={ <SignIn/> }/>
    <Route path = "/student-sign-up" element={ <StudentSignUp/> }/>
    <Route path = "/teacher-sign-up" element={ <TeacherSignUp/> }/>
    <Route element = {<ProtectedRoute />}>
      <Route path = "/courses" element={ <Courses /> }/>
      <Route path = "/user-management" element={ <UserManagement/> }/>
    </Route>
    <Route path = "*" element={ <Navigate to="/sign-in" replace/> }/>
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
