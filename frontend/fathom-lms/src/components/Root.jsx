import Header from "./Header/Header"
import { Outlet } from "react-router-dom"
import { useState } from "react"


export default function Root() {
  const [ signedIn, setSignedIn ] = useState(false)

  return (<>
    <Header signedIn={signedIn} setSignedIn={setSignedIn}/>
    <main>
      <Outlet context={{ signedIn, setSignedIn }}/>
    </main>
  </>)
}