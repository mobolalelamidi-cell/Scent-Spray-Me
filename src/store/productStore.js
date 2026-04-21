import { create } from 'zustand';

const productImageModules = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

const productImages = Object.entries(productImageModules).reduce((images, [path, asset]) => {
  const filename = path.split('/').pop()?.toLowerCase() ?? '';

  if (!filename) {
    return images;
  }

  images[filename] = asset;
  return images;
}, {});

const findProductImage = (matches) => {
  const filenames = Object.keys(productImages);
  const matchedFile = filenames.find((filename) =>
    matches.some((match) => filename.includes(match.toLowerCase())),
  );

  return matchedFile ? productImages[matchedFile] : '';
};

const createProduct = ({
  id,
  name,
  price,
  imageMatches,
  category,
  volume,
  description,
  rating,
  type = 'Eau de Parfum',
  topNotes,
  heartNotes,
  baseNotes,
  featured = false,
  bestSeller = false,
  seasonal = false,
  homepageRank = 99,
}) => ({
  id,
  name,
  price,
  image: findProductImage(imageMatches),
  category,
  volume,
  description,
  rating,
  type,
  topNotes,
  heartNotes,
  baseNotes,
  featured,
  bestSeller,
  seasonal,
  homepageRank,
});

// Mock products data - replace with API call later
const mockProducts = [
  createProduct({
    id: 1,
    name: 'Armaf Club De Nuit Intense Man',
    price: 89.99,
    imageMatches: ['armaf club de nuit', 'unleash raw confidence'],
    category: 'men',
    volume: '105ml',
    description: 'A confident citrus-woody scent with smoky depth and strong evening presence.',
    rating: 4.8,
    topNotes: 'Lemon, pineapple, bergamot, black currant',
    heartNotes: 'Birch, jasmine, rose',
    baseNotes: 'Musk, ambergris, patchouli, vanilla',
    bestSeller: true,
    homepageRank: 3,
  }),
  createProduct({
    id: 2,
    name: 'YSL Myslf',
    price: 96.99,
    imageMatches: ['ysl myslf', 'bold, sleek, and undeniably masculine'],
    category: 'men',
    volume: '100ml',
    description: 'Clean orange blossom and woods for a polished, modern signature scent.',
    rating: 4.7,
    topNotes: 'Calabrian bergamot',
    heartNotes: 'Orange blossom absolute',
    baseNotes: 'Ambrofix, patchouli',
    featured: true,
    homepageRank: 4,
  }),
  createProduct({
    id: 3,
    name: 'Valentino Uomo Born In Roma Intense',
    price: 102.99,
    imageMatches: ['valentino uomo born in', 'dark_ powerful. addictive. valentino uomo born in'],
    category: 'men',
    volume: '100ml',
    description: 'Dark vanilla, mineral salt and vetiver blended into an addictive statement fragrance.',
    rating: 4.9,
    topNotes: 'Vanilla infusion',
    heartNotes: 'Lavandin',
    baseNotes: 'Smoked vetiver',
    featured: true,
    bestSeller: true,
    homepageRank: 1,
  }),
  createProduct({
    id: 4,
    name: 'Versace Pour Homme',
    price: 84.99,
    imageMatches: ['versace pour homme', 'fashionvenusdeals'],
    category: 'men',
    volume: '100ml',
    description: 'Fresh Mediterranean citrus with neroli and soft woods for everyday wear.',
    rating: 4.6,
    type: 'Eau de Toilette',
    topNotes: 'Lemon, bergamot, neroli, rose de mai',
    heartNotes: 'Hyacinth, cedar, clary sage, geranium',
    baseNotes: 'Tonka bean, musk, amber',
    bestSeller: true,
    homepageRank: 5,
  }),
  createProduct({
    id: 5,
    name: 'Valentino Uomo Intense',
    price: 109.99,
    imageMatches: ['valentino uomo intense'],
    category: 'men',
    volume: '100ml',
    description: 'Powdery iris, leather and tonka bean with a richer, dressier finish.',
    rating: 4.8,
    topNotes: 'Clary sage, mandarin',
    heartNotes: 'Iris, tonka bean',
    baseNotes: 'Black leather, vanilla',
    featured: true,
    homepageRank: 2,
  }),
  createProduct({
    id: 6,
    name: 'Bleu de Chanel',
    price: 118.99,
    imageMatches: ['bleu de chanel'],
    category: 'men',
    volume: '100ml',
    description: 'Crisp citrus and incense over a smooth woody base for a timeless blue fragrance.',
    rating: 4.9,
    type: 'Eau de Parfum',
    topNotes: 'Grapefruit, lemon, mint, pink pepper',
    heartNotes: 'Ginger, nutmeg, jasmine',
    baseNotes: 'Incense, cedar, sandalwood, patchouli',
    featured: true,
    bestSeller: true,
    homepageRank: 6,
  }),
  createProduct({
    id: 7,
    name: 'Afnan 9 PM',
    price: 72.99,
    imageMatches: ['afnan 9 pm', 'make a statement with afnan 9 pm'],
    category: 'men',
    volume: '100ml',
    description: 'A sweet-spicy club scent with apple, cinnamon and warm vanilla projection.',
    rating: 4.6,
    topNotes: 'Apple, cinnamon, wild lavender, bergamot',
    heartNotes: 'Orange blossom, lily of the valley',
    baseNotes: 'Vanilla, tonka bean, amber, patchouli',
    bestSeller: true,
    homepageRank: 8,
  }),
  createProduct({
    id: 8,
    name: 'Lattafa Musamam White Intense',
    price: 78.99,
    imageMatches: ['musamam white intense', 'o musamam white intense'],
    category: 'unisex',
    volume: '100ml',
    description: 'Creamy woods and musks wrapped in a soft spicy freshness with niche-style character.',
    rating: 4.5,
    type: 'Eau de Parfum',
    topNotes: 'Bergamot, orange, spices',
    heartNotes: 'Coconut, ylang-ylang, ambroxan, mahonial',
    baseNotes: 'Sandalwood, musk, benzoin',
    featured: true,
    homepageRank: 7,
  }),
  createProduct({
    id: 9,
    name: 'Giorgio Armani My Way',
    price: 112.99,
    imageMatches: ['my way by giorgio armani', 'my way'],
    category: 'women',
    volume: '90ml',
    description: 'Bright white florals and creamy vanilla create a feminine, elegant signature trail.',
    rating: 4.8,
    type: 'Eau de Parfum',
    topNotes: 'Bergamot, orange blossom',
    heartNotes: 'Tuberose, Indian jasmine',
    baseNotes: 'Madagascar vanilla, white musk, cedarwood',
    featured: true,
    bestSeller: true,
    homepageRank: 9,
  }),
  createProduct({
    id: 10,
    name: 'Rose de Mai & Jasmin',
    price: 94.99,
    imageMatches: ['rosa de mayo y jazmin', 'rosa de mayo'],
    category: 'women',
    volume: '90ml',
    description: 'A luminous floral blend centered on rose de mai and jasmine with a soft, elegant trail.',
    rating: 4.7,
    type: 'Eau de Parfum',
    topNotes: 'Pear, bergamot, pink pepper',
    heartNotes: 'Rose de mai, jasmine sambac, peony',
    baseNotes: 'White musk, cashmere wood, vanilla',
    featured: true,
    homepageRank: 10,
  }),
  createProduct({
    id: 11,
    name: 'Iris & Rose Atelier',
    price: 98.99,
    imageMatches: ['@irisandrosescent', 'scent of the'],
    category: 'women',
    volume: '100ml',
    description: 'A polished powdery floral with velvety iris, fresh rose petals and a soft musky finish.',
    rating: 4.6,
    type: 'Eau de Parfum',
    topNotes: 'Mandarin, pink berries',
    heartNotes: 'Iris, Turkish rose, violet',
    baseNotes: 'Musk, cedarwood, benzoin',
    featured: true,
    homepageRank: 11,
  }),
  createProduct({
    id: 12,
    name: 'Autumn Amber Edit',
    price: 79.99,
    imageMatches: ['los 20 mejores perfumes', '2020 is feeling like the year'],
    category: 'unisex',
    volume: '90ml',
    description: 'A warm editorial pick for cooler days with amber spice, soft woods and an easy unisex profile.',
    rating: 4.5,
    type: 'Eau de Parfum',
    topNotes: 'Cardamom, saffron, bergamot',
    heartNotes: 'Amber accord, lavender, suede',
    baseNotes: 'Vanilla, musk, dry cedar',
    seasonal: true,
    homepageRank: 12,
  }),
];

export const useProductStore = create((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
  filters: {
    category: 'all',
    priceRange: [0, 150],
    search: '',
  },

  setProducts: (products) => set({ products }),

  setFilters: (newFilters) => {
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
      const filtered = state.products.filter((product) => {
        const matchesCategory =
          filters.category === 'all' || product.category === filters.category;
        const matchesPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];
        const matchesSearch =
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.search.toLowerCase());

        return matchesCategory && matchesPrice && matchesSearch;
      });

      return {
        filters,
        filteredProducts: filtered,
      };
    });
  },

  getProductById: (id) => {
    return get().products.find((product) => product.id === parseInt(id, 10));
  },
}));
