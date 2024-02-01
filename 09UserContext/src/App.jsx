import { useState } from 'react'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvide from './context/UserContextProvide'

function App() {

  return (
    <UserContextProvide>
    <div className='bg-slate-700 text-white p-10 min-h-screen align-middle text-center'>
      <h1 className='text-center'>User || Profile</h1>
      <Login />
      <Profile />
    </div>
    </UserContextProvide>
  )
}

export default App
