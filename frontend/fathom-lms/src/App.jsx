import {
  RouterProvider, createBrowserRouter, createRoutesFromElements, Route
} from 'react-router-dom'
import './App.css'
import Root from './components/Root'
import SignIn from './components/SignIn'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>
    <Route path = "/sign-in" element={ <SignIn/> }/>
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
