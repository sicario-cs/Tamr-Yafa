import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShippingInfoDialog } from './ShippingInfoDialog.jsx';

export function Footer() {
    const navigate = useNavigate();
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    return (
        <footer className="bg-[#5A2D0C] text-[#F3E9E1] mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-heading text-[#B8860B] mb-4">Tamr Yafa</h3>
                        <p className="text-[#F3E9E1]/80 text-sm mb-4">
                            Dates stuffed with nuts and covered in chocolate. Designed with decorations and colors suited for all occasions.
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
                                    onClick={() => navigate('/shop')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    All Products
                                </button>
                            </li>
                            
                            <li>
                               
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => navigate('/gifts')}
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
                                    onClick={() => navigate('/about')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    About Us
                                </button>
                            </li>
                            
                            <li>
                                <button
                                    type="button"
                                    onClick={() => navigate('/contact')}
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
                                <span>west bank<br />Ramallah, Al Bireh
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[#F3E9E1]/80">
                                <Phone className="w-4 h-4 shrink-0" />
                                <span>(+970) ##########</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[#F3E9E1]/80">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span>yafatamr@gmail.com</span>
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
                        <button
                            type="button"
                            className="hover:text-[#B8860B] transition-colors"
                            onClick={() => setIsShippingOpen(true)}
                        >
                            Shipping Info
                        </button>
                    </div>
                </div>

                <ShippingInfoDialog
                    isOpen={isShippingOpen}
                    onClose={() => setIsShippingOpen(false)}
                />
            </div>
        </footer>
    );
}
