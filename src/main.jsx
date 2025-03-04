import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import Teacher from './pages/Teacher.jsx'
import Student from './pages/Student.jsx'
import Course from './pages/Course.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<Dashboard />} />  {/* Default child route */}
          <Route path='teacher' element={<Teacher />} />
          <Route path='student' element={<Student />} />
          <Route path='course' element={<Course />} />
        </Route>
          <Route path='*' element={<NotFound />} /> {/* Catch-all inside App */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
