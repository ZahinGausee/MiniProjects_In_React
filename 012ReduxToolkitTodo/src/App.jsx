import { useState } from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
function App() {

  return (
    <>
    <h1 className='text-center m-5'>Learn React Redux Toolkit </h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App
