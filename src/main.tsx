import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/index.css'
import { ThemeProvider } from '@providers/ThemeProvider'
import { App } from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider>
    <App/>
    </ThemeProvider>
  </StrictMode>,
)
