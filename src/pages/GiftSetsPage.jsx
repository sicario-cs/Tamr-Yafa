import React from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory, eidAlAdhaCollectionImage } from '../products-data';
import { useCart } from '../components/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';

export function GiftSetsPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const giftProducts = getProductsByCategory('gift-sets');
  const { t } = useTranslation();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      {/* Hero */}
      <div className="relative h-[420px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={eidAlAdhaCollectionImage}
            alt="Gift sets"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#5A2D0C]/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-[#F3E9E1] text-5xl mb-4">
            {t('gifts.heroTitle')}
          </h1>
          <p className="text-[#F3E9E1]/90 text-lg max-w-2xl mx-auto">
            {t('gifts.heroBody')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg p-6 mb-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-[#7A4B2A]" />
            <h3 className="font-heading text-[#5A2D0C]">
              {t('gifts.directShippingTitle')}
            </h3>
          </div>
          <p className="text-[#7A4B2A]/70 text-sm">
            {t('gifts.directShippingBody')}
          </p>
        </div>

        {/* Products */}
        <div>
          <h2 className="font-heading text-[#5A2D0C] text-3xl mb-8">
            {t('gifts.collectionsTitle')}
          </h2>

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
              <p className="text-[#7A4B2A]">
                {t('gifts.noGiftSets')}
              </p>
            </div>
          )}
        </div>

        {/* Corporate */}
        <div className="mt-16 bg-linear-to-r from-[#5A2D0C] to-[#7A4B2A] rounded-lg p-12 text-center">
          <h2 className="font-heading text-[#F3E9E1] text-3xl mb-4">
            {t('gifts.corporateTitle')}
          </h2>
          <p className="text-[#F3E9E1]/90 mb-6 max-w-2xl mx-auto">
            {t('gifts.corporateBody')}
          </p>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center px-8 py-3 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white rounded-md transition-colors font-medium"
          >
            {t('buttons.contactUs')}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
