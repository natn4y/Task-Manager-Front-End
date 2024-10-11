import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext.tsx'
import { TaskProvider } from './contexts/TaskContext.tsx'
import { ModalsProvider } from './contexts/ModalsContext.tsx'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes.tsx'
import Header from './components/Header/index.tsx'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalsProvider>
          <TaskProvider>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Header />
            <AppRoutes />
          </TaskProvider>
        </ModalsProvider>
      </AuthProvider>,
    </BrowserRouter>
  </StrictMode>,
)
