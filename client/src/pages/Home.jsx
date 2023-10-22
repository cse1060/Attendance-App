import React from 'react'
import Cookies from 'js-cookie'

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => { const user = Cookies.get("token"); console.log(user) }}>getUser</button>
      <button onClick={() => { Cookies.remove("token") ;Cookies.remove("verifyToken") }}>Logout</button>
    </div>
  )
}
