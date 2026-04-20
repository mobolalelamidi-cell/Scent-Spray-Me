import { create } from 'zustand';

// Mock products data - replace with API call later
const mockProducts = [
  {
    id: 1,
    name: 'Elegance Noir',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500',
    category: 'women',
    volume: '100ml',
    description: 'A sophisticated blend of vanilla and amber.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    price: 75.99,
    image: 'https://images.unsplash.com/photo-1596647371368-9c6e4b7b3e1f?w=500',
    category: 'men',
    volume: '100ml',
    description: 'Fresh citrus and marine notes.',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Floral Essence',
    price: 95.99,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500',
    category: 'women',
    volume: '75ml',
    description: 'Delicate rose and peony fragrance.',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Midnight Mystery',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1565125889606-8d60b8deab0e?w=500',
    category: 'unisex',
    volume: '100ml',
    description: 'Dark musk and woody base notes.',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Summer Light',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1619235832592-d1e4cb0e5fbe?w=500',
    category: 'women',
    volume: '50ml',
    description: 'Bright grapefruit and lemon.',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Spice Warrior',
    price: 85.99,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    category: 'men',
    volume: '100ml',
    description: 'Spicy cardamom and leather notes.',
    rating: 4.5,
  },
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
    return get().products.find((product) => product.id === parseInt(id));
  },
}));
