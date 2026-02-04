import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Plus, Minus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, getRelatedProducts, FILLING_OPTIONS, CHOCOLATE_TYPE_OPTIONS } from '../products-data';
import { useCart } from '../components/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useTranslation } from 'react-i18next';

const PRODUCT_I18N_KEYS = {
  'chocolate-dates': 'products.chocolateDates',
  'gift-baby-boy': 'products.babyBoyGiftBox',
  'asafeeri-qatayef': 'products.asafeeriQatayef',
  'eid-al-adha-collection': 'products.eidAlAdhaCollection',
  'gift-classics': 'products.palestinianCollection',
  'gift-baby-girl': 'products.babyGirlGiftBox',
  'gift-graduation': 'products.graduationGiftBox',
};

export function ProductDetailPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [activeTab, setActiveTab] = useState('description');
  const { t } = useTranslation();

  const baseKey = product ? PRODUCT_I18N_KEYS[product.id] : null;
  const displayName = product && baseKey ? t(`${baseKey}.name`) : product?.name;
  const displayDescription = product && baseKey ? t(`${baseKey}.description`) : product?.description;

  const getCurrentPrice = () => {
    if (product.variants && product.variants.sizePrices && selectedVariant.size) {
      const variantPrice = product.variants.sizePrices[selectedVariant.size];
      if (typeof variantPrice === 'number') {
        return variantPrice;
      }
    }
    return product.price;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F3E9E1] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-[#5A2D0C] text-3xl mb-4">
              {t('product.notFoundTitle')}
            </h2>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              {t('product.backToShop')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: displayName,
        price: getCurrentPrice(),
        image: product.image,
        variant: Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined,
      });
    }
  };

  const tabs = [
    { id: 'description', label: t('product.tabs.description') },
    { id: 'ingredients', label: t('product.tabs.ingredients') },
    ...(product.nutrition ? [{ id: 'nutrition', label: t('product.tabs.nutrition') }] : []),
    { id: 'reviews', label: t('product.tabs.reviews') },
  ];

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#7A4B2A] hover:text-[#5A2D0C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('product.backToShop')}
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {product.cacaoPercent && (
              <span className="absolute top-4 right-4 bg-[#B8860B] text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.cacaoPercent}% Cacao
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-block mb-3 bg-[#7FB069] text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {product.category.replace('-', ' ')}
                </span>
                <h1 className="font-heading text-[#5A2D0C] text-4xl mb-2">
                  {displayName}
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-2 text-[#7A4B2A] hover:text-[#5A2D0C] rounded-lg hover:bg-[#7A4B2A]/10 transition-colors"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 text-[#7A4B2A] hover:text-[#5A2D0C] rounded-lg hover:bg-[#7A4B2A]/10 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-[#B8860B] text-[#B8860B]" />
              ))}
              <span className="text-[#7A4B2A] ml-2">(48 reviews)</span>
            </div>

            <p className="text-[#7A4B2A] text-lg mb-6">{displayDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {product.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="border border-[#7FB069] text-[#7FB069] px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="text-4xl font-heading text-[#5A2D0C] mb-6">
              ₪{getCurrentPrice()}
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-4 mb-6">
                {product.variants.sizes && (
                  <div>
                    <label htmlFor="variantSize" className="block text-[#5A2D0C] mb-2">
                      {t('product.size')}
                    </label>
                    <select
                      id="variantSize"
                      name="variantSize"
                      value={selectedVariant.size || ''}
                      onChange={(e) =>
                        setSelectedVariant({ ...selectedVariant, size: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    >
                      <option value="">{t('product.selectSize')}</option>
                      {product.variants.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {product.variants.flavors && (
                  <div>
                    <label htmlFor="variantFlavor" className="block text-[#5A2D0C] mb-2">
                      {t('product.flavor')}
                    </label>
                    <select
                      id="variantFlavor"
                      name="variantFlavor"
                      value={selectedVariant.flavor || ''}
                      onChange={(e) =>
                        setSelectedVariant({ ...selectedVariant, flavor: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    >
                      <option value="">{t('product.selectFlavor')}</option>
                      {product.variants.flavors.map((flavor) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Chocolate type – all products except Asafeeri Qatayef */}
                {product.id !== 'asafeeri-qatayef' && (
                  <div>
                    <label htmlFor="variantChocolateType" className="block text-[#5A2D0C] mb-2">
                      {t('product.chocolateType')}
                    </label>
                    <select
                      id="variantChocolateType"
                      name="variantChocolateType"
                      value={selectedVariant.chocolateType || ''}
                      onChange={(e) =>
                        setSelectedVariant({ ...selectedVariant, chocolateType: e.target.value || undefined })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    >
                      <option value="">{t('product.selectChocolateType')}</option>
                      {CHOCOLATE_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.label}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Filling – all products except Asafeeri Qatayef */}
                {product.id !== 'asafeeri-qatayef' && (
                  <div>
                    <span className="block text-[#5A2D0C] mb-2">
                      {t('product.filling')}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {FILLING_OPTIONS.map((opt) => {
                        const fillings = selectedVariant.fillings || [];
                        const checked = fillings.includes(opt.label);
                        return (
                          <label
                            key={opt.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              name="filling"
                              value={opt.value}
                              checked={checked}
                              onChange={() => {
                                const next = checked
                                  ? fillings.filter((f) => f !== opt.label)
                                  : [...fillings, opt.label];
                                setSelectedVariant({
                                  ...selectedVariant,
                                  fillings: next.length ? next : undefined,
                                });
                              }}
                              className="rounded border-[#7A4B2A]/40 text-[#7A4B2A] focus:ring-[#7A4B2A]/30"
                            />
                            <span className="text-[#5A2D0C] text-sm">{opt.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chocolate type & Filling only (when product has no other variants; not for Asafeeri Qatayef) */}
            {product.id !== 'asafeeri-qatayef' && (!product.variants || (!product.variants.sizes && !product.variants.flavors)) && (
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="variantChocolateTypeOnly" className="block text-[#5A2D0C] mb-2">
                    {t('product.chocolateType')}
                  </label>
                  <select
                    id="variantChocolateTypeOnly"
                    name="variantChocolateTypeOnly"
                    value={selectedVariant.chocolateType || ''}
                    onChange={(e) =>
                      setSelectedVariant({ ...selectedVariant, chocolateType: e.target.value || undefined })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                  >
                    <option value="">{t('product.selectChocolateType')}</option>
                    {CHOCOLATE_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="block text-[#5A2D0C] mb-2">
                    {t('product.filling')}
                  </span>
                <div className="flex flex-wrap gap-3">
                  {FILLING_OPTIONS.map((opt) => {
                    const fillings = selectedVariant.fillings || [];
                    const checked = fillings.includes(opt.label);
                    return (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="filling"
                          value={opt.value}
                          checked={checked}
                          onChange={() => {
                            const next = checked
                              ? fillings.filter((f) => f !== opt.label)
                              : [...fillings, opt.label];
                            setSelectedVariant({
                              ...selectedVariant,
                              fillings: next.length ? next : undefined,
                            });
                          }}
                          className="rounded border-[#7A4B2A]/40 text-[#7A4B2A] focus:ring-[#7A4B2A]/30"
                        />
                        <span className="text-[#5A2D0C] text-sm">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-[#5A2D0C] mb-2">
                {t('product.quantity')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 flex items-center justify-center border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-[#5A2D0C] text-xl w-12 text-center font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 flex items-center justify-center border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.available}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-colors font-medium mb-4 ${
                product.available
                  ? 'bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {product.available ? t('buttons.addToCart') : t('buttons.outOfStock')}
            </button>

            {product.available && (
              <p className="text-center text-sm text-[#7FB069]">
                {t('product.availableToShip')}
              </p>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg p-8 mb-16">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-[#7A4B2A]/20 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  activeTab === tab.id
                    ? 'bg-[#7A4B2A] text-white'
                    : 'text-[#7A4B2A] hover:bg-[#7A4B2A]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-[#7A4B2A]">
            {activeTab === 'description' && (
              <div>
                <p className="mb-4">{displayDescription}</p>
                <ul className="list-disc list-inside space-y-2">
                  {product.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                {product.ingredients ? (
                  <p>{product.ingredients}</p>
                ) : (
                  <p>{t('product.ingredientsNotAvailable')}</p>
                )}
              </div>
            )}

            {activeTab === 'nutrition' && product.nutrition && (
              <div>
                <p>{product.nutrition}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="border-b border-[#7A4B2A]/20 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
                      ))}
                    </div>
                    <span className="text-[#5A2D0C] font-medium">Sarah M.</span>
                  </div>
                  <p>{t('product.reviewsExamples.review1')}</p>
                </div>

                <div className="border-b border-[#7A4B2A]/20 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
                      ))}
                    </div>
                    <span className="text-[#5A2D0C] font-medium">James K.</span>
                  </div>
                  <p>{t('product.reviewsExamples.review2')}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-heading text-[#5A2D0C] text-3xl mb-8">
              {t('product.youMayAlsoLike')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onViewDetails={(id) => navigate(`/product/${id}`)}
                  onAddToCart={(product) =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
