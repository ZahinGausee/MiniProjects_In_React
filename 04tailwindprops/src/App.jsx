import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl font-bold underline bg-green-500 text-gray-600 mb-5">
      Tailwind CSS
    </h1>
    <Card product="Apple iPhone 15"/>
    </>
  )
}

export default App
