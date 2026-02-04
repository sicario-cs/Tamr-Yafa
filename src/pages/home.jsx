import React, { useState } from 'react';
import { Leaf, Award, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../components/CartContext.jsx';
import { getFeaturedProducts } from '../products-data.js';
import homePageImage from '../assets/HomePageImage.png';
import chocolateTamrImage from '../assets/ProductsImage/chocolateTamr.jpeg';
import palestinianCollectionImage from '../assets/ProductsImage/palestineFlage.jpeg';
export function HomePage() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
        setNewsletterEmail('');
    };

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="relative h-[600px] md:h-[700px] flex items-center">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={chocolateTamrImage}
                        alt="Artisan chocolates"
                        className="w-full h-full object-cover lg:w-[115%] lg:h-[115%] lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-[#5A2D0C]/90 to-[#5A2D0C]/40" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="font-heading text-[#F3E9E1] text-5xl md:text-6xl lg:text-7xl mb-6">
                            Taste the Story
                        </h1>
                        <p className="text-[#F3E9E1] text-xl md:text-2xl mb-4">
                            Handcrafted Dates Stuffed with Nuts & Chocolate
                        </p>
                        <p className="text-[#F3E9E1]/90 text-lg mb-8">
                            Dates stuffed with nuts, covered in chocolate, and beautifully wrapped for every occasion.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate('/shop')}
                            className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            Shop Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#7FB069]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#7FB069]">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <h3 className="font-heading text-[#5A2D0C] mb-2">Sustainably Sourced</h3>
                            <p className="text-[#7A4B2A]/70">
                                We work directly with cacao farmers to ensure fair trade and quality.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#B8860B]">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="font-heading text-[#5A2D0C] mb-2">Award-Winning Quality</h3>
                            <p className="text-[#7A4B2A]/70">
                                Recognized internationally for our exceptional craft and flavor.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-[#7A4B2A]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#7A4B2A]">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="font-heading text-[#5A2D0C] mb-2">Handcrafted with Love</h3>
                            <p className="text-[#7A4B2A]/70">
                                Every piece is carefully made by our master chocolatiers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-[#F3E9E1]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-[#5A2D0C] text-4xl mb-4">
                            Our Signature Collection
                        </h2>
                        <p className="text-[#7A4B2A] text-lg max-w-2xl mx-auto">
                            Discover our most beloved creations, each one a testament to quality and craftsmanship.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {getFeaturedProducts().map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetails={(id) => navigate(`/product/${id}`)}
                                    onAddToCart={handleAddToCart}
                                />
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/shop')}
                            className="py-3 px-6 border-2 border-[#7A4B2A] text-[#7A4B2A] rounded-lg hover:bg-[#7A4B2A] hover:text-white font-medium transition-colors"
                        >
                            View All Products
                        </button>
                    </div>
                </div>
            </section>

            {/* Collections Banner */}
            <section className="py-20 bg-linear-to-r from-[#5A2D0C] to-[#7A4B2A]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-heading text-[#F3E9E1] text-4xl mb-4">
                                Perfect Gifts for Every Occasion
                            </h2>
                            <p className="text-[#F3E9E1]/90 text-lg mb-6">
                                Our beautifully curated gift sets are perfect for celebrations, thank you gifts, or simply treating someone special.
                            </p>
                            <button
                            type="button"
                            onClick={() => navigate('/gifts')}
                                className="inline-flex items-center gap-2 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                            >
                                Explore Gift Sets
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden">
                            <img
                                src={palestinianCollectionImage}
                                alt="palestinian Collection Gift Box"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-2xl text-center">
                    <h2 className="font-heading text-[#5A2D0C] text-4xl mb-4">
                        Join Our Chocolate Journey
                    </h2>
                    <p className="text-[#7A4B2A] mb-8">
                        Subscribe to get recipes, pairing tips, and exclusive offers delivered to your inbox.
                    </p>

                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                        <input
                            id="newsletterEmail"
                            name="newsletterEmail"
                            type="email"
                            placeholder="Enter your email"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                            className="flex-1 py-3 px-4 rounded-lg bg-[#F3E9E1] border border-[#7A4B2A]/20 text-[#5A2D0C] placeholder-[#7A4B2A]/50 outline-none focus:ring-2 focus:ring-[#7A4B2A]/30"
                        />
                        <button
                            type="submit"
                            className="py-3 px-6 bg-[#7A4B2A] hover:bg-[#5A2D0C] text-white font-medium rounded-lg transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
