import dubaiChocolateImage from './assets/ProductsImage/DubaiChocolate.jpeg';
import chocolateTamrImage from './assets/ProductsImage/chocolateTamr.jpeg';
import asafeeriQatayefImage from './assets/ProductsImage/qatayf.png';

export const products = [
    {
        id: 'chocolate-dates',
        name: 'Chocolate Dates',
        price: 24,
        description: 'A premium box of chocolate-covered dates, elegantly decorated and crafted for a refined gifting experience.',
        image: chocolateTamrImage,
        category: 'truffles',
        highlights: ['25 pieces', 'Handcrafted', 'Elegant gift box'],
        ingredients: 'Dark chocolate (cacao mass, sugar, cocoa butter), cream, sea salt, natural vanilla',
        inStock: true,
        featured: true,
        relatedProducts: ['Dubai Chocolate'],
    },
    {
        id: 'Dubai Chocolate',
        name: 'Dubai Chocolate',
        price: 7,
        description: 'A rich and indulgent chocolate experience with a bold yet balanced character. Smooth, refined, and crafted with attention to detail, Dubai Chocolate reflects luxury, quality, and a distinctive taste.',
        image: dubaiChocolateImage,
        category: 'pieces',
        cacaoPercent: 70,
        highlights: ['70% pistachio', 'Minimal sugar', 'Gluten-free'],
        ingredients: 'Cacao mass, cane sugar, cocoa butter, soy lecithin, natural vanilla',
        nutrition: 'Per 30g: 170 kcal, 12g fat, 14g carbs, 2g protein',
        inStock: true,
        featured: true,
        variants: { sizes: ['60g', '100g'] },
        relatedProducts: ['bar-85-percent', 'chocolate-dates'],
    },
    {
        id: 'asafeeri-qatayef',
        name: 'Asafeeri Qatayef',
        price: 8,
        description: 'Delicate Asafeeri qatayef filled with rich, creamy filling and finished with a light touch of syrup. Soft, indulgent, and crafted to capture the authentic taste of traditional Arabic desserts.',
        image: asafeeriQatayefImage,
        category: 'desserts',
        highlights: ['Freshly made', 'Cream-filled', 'Traditional recipe'],
        ingredients: 'Flour, milk, yeast, sugar, cream filling, natural flavorings',
        nutrition: 'Per piece: 180 kcal, 9g fat, 22g carbs, 3g protein',
        inStock: true,
        featured: true,
        variants: { sizes: ['6 pieces', '12 pieces'] },
        relatedProducts: ['chocolate-dates'],
    },
    {
        id: 'bar-85-percent',
        name: '85% Intense Dark Bar',
        price: 8,
        description: 'For true dark chocolate lovers. Intense, bold, and beautifully bitter with subtle fruit notes.',
        image: 'https://images.unsplash.com/photo-1646168932800-e48f378d37bb?w=1080&q=80',
        category: 'bars',
        cacaoPercent: 85,
        highlights: ['85% cacao', 'Vegan', 'No refined sugar'],
        ingredients: 'Cacao mass, coconut sugar, cocoa butter',
        nutrition: 'Per 30g: 180 kcal, 14g fat, 10g carbs, 3g protein',
        inStock: true,
        variants: { sizes: ['60g', '100g'] },
        relatedProducts: ['Dubai Chocolate'],
    },
    {
        id: 'truffle-milk-1',
        name: 'Creamy Milk Chocolate Truffles',
        price: 22,
        description: 'Smooth and velvety milk chocolate truffles with a hint of Madagascar vanilla.',
        image: 'https://images.unsplash.com/photo-1715663760594-5250f3261fb7?w=1080&q=80',
        category: 'truffles',
        highlights: ['38% cacao', 'Madagascar vanilla', 'Box of 12'],
        inStock: true,
        relatedProducts: ['chocolate-dates'],
    },
    {
        id: 'bar-milk-caramel',
        name: 'Milk Chocolate with Sea Salt Caramel',
        price: 8,
        description: 'Creamy milk chocolate infused with ribbons of salted caramel.',
        image: 'https://images.unsplash.com/photo-1646168932800-e48f378d37bb?w=1080&q=80',
        category: 'bars',
        cacaoPercent: 38,
        highlights: ['Salted caramel', 'Creamy texture', 'Award-winning'],
        inStock: true,
        relatedProducts: ['Dubai Chocolate'],
    },
    {
        id: 'gift-classics',
        name: 'Classic Collection Gift Box',
        price: 35,
        description: 'A curated selection of our signature bars and truffles. Perfect introduction to Tamr Yafa.',
        image: 'https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?w=1080&q=80',
        category: 'gift-sets',
        highlights: ['8 pieces', 'Variety of flavors', 'Beautiful packaging'],
        inStock: true,
        relatedProducts: ['gift-premium'],
    },
    {
        id: 'gift-premium',
        name: 'Premium Artisan Collection',
        price: 65,
        description: 'Our finest chocolates in an exquisite presentation box. Includes rare single-origin varieties.',
        image: 'https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?w=1080&q=80',
        category: 'gift-sets',
        highlights: ['16 pieces', 'Premium selection', 'Luxury packaging', 'Tasting guide included'],
        inStock: true,
        featured: false,
        relatedProducts: ['gift-classics'],
    },
    {
        id: 'seasonal-valentine',
        name: "Valentine's Heart Box",
        price: 38,
        description: 'Heart-shaped box filled with romantic chocolate truffles and pralines.',
        image: 'https://images.unsplash.com/photo-1629610306962-a8aa73153d0e?w=1080&q=80',
        category: 'seasonal',
        highlights: ['Limited edition', 'Heart-shaped box', '10 pieces'],
        inStock: true,
        relatedProducts: ['gift-classics'],
    },
];

export function getProductById(id) {
    return products.find((p) => p.id === id);
}

export function getRelatedProducts(productId) {
    const product = getProductById(productId);
    if (!product || !product.relatedProducts) return [];
    return product.relatedProducts
        .map((id) => getProductById(id))
        .filter((p) => p != null);
}

export function getFeaturedProducts() {
    return products.filter((p) => p.featured);
}

export function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
}
