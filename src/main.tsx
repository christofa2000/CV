
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from './ThemeContext.tsx';
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// Emotion cache estable para evitar recalcular/inyectar estilos dinámicamente
const emotionCache = createCache({ key: 'mui', prepend: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <CustomThemeProvider>
        <CssBaseline />
        <App />
      </CustomThemeProvider>
    </CacheProvider>
  </React.StrictMode>,
)
