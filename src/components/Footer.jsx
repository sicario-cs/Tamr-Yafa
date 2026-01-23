import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer({ onNavigate }) {
    return (
        <footer className="bg-[#5A2D0C] text-[#F3E9E1] mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-heading text-[#B8860B] mb-4">Tamr Yafa</h3>
                        <p className="text-[#F3E9E1]/80 text-sm mb-4">
                            Handcrafted bean-to-bar chocolates made with single-origin cacao. Crafted with passion, wrapped with love.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-[#F3E9E1]/60 hover:text-[#B8860B] transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/tamr.yafa.online/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#F3E9E1]/60 hover:text-[#B8860B] transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-[#F3E9E1]/60 hover:text-[#B8860B] transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-heading text-[#B8860B] mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('shop')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    All Products
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('shop')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    Chocolate Bars
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('shop')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    Truffles
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('gifts')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    Gift Sets
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-heading text-[#B8860B] mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('about')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('blog')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    Blog & Recipes
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => onNavigate?.('contact')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    Contact
                                </button>
                            </li>
                            <li>
                                <button type="button" className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm">
                                    Wholesale
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-[#B8860B] mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-[#F3E9E1]/80">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>123 Chocolate Lane<br />Portland, OR 97209</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[#F3E9E1]/80">
                                <Phone className="w-4 h-4 shrink-0" />
                                <span>(503) 555-CHOC</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[#F3E9E1]/80">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span>hello@aurorachocolates.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#F3E9E1]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#F3E9E1]/60 text-sm">
                        © {new Date().getFullYear()} Tamr Yafa. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-[#F3E9E1]/60">
                        <button type="button" className="hover:text-[#B8860B] transition-colors">Privacy Policy</button>
                        <button type="button" className="hover:text-[#B8860B] transition-colors">Terms of Service</button>
                        <button type="button" className="hover:text-[#B8860B] transition-colors">Shipping Info</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
