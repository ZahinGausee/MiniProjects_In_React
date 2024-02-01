import React, {useContext, useState} from 'react'
import UserContext from '../context/UserContext';


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {setUser} = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    setUser((username + ' ' + password));
  }

  return (
    <div>
      <h2>Login</h2>
      <input
      className='bg-slate-900 text-white'
        type="text" 
        value={username}
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}/>
      {" "}
      <input 
      className='bg-slate-900 text-white'
        type="text" 
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={(e) =>handleSubmit(e)}>Submit</button>
    </div>
  )
}

export default Login