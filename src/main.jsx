import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { CartProvider } from './components/CartContext.jsx'

createRoot(document.getElementById('app')).render(
    <StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </StrictMode>,
)

