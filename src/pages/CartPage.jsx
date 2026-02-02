import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(getCartTotal() * 0.1);
    } else if (promoCode.toUpperCase() === 'AURORA15') {
      setDiscount(getCartTotal() * 0.15);
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = getCartTotal();
  const shipping = 8;
  const total = subtotal + shipping - discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F3E9E1] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="w-24 h-24 text-[#7A4B2A]/30 mx-auto mb-6" />
            <h2 className="font-heading text-[#5A2D0C] text-3xl mb-4">Your Cart is Empty</h2>
            <p className="text-[#7A4B2A] mb-8">
              Looks like you haven't added any chocolates to your cart yet.
            </p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Start Shopping
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
          <h1 className="font-heading text-[#F3E9E1] text-4xl mb-2">Shopping Cart</h1>
          <p className="text-[#F3E9E1]/80">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
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
                          {item.variant.size && `Size: ${item.variant.size}`}
                          {item.variant.size && item.variant.flavor && ' • '}
                          {item.variant.flavor && `Flavor: ${item.variant.flavor}`}
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
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[#7A4B2A]">
                  <span>Subtotal</span>
                  <span>₪{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#7A4B2A]">
                  <span>Shipping</span>
                  <span>₪{shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#7FB069]">
                    <span>Discount</span>
                    <span>-₪{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-[#7A4B2A]/20 pt-3 flex justify-between">
                  <span className="font-heading text-[#5A2D0C]">Total</span>
                  <span className="font-heading text-[#5A2D0C] text-xl">
                    ₪{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label htmlFor="promoCode" className="block text-[#5A2D0C] text-sm mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promoCode"
                    name="promoCode"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors font-medium"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-[#7A4B2A]/60 mt-2">
                  Try: WELCOME10 or AURORA15
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-3 rounded-lg transition-colors font-medium mb-4"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="w-full py-3 px-6 border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors font-medium"
              >
                Continue Shopping
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#7A4B2A]/20">
                <div className="space-y-2 text-sm text-[#7A4B2A]/70">
                  <p>✓ Secure Checkout</p>
                  <p>✓ Fast Delivery</p>
                  <p>✓ 100% Satisfaction Guarantee</p>
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
