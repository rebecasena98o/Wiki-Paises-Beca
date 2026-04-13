import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/StyleGlobal.css' // Importe o global aqui para testar

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,  
)