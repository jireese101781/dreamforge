import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './coverCropper.js'
import './coverDisplayFix.js'
import './characterSystem.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
