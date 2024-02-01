import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {
  const {user} = useContext(UserContext);
  if(!user) return <div>Please Login</div>
  return (
    <div>Profile: {user}</div>
  )
}

export default Profile