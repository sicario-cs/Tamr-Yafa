import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import App from './App.jsx'
import { CartProvider } from './components/CartContext.jsx'
import './i18n'
import { LanguageProvider } from './components/LanguageProvider.jsx'

createRoot(document.getElementById('app')).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
            </CartProvider>
        </BrowserRouter>
    </StrictMode>,
)

