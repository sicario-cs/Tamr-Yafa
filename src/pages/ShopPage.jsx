import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../products-data';
import { useCart } from '../components/CartContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function ShopPage({ onNavigate }) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [cacaoFilter, setCacaoFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Cacao % filter
    if (cacaoFilter !== 'all') {
      if (cacaoFilter === 'dark' && (!product.cacaoPercent || product.cacaoPercent < 60)) {
        return false;
      }
      if (cacaoFilter === 'milk' && product.cacaoPercent && product.cacaoPercent >= 60) {
        return false;
      }
    }

    return true;
  });

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 100]);
    setCacaoFilter('all');
  };

  return (
    <div className="min-h-screen bg-[#F3E9E1]">
      <Header onNavigate={onNavigate} currentPage="shop" />
      
      {/* Header */}
      <div className="bg-[#5A2D0C] py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-[#F3E9E1] text-5xl mb-4">Shop All Chocolates</h1>
          <p className="text-[#F3E9E1]/80 text-lg max-w-2xl">
            Explore our complete collection of handcrafted chocolates, from bold dark bars to elegant truffles.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="lg:hidden mb-4">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors font-medium"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            <div className={`bg-white rounded-lg p-6 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div>
                <h3 className="font-heading text-[#5A2D0C] mb-4">Category</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Products' },
                    { value: 'bars', label: 'Chocolate Bars' },
                    { value: 'truffles', label: 'Truffles' },
                    { value: 'gift-sets', label: 'Gift Sets' },
                    { value: 'seasonal', label: 'Seasonal' },
                  ].map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-[#7A4B2A] text-white'
                          : 'text-[#7A4B2A] hover:bg-[#7A4B2A]/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#7A4B2A]/20 pt-6">
                <h3 className="font-heading text-[#5A2D0C] mb-4">Cacao %</h3>
                <select
                  value={cacaoFilter}
                  onChange={(e) => setCacaoFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                >
                  <option value="all">All Types</option>
                  <option value="dark">Dark (60%+)</option>
                  <option value="milk">Milk (below 60%)</option>
                </select>
              </div>

              <div className="border-t border-[#7A4B2A]/20 pt-6">
                <h3 className="font-heading text-[#5A2D0C] mb-4">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-[#F3E9E1] rounded-lg appearance-none cursor-pointer accent-[#7A4B2A]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="flex-1 px-2 py-1 rounded bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="flex-1 px-2 py-1 rounded bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="w-full py-2 px-4 border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#7A4B2A]">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(id) => onNavigate('product', id)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-[#7A4B2A] mb-4">No products match your filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
