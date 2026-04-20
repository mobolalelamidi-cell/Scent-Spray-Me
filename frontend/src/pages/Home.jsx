import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

export default function Home() {
  const { filteredProducts, setFilters } = useProductStore();

  const handleSearch = (e) => {
    setFilters({ search: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Scent Spray-Me</h1>
          <p className="text-lg text-purple-100 mb-8">
            Un seul spray… et ils ne t'oublieront jamais.
          </p>
        </div>
      </section>

      {/* Search and Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Rechercher des parfums..."
              onChange={handleSearch}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />
          </div>

          {/* Layout: Filter + Products */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filter */}
            <div className="lg:col-span-1">
              <ProductFilter />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Aucun produit trouvé. Essayez d'ajuster vos filtres.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
