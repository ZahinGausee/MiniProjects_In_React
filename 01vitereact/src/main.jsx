import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const anotherElement = (
  <a href="https://google.com" target="_blank">Click me to visit google</a>
)

const anotherUserName = "Chai aur react!"

const reactELement = React.createElement(
  'a',
  {
    href: 'https://google.com',
    target: "_blank"
  },
  anotherUserName //if there is any expressions then it's like {if} in object it's not valid.
)


ReactDOM.createRoot(document.getElementById('root')).render(
    reactELement
)
