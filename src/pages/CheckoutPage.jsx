import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';

// Shop owner WhatsApp number (with country code, no + or spaces).
const SHOP_WHATSAPP_NUMBER = '972599987735';
const GIFT_WRAP_FEE = 5;

export function CheckoutPage() {
  const { cart, getCartTotal, clearCart, orderGiftOptions } = useCart();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatItemVariant = (variant) => {
    if (!variant) return '';
    const parts = [
      variant.size && `${t('product.size')}: ${variant.size}`,
      variant.flavor && `${t('product.flavor')}: ${variant.flavor}`,
      variant.chocolateType && `${t('product.chocolateType')}: ${variant.chocolateType}`,
      variant.fillings?.length && `${t('product.filling')}: ${variant.fillings.join(', ')}`,
    ].filter(Boolean);
    return parts.length ? ` (${parts.join(', ')})` : '';
  };

  const buildWhatsAppOrderMessage = () => {
    const subtotal = getCartTotal();
    const shipping = 20;
    const giftWrapFee = orderGiftOptions.giftWrap ? GIFT_WRAP_FEE : 0;
    const total = subtotal + shipping + giftWrapFee;
    const lines = [
      '🛒 *New Order - Tamr Yafa*',
      '',
      '📋 *Customer:*',
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email || '—'}`,
      `Address: ${formData.address}, ${formData.city}`,
      formData.notes ? `Notes: ${formData.notes}` : null,
      formData.notes ? '' : null,
      '📦 *Items:*',
      ...cart.map(
        (item) =>
          `• ${item.name}${formatItemVariant(item.variant)} x${item.quantity} — ₪${(
            item.price * item.quantity
          ).toFixed(2)}`
      ),
      '',
      `💰 Subtotal: ₪${subtotal.toFixed(2)}`,
      `🚚 Shipping: ₪${shipping.toFixed(2)}`,
      ...(giftWrapFee > 0 ? [`🎁 Gift wrapping: ₪${giftWrapFee.toFixed(2)}`] : []),
      `💵 *Total: ₪${total.toFixed(2)}*`,
      ...(orderGiftOptions.giftMessage
        ? ['', '💌 *Gift message:*', orderGiftOptions.giftNote || '(no text)']
        : []),
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = buildWhatsAppOrderMessage();
    const whatsappUrl = `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setOrderComplete(true);
    clearCart();
  };

  const subtotal = getCartTotal();
  const shipping = 20;
  const giftWrapFee = orderGiftOptions.giftWrap ? GIFT_WRAP_FEE : 0;
  const total = subtotal + shipping + giftWrapFee;

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[#F3E9E1] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-[#5A2D0C] text-3xl mb-4">
              {t('checkout.emptyTitle')}
            </h2>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              {t('buttons.continueShopping')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F3E9E1] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-lg p-12">
              <div className="w-20 h-20 bg-[#7FB069] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-[#5A2D0C] text-3xl mb-4">
                {t('checkout.orderConfirmedTitle')}
              </h2>
              <p className="text-[#7A4B2A] mb-2">
                {t('checkout.orderConfirmedBody')}
              </p>
              <p className="text-[#7A4B2A]/70 text-sm mb-8">
                {t('checkout.orderNumber', { number: Math.floor(Math.random() * 100000) })}
              </p>
              <p className="text-[#7A4B2A] mb-6">
                {t('checkout.whatsappInstructions')}
              </p>
              {formData.email && (
                <p className="text-[#7A4B2A] mb-6 text-sm">
                  {/* This sentence remains in English; can be localized later if needed */}
                  A copy will be sent to <strong>{formData.email}</strong> when available.
                </p>
              )}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  {t('buttons.backToHome')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="w-full border-2 border-[#7A4B2A] text-[#7A4B2A] hover:bg-[#7A4B2A] hover:text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  {t('buttons.continueShopping')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      {/* Header */}
      <div className="bg-[#5A2D0C] py-8">
        <div className="container mx-auto px-4">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-[#F3E9E1] hover:text-[#B8860B] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('buttons.backToCart')}
          </button>
          <h1 className="font-heading text-[#F3E9E1] text-4xl">
            {t('checkout.title')}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-heading text-[#5A2D0C] text-2xl mb-6">
                  {t('checkout.contactInformation')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-[#5A2D0C] mb-2">
                      {t('checkout.emailOptional')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-[#5A2D0C] mb-2">
                      {t('checkout.phoneNumber')}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t('checkout.phonePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-heading text-[#5A2D0C] text-2xl mb-6">
                  {t('checkout.shippingAddress')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[#5A2D0C] mb-2">
                      {t('checkout.firstName')}
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[#5A2D0C] mb-2">
                      {t('checkout.lastName')}
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-[#5A2D0C] mb-2">
                      {t('checkout.address')}
                    </label>
                    <input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder={t('checkout.addressPlaceholder')}
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="city" className="block text-[#5A2D0C] mb-2">
                      {t('checkout.city')}
                    </label>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="font-heading text-[#5A2D0C] text-2xl mb-6">
                  {t('checkout.orderNotes')}
                </h2>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t('checkout.orderNotesPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-4 rounded-lg transition-colors font-medium"
              >
                <Lock className="w-4 h-4" />
                {t('checkout.sendOrderWhatsApp', { total: total.toFixed(2) })}
              </button>

              <p className="text-xs text-center text-[#7A4B2A]/60">
                {t('checkout.whatsappNote')}
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="font-heading text-[#5A2D0C] text-2xl mb-6">
                {t('checkout.orderSummary')}
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-[#F3E9E1] rounded shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#5A2D0C] truncate">{item.name}</p>
                      {item.variant && (
                        <p className="text-[11px] text-[#7A4B2A]/60 truncate">
                          {[
                            item.variant.size && `Size: ${item.variant.size}`,
                            item.variant.flavor && `Flavor: ${item.variant.flavor}`,
                            item.variant.chocolateType && `Chocolate: ${item.variant.chocolateType}`,
                            item.variant.fillings?.length && `Filling: ${item.variant.fillings.join(', ')}`,
                          ]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                      <p className="text-xs text-[#7A4B2A]/60">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-[#5A2D0C] font-medium">
                      ₪{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#7A4B2A]/20 pt-4 space-y-3">
                <div className="flex justify-between text-[#7A4B2A]">
                  <span>{t('cart.subtotal')}</span>
                  <span>₪{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#7A4B2A]">
                  <span>{t('cart.shipping')}</span>
                  <span>₪{shipping.toFixed(2)}</span>
                </div>
                {giftWrapFee > 0 && (
                  <div className="flex justify-between text-[#7A4B2A]">
                    <span>{t('cart.giftWrapping')}</span>
                    <span>₪{giftWrapFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-[#7A4B2A]/20 pt-3 flex justify-between">
                  <span className="font-heading text-[#5A2D0C]">
                    {t('cart.total')}
                  </span>
                  <span className="font-heading text-[#5A2D0C] text-xl">
                    ₪{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#7A4B2A]/20">
                <div className="flex items-center gap-2 text-sm text-[#7FB069] mb-2">
                  <Lock className="w-4 h-4" />
                  <span>{t('checkout.cashOnDelivery')}</span>
                </div>
                <p className="text-xs text-[#7A4B2A]/60">
                  {t('checkout.cashOnDeliveryNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
