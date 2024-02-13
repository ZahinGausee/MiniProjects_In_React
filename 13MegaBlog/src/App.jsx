import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { Header, Footer } from './components'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData)  {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header />
          <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='min-h-screen text-3xl text-center flex align-middle bg-slate-800 text-white justify-center'>
      <div className='flex items-center'>
        Loading...
      </div>
    </div>
  );
}

export default App
