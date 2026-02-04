import dubaiChocolateImage from './assets/ProductsImage/DubaiChocolate.jpeg';
import chocolateTamrImage from './assets/ProductsImage/chocolateTamr.jpeg';
import asafeeriQatayefImage from './assets/ProductsImage/qatayf.png';
import palestinianCollectionImage from './assets/ProductsImage/palestineFlage.jpeg';
import babyBoyGiftBoxImage from './assets/ProductsImage/babyBoy.jpeg';
import babyGirlGiftBoxImage from './assets/ProductsImage/babyGirl.jpeg';
import eidAlAdhaCollectionImage from './assets/ProductsImage/eidAladha.jpeg';
import graduationGiftBoxImage from './assets/ProductsImage/graduation.jpeg';
export const products = [
    {
        id: 'chocolate-dates',
        name: 'Chocolate Dates',
        price: 80,
        description: 'A premium box of chocolate-covered dates, elegantly decorated and crafted for a refined gifting experience.',
        image: chocolateTamrImage,
        category: 'dates',
        highlights: ['Gift box', 'Handcrafted', 'Elegant presentation'],
        variants: {
            sizes: ['9 pieces', '25 pieces'],
            sizePrices: {
                '9 pieces': 30,
                '25 pieces': 80,
            },
        },
        ingredients: 'Dark chocolate (cacao mass, sugar, cocoa butter), cream, sea salt, natural vanilla',
        available: true,
        featured: true,
        relatedProducts: ['Dubai Chocolate'],
    },
    {
        id: 'gift-baby-boy',
        name: 'Baby Boy Gift Box',
        price: 30,
        description: 'Blue-themed baby boy gift box with assorted chocolates, perfect for baby showers and first visits.',
        image: babyBoyGiftBoxImage,
        category: 'gift-sets',
        highlights: ['Gift box', 'Handcrafted', 'Elegant presentation'],
        variants: {
            sizes: ['9 pieces', '25 pieces'],
            sizePrices: {
                '9 pieces': 30,
                '25 pieces': 80,
            },
        },
        highlights: ['Baby boy theme', 'Assorted chocolates', 'Keepsake-style box'],
        available: true,
        featured: true,
        relatedProducts: ['gift-classics'],
    },
    {
        id: 'asafeeri-qatayef',
        name: 'Asafeeri Qatayef',
        price: 35,
        description: 'Delicate Asafeeri qatayef filled with rich, creamy filling and finished with a light touch of syrup. Soft, indulgent, and crafted to capture the authentic taste of traditional Arabic desserts.',
        image: asafeeriQatayefImage,
        category: 'desserts',
        highlights: ['Freshly made', 'Cream-filled', 'Traditional recipe'],
        ingredients: 'Flour, milk, yeast, sugar, cream filling, natural flavorings',
        nutrition: 'Per piece: 180 kcal, 9g fat, 22g carbs, 3g protein',
        available: true,
        featured: true,
        variants: {
            
            flavors: ['Chocolate', 'Dubai Chocolate', 'Cream'],
        },
        relatedProducts: ['chocolate-dates'],
    },
    {
        id: 'eid-al-adha-collection',
        name: 'Eid al-Adha Collection',
        price: 30,
        description: 'A special Eid al-Adha gift box filled with mixed chocolates and decorated in a festive Eid theme. Perfect for family visits and celebrations.',
        image: eidAlAdhaCollectionImage,
        category: 'gift-sets',
        variants: {
            sizes: ['9 pieces', '25 pieces'],
            sizePrices: {
                '9 pieces': 30,
                '25 pieces': 80,
            },
        },
        highlights: ['Eid al-Adha design', 'Mixed chocolates', 'Perfect for gifting'],
        available: true,
        relatedProducts: ['Dubai Chocolate'],
    },
    
    {
        id: 'gift-classics',
        name: 'Palestinian Collection Gift Box',
        price: 80,
        description: 'Signature Palestinian-inspired collection with chocolate-covered dates and pralines, decorated in the colors and style of Palestine.',
        image: palestinianCollectionImage,
        category: 'gift-sets',
        variants: {
            sizes: ['9 pieces', '25 pieces'],
            sizePrices: {
                '9 pieces': 30,
                '25 pieces': 80,
            },
        },
        highlights: ['Palestine design', 'Chocolate dates & pralines', 'Gift-ready box'],
        available: true,
        relatedProducts: ['gift-baby-boy', 'gift-baby-girl'],
    },
    {
        id: 'gift-baby-girl',
        name: 'Baby Girl Gift Box',
        price: 30,
        description: 'Pink-themed baby girl gift box with assorted chocolates, perfect for baby showers and first visits.',
        image: babyGirlGiftBoxImage,
        category: 'gift-sets',
        highlights: ['Gift box', 'Handcrafted', 'Elegant presentation'],
        variants: {
            sizes: ['9 pieces', '25 pieces'],
            sizePrices: {
                '9 pieces': 30,
                '25 pieces': 80,
            },
        },
        highlights: ['Baby girl theme', 'Assorted chocolates', 'Keepsake-style box'],
        available: true,
        featured: false,
        relatedProducts: ['gift-classics'],
    },
    {
        id: 'gift-graduation',
        name: 'Graduation Gift Box',
        price: 30,
        description: 'Graduation gift box with assorted chocolates, perfect for graduation ceremonies and celebrations.',
        image: graduationGiftBoxImage,
        category: 'gift-sets',
        highlights: ['Gift box', 'Handcrafted', 'Elegant presentation'],
        variants: {
            sizes: ['9 pieces', '25 pieces'],
            sizePrices: {
                '9 pieces': 30,
                '25 pieces': 80,
            },
        },
        highlights: ['Graduation theme', 'Assorted chocolates', 'Keepsake-style box'],
        available: true,
        featured: false,
        relatedProducts: ['gift-classics'],
    },
   
];

/** Filling options (Arabic: لوز، جوز عين جمل، فستق حلبي، كاجو، بندق) */
export const FILLING_OPTIONS = [
    { value: 'almond', label: 'Almond' },           // لوز
    { value: 'walnut', label: 'Walnut' },           // جوز (عين جمل)
    { value: 'pistachio', label: 'Pistachio' },      // فستق حلبي
    { value: 'cashew', label: 'Cashew' },           // كاجو
    { value: 'hazelnut', label: 'Hazelnut' },       // بندق
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
