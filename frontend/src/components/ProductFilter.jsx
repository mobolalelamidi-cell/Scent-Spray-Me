import { useProductStore } from '../store/productStore';

export default function ProductFilter() {
  const { filters, setFilters } = useProductStore();

  const categories = ['all', 'women', 'men', 'unisex'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtres</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Catégorie</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={(e) => setFilters({ category: e.target.value })}
                className="w-4 h-4 text-purple-600"
              />
              <span className="ml-2 text-gray-700 capitalize">{cat === 'all' ? 'Tous' : cat === 'women' ? 'Femme' : cat === 'men' ? 'Homme' : 'Unisexe'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Gamme de prix</h4>
        <div className="space-y-2">
          <div>
            <input
              type="range"
              min="0"
              max="150"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                })
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
