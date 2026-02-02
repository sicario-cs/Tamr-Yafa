import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext.jsx';
import logoImage from '../assets/logo.jpeg';

export function Header() {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Home', page: 'home', path: '/' },
        { label: 'Shop', page: 'shop', path: '/shop' },
        { label: 'Gift Sets', page: 'gifts', path: '/gifts' },
        { label: 'About', page: 'about', path: '/about' },
        { label: 'Blog', page: 'blog', path: '/blog' },
        { label: 'Contact', page: 'contact', path: '/contact' },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#F3E9E1] border-b border-[#7A4B2A]/20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 group"
                    >
                        <img
                            src={logoImage}
                            alt="Tamr Yafa logo"
                            className="w-10 h-10 rounded-full object-cover border border-[#7A4B2A]"
                        />
                        <span className="font-heading text-[#5A2D0C] text-xl group-hover:text-[#B8860B] transition-colors">
                            Tamr Yafa
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.page}
                                type="button"
                                onClick={() => navigate(item.path)}
                                className={`font-body transition-colors ${isActive(item.path)
                                    ? 'text-[#5A2D0C]'
                                    : 'text-[#7A4B2A] hover:text-[#5A2D0C]'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/cart')}
                            className="relative p-2 text-[#7A4B2A] hover:text-[#5A2D0C] rounded-lg hover:bg-[#7A4B2A]/10 transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-[#B8860B] text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs px-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A]/10 transition-colors"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <nav className="lg:hidden py-4 border-t border-[#7A4B2A]/20" role="navigation" aria-label="Mobile menu">
                        {navItems.map((item) => (
                            <button
                                key={item.page}
                                type="button"
                                onClick={() => {
                                    navigate(item.path);
                                    setMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left py-3 px-4 font-body transition-colors ${isActive(item.path)
                                    ? 'text-[#5A2D0C] bg-[#5A2D0C]/5'
                                    : 'text-[#7A4B2A] hover:bg-[#5A2D0C]/5'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
}
