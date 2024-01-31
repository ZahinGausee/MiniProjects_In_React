import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home, About, Contact, User, Github, githubInfoLoader} from './components'
import Layout from './Layout.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//  const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: "", 
//         element: <Home />
//       },
//       {
//         path: "about", 
//         element: <About />
//       },
//       {
//         path: "contact", 
//         element: <Contact />
//       },
//     ]
//   } 
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
        loader={githubInfoLoader}
        path='github' 
        element={<Github />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
