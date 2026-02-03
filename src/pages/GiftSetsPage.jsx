import React, { useState } from 'react';
import { Gift, Package, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory } from '../products-data';
import { useCart } from '../components/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function GiftSetsPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const giftProducts = getProductsByCategory('gift-sets');

  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessageEnabled, setGiftMessageEnabled] = useState(false);
  const [giftMessageText, setGiftMessageText] = useState('');

  const handleAddToCart = (product) => {
    const variant =
      giftWrap || giftMessageEnabled
        ? {
            ...(giftWrap ? { giftWrap: true } : {}),
            ...(giftMessageEnabled ? { giftMessage: true } : {}),
            ...(giftMessageEnabled && giftMessageText
              ? { giftNote: giftMessageText }
              : {}),
          }
        : undefined;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price + (giftWrap ? 5 : 0),
      image: product.image,
      variant,
    });
  };

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      {/* Hero */}
      <div className="relative h-[420px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?w=1600&q=80"
            alt="Gift sets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#5A2D0C]/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-[#F3E9E1] text-5xl mb-4">Gift Sets</h1>
          <p className="text-[#F3E9E1]/90 text-lg max-w-2xl mx-auto">
            Beautifully packaged chocolate gifts for every occasion.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Gift Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-[#B8860B]" />
            </div>
            <h3 className="font-heading text-[#5A2D0C] mb-2">Gift Wrapping</h3>
            <p className="text-[#7A4B2A]/70 text-sm">
              Add luxury gift wrap with ribbon and a custom card (+₪5)
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <input
                id="gift-wrap"
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="h-4 w-4 accent-[#7A4B2A]"
              />
              <label htmlFor="gift-wrap" className="text-sm text-[#5A2D0C] cursor-pointer">
                Add gift wrapping
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-[#7FB069]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#7FB069]" />
            </div>
            <h3 className="font-heading text-[#5A2D0C] mb-2">Personal Message</h3>
            <p className="text-[#7A4B2A]/70 text-sm">Include a handwritten note with your message</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <input
                id="gift-message"
                type="checkbox"
                checked={giftMessageEnabled}
                onChange={(e) => setGiftMessageEnabled(e.target.checked)}
                className="h-4 w-4 accent-[#7A4B2A]"
              />
              <label htmlFor="gift-message" className="text-sm text-[#5A2D0C] cursor-pointer">
                Add a message
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-[#7A4B2A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-[#7A4B2A]" />
            </div>
            <h3 className="font-heading text-[#5A2D0C] mb-2">Direct Shipping</h3>
            <p className="text-[#7A4B2A]/70 text-sm">Send directly to your recipient with a gift receipt</p>
            <p className="text-xs text-[#7FB069] mt-4">Free shipping on orders over ₪50</p>
          </div>
        </div>

        {giftMessageEnabled && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-lg p-6">
              <label htmlFor="giftMessageText" className="block text-[#5A2D0C] mb-2 font-medium">
                Gift message (optional)
              </label>
              <textarea
                id="giftMessageText"
                name="giftMessageText"
                value={giftMessageText}
                onChange={(e) => setGiftMessageText(e.target.value)}
                rows={4}
                placeholder="Write your message here…"
                className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30 resize-none"
              />
              <p className="text-xs text-[#7A4B2A]/60 mt-2">
                We’ll do our best to include it. (This message is not added to the cart automatically.)
              </p>
            </div>
          </div>
        )}

        {/* Products */}
        <div>
          <h2 className="font-heading text-[#5A2D0C] text-3xl mb-8">Our Gift Collections</h2>

          {giftProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {giftProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-[#7A4B2A]">No gift sets available at the moment.</p>
            </div>
          )}
        </div>

        {/* Corporate */}
        <div className="mt-16 bg-linear-to-r from-[#5A2D0C] to-[#7A4B2A] rounded-lg p-12 text-center">
          <h2 className="font-heading text-[#F3E9E1] text-3xl mb-4">Corporate & Bulk Gifting</h2>
          <p className="text-[#F3E9E1]/90 mb-6 max-w-2xl mx-auto">
            Need many boxes for your team or clients? We can help you build a custom selection.
          </p>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center px-8 py-3 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white rounded-md transition-colors font-medium"
          >
            Contact Us
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
