import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/notfound' element={<NotFound/>} />
        </Route>
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
