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
  const [ signedIn, setSignedIn ] = useState(false)

  return (<>
    <Header user={user} signedIn={signedIn} setSignedIn={setSignedIn}/>
    <main>
      <Outlet context={{ role: user.role, signedIn, setSignedIn }}/>
    </main>
  </>)
}