import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShippingInfoDialog } from './ShippingInfoDialog.jsx';
import { useTranslation } from 'react-i18next';

export function Footer() {
    const navigate = useNavigate();
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    const addressLines = t('footer.address').split('\\n');

    return (
        <footer className="bg-[#5A2D0C] text-[#F3E9E1] mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-heading text-[#B8860B] mb-4">
                            {t('footer.aboutTitle')}
                        </h3>
                        <p className="text-[#F3E9E1]/80 text-sm mb-4">
                            {t('footer.aboutBody')}
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
                        <h4 className="font-heading text-[#B8860B] mb-4">
                            {t('footer.shopTitle')}
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => navigate('/shop')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                {t('footer.allProducts')}
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
                                    {t('footer.giftSets')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-heading text-[#B8860B] mb-4">
                            {t('footer.companyTitle')}
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => navigate('/about')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    {t('footer.aboutUs')}
                                </button>
                            </li>
                            
                            <li>
                                <button
                                    type="button"
                                    onClick={() => navigate('/contact')}
                                    className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm"
                                >
                                    {t('footer.contact')}
                                </button>
                            </li>
                            <li>
                                <button type="button" className="text-[#F3E9E1]/80 hover:text-[#B8860B] transition-colors text-sm">
                                    {t('footer.wholesale')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-[#B8860B] mb-4">
                            {t('footer.contactTitle')}
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-[#F3E9E1]/80">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>
                                    {addressLines.map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[#F3E9E1]/80">
                                <Phone className="w-4 h-4 shrink-0" />
                                <span>{t('footer.phone')}</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm text-[#F3E9E1]/80">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span>{t('footer.email')}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#F3E9E1]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#F3E9E1]/60 text-sm">
                        {t('footer.rights', { year })}
                    </p>
                    <div className="flex gap-6 text-sm text-[#F3E9E1]/60">
                        <button type="button" className="hover:text-[#B8860B] transition-colors">
                            {t('footer.privacy')}
                        </button>
                        <button type="button" className="hover:text-[#B8860B] transition-colors">
                            {t('footer.terms')}
                        </button>
                        <button
                            type="button"
                            className="hover:text-[#B8860B] transition-colors"
                            onClick={() => setIsShippingOpen(true)}
                        >
                            {t('footer.shippingInfo')}
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
