import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Mainroutes } from './routes/Mainroutes.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Mainroutes />
    </BrowserRouter>
  </StrictMode>
)
