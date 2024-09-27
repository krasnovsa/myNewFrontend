import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем стили Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Импорт JS для виджетов Bootstrap

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
