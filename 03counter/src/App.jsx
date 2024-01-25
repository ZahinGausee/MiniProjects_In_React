import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // const count = 0;

  function handleClicked () {
    setCount(count + 1);
  }

  return (
    <>
      <h1>The useState Hook</h1>
      <p>The Hooks are very Usefull feature of react.</p>
      <p>The usestate is to update the ui everytime,see when the user clicked the button, the count is updating everytime..{count}</p>
      <p>For Example: This is the Counter variable, which is updated everywhere {count}</p>
      <button onClick={handleClicked}>Count {count}</button>
      <br />
      <button onClick={handleClicked}>Click Me also {count}</button>
      <footer>footer : Counter {count}</footer>
    </>
  )
}

export default App
