import { useState } from 'react'
import { HomePage } from './pages/home'
import { ShopPage } from './pages/ShopPage'
import { CartPage } from './pages/CartPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [selectedProductId, setSelectedProductId] = useState(null)

    const handleNavigate = (page, productId) => {
        if (productId) {
            setSelectedProductId(productId)
        }
        setCurrentPage(page)
    }

    return (
        <div className="min-h-screen">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'shop' && <ShopPage onNavigate={handleNavigate} />}
            {currentPage === 'cart' && <CartPage onNavigate={handleNavigate} />}
            {currentPage === 'product' && <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />}
            {currentPage === 'checkout' && <CheckoutPage onNavigate={handleNavigate} />}
        </div>
    )
}

export default App

