import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HomePage } from './pages/home'
import { ShopPage } from './pages/ShopPage'
import { CartPage } from './pages/CartPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { GiftSetsPage } from './pages/GiftSetsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { getProductById } from './products-data'

function App() {
    const location = useLocation()

    useEffect(() => {
        const siteUrl = 'https://www.tamryafa.store'
        const pathname = location.pathname
        const defaultTitle = 'Tamr Yafa | Premium Dates & Chocolate Gifts'
        const defaultDescription =
            'Tamr Yafa offers handcrafted chocolate dates and elegant gift boxes for every occasion.'

        const routeSeo = {
            '/': {
                title: 'Tamr Yafa | Premium Dates & Chocolate Gifts',
                description:
                    'Discover handcrafted chocolate dates and premium gift boxes made for every celebration.',
            },
            '/shop': {
                title: 'Shop | Tamr Yafa',
                description:
                    'Browse Tamr Yafa products including premium dates, chocolate selections, and curated gift boxes.',
            },
            '/cart': {
                title: 'Your Cart | Tamr Yafa',
                description: 'Review your selected Tamr Yafa products before checkout.',
            },
            '/checkout': {
                title: 'Checkout | Tamr Yafa',
                description: 'Complete your order securely and enjoy premium Tamr Yafa gifts.',
            },
            '/gifts': {
                title: 'Gift Sets | Tamr Yafa',
                description:
                    'Explore beautifully designed gift sets for Ramadan, Eid, baby celebrations, and more.',
            },
            '/about': {
                title: 'About Us | Tamr Yafa',
                description: 'Learn the story behind Tamr Yafa and our handcrafted premium products.',
            },
            '/contact': {
                title: 'Contact Us | Tamr Yafa',
                description: 'Get in touch with Tamr Yafa for orders, support, and custom gift inquiries.',
            },
            '/blog': {
                title: 'Blog | Tamr Yafa',
                description: 'Read updates, gifting ideas, and product highlights from Tamr Yafa.',
            },
        }

        let title = defaultTitle
        let description = defaultDescription

        if (pathname.startsWith('/product/')) {
            const productId = pathname.replace('/product/', '')
            const product = getProductById(productId)
            const productName = product?.name || 'Product'
            title = `${productName} | Tamr Yafa`
            description =
                product?.description ||
                'View premium Tamr Yafa product details, variants, and gifting options.'
        } else if (routeSeo[pathname]) {
            title = routeSeo[pathname].title
            description = routeSeo[pathname].description
        }

        document.title = title

        let descriptionMeta = document.querySelector('meta[name="description"]')
        if (!descriptionMeta) {
            descriptionMeta = document.createElement('meta')
            descriptionMeta.setAttribute('name', 'description')
            document.head.appendChild(descriptionMeta)
        }
        descriptionMeta.setAttribute('content', description)

        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement('link')
            canonicalLink.setAttribute('rel', 'canonical')
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.setAttribute('href', `${siteUrl}${pathname}`)
    }, [location.pathname])

    return (
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                <Route path="/gifts" element={<GiftSetsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<HomePage />} />

                {/* Fallback to home for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    )
}

export default App

