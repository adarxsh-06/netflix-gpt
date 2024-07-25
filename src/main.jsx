import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Browse from './components/Browse'

const appRouter=createBrowserRouter([
  {
      path: "/",
      element: <Login/>,
  },
  {
      path: "/browse",
      element: <Browse/>,
  }

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RouterProvider>
  
)
