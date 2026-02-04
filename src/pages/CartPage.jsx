import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';

const GIFT_WRAP_FEE = 5;

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, orderGiftOptions, setOrderGiftOptions } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const subtotal = getCartTotal();
  const shipping = 20;
  const giftWrapFee = orderGiftOptions.giftWrap ? GIFT_WRAP_FEE : 0;
  const total = subtotal + shipping + giftWrapFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F3E9E1] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="w-24 h-24 text-[#7A4B2A]/30 mx-auto mb-6" />
            <h2 className="font-heading text-[#5A2D0C] text-3xl mb-4">
              {t('cart.emptyTitle')}
            </h2>
            <p className="text-[#7A4B2A] mb-8">
              {t('cart.emptyBody')}
            </p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              {t('buttons.startShopping')}
            </button>
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
      <div className="bg-[#5A2D0C] py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-[#F3E9E1] text-4xl mb-2">
            {t('cart.headerTitle')}
          </h1>
          <p className="text-[#F3E9E1]/80">
            {t('cart.itemsCount', {
              count: cart.length,
              itemLabel: cart.length === 1 ? t('cart.item') : t('cart.items'),
            })}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => {
              const itemKey = `${item.id}-${JSON.stringify(item.variant || {})}-${index}`;
              return (
                <div key={itemKey} className="bg-white rounded-lg p-4 md:p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-[#F3E9E1]">
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
                      <h3 className="font-heading text-[#5A2D0C] mb-1">
                        {item.name}
                      </h3>
                      {item.variant && (
                        <p className="text-sm text-[#7A4B2A]/60 mb-2">
                          {[
                            item.variant.size && `Size: ${item.variant.size}`,
                            item.variant.flavor && `Flavor: ${item.variant.flavor}`,
                            item.variant.chocolateType && `Chocolate: ${item.variant.chocolateType}`,
                            item.variant.fillings?.length && `Filling: ${item.variant.fillings.join(', ')}`,
                            item.variant.giftWrap && 'Gift wrapping',
                            item.variant.giftMessage && 'Personal message',
                            item.variant.giftNote && `Note: ${item.variant.giftNote}`,
                          ]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                      <p className="text-[#5A2D0C] font-medium">₪{item.price}</p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.variant)}
                        className="p-2 text-[#7A4B2A] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.variant)
                          }
                          className="h-8 w-8 flex items-center justify-center border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-[#5A2D0C] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.variant)
                          }
                          className="h-8 w-8 flex items-center justify-center border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="font-heading text-[#5A2D0C] text-2xl mb-6">
                {t('cart.orderSummary')}
              </h2>

              <div className="space-y-3 mb-6">
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

              {/* Gift options */}
              <div className="mb-6 pt-4 border-t border-[#7A4B2A]/20">
                <h3 className="font-heading text-[#5A2D0C] text-lg mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  {t('cart.giftOptions')}
                </h3>
                <label className="flex items-center gap-2 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={orderGiftOptions.giftWrap}
                    onChange={(e) =>
                      setOrderGiftOptions((prev) => ({ ...prev, giftWrap: e.target.checked }))
                    }
                    className="rounded border-[#7A4B2A]/40 text-[#7A4B2A] focus:ring-[#7A4B2A]/30"
                  />
                  <span className="text-[#5A2D0C]">Gift wrapping</span>
                  <span className="text-[#7A4B2A]/70 text-sm">(+₪{GIFT_WRAP_FEE})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={orderGiftOptions.giftMessage}
                    onChange={(e) =>
                      setOrderGiftOptions((prev) => ({ ...prev, giftMessage: e.target.checked }))
                    }
                    className="rounded border-[#7A4B2A]/40 text-[#7A4B2A] focus:ring-[#7A4B2A]/30"
                  />
                  <span className="text-[#5A2D0C]">
                    {t('cart.addPersonalMessage')}
                  </span>
                </label>
                {orderGiftOptions.giftMessage && (
                  <textarea
                    id="giftNote"
                    name="giftNote"
                    value={orderGiftOptions.giftNote}
                    onChange={(e) =>
                      setOrderGiftOptions((prev) => ({ ...prev, giftNote: e.target.value }))
                    }
                    placeholder={t('cart.giftNotePlaceholder')}
                    rows={3}
                    className="w-full mt-2 px-3 py-2 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30 resize-none text-sm"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-3 rounded-lg transition-colors font-medium mb-4"
              >
                {t('buttons.proceedToCheckout')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="w-full py-3 px-6 border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors font-medium"
              >
                {t('buttons.continueShopping')}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#7A4B2A]/20">
                <div className="space-y-2 text-sm text-[#7A4B2A]/70">
                  <p>{t('cart.trust.secureCheckout')}</p>
                  <p>{t('cart.trust.fastDelivery')}</p>
                  <p>{t('cart.trust.satisfaction')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
