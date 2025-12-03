import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import GlobalProvider from './context/globalcontext'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </GlobalProvider>
  </BrowserRouter>
)
