import { useState } from 'react'
import { HomePage } from './pages/home'
import { ShopPage } from './pages/ShopPage'

function App() {
    const [currentPage, setCurrentPage] = useState('home')

    const handleNavigate = (page, productId) => {
        if (productId) {
            console.log(`Navigate to ${page}`, productId)
        } else {
            console.log(`Navigate to ${page}`)
        }
        setCurrentPage(page)
    }

    return (
        <div className="min-h-screen">
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'shop' && <ShopPage onNavigate={handleNavigate} />}
        </div>
    )
}

export default App

