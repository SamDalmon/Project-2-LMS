import Header from "./Header/Header"
import { Outlet } from "react-router-dom"
import { useState } from "react"


export default function Root() {
  const [ user, ] = useState(
    {
      firstName:'Donald', 
      lastName: 'Truck',
      role: 'admin'
    }
  )

  return (<>
    <Header user={user}/>
    <main>
      <Outlet role={ user.role }/>
    </main>
  </>)
}