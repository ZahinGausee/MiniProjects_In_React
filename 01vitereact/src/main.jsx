import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const anotherElement = (
  <a href="https://google.com" target="_blank">Click me to visit google</a>
)

const innerText = "Click me to visit the source code."

const reactELement = React.createElement(
  'a',
  {
    href: "https://github.com/facebook/react/tree/main",
    target: "_blank"
  },
  innerText //if there is any expressions then it's like {if} in object it's not valid.
)

ReactDOM.createRoot(document.getElementById('root')).render(
    reactELement
)
