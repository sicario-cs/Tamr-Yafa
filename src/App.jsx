import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/home'
import { ShopPage } from './pages/ShopPage'
import { CartPage } from './pages/CartPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {
    return (
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* Placeholder routes for future static pages */}
                <Route path="/gifts" element={<HomePage />} />
                <Route path="/about" element={<HomePage />} />
                <Route path="/blog" element={<HomePage />} />
                <Route path="/contact" element={<HomePage />} />

                {/* Fallback to home for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

export default App

