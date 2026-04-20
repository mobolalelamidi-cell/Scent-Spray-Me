import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/validators';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    // Could show a toast notification here
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 truncate">
            {product.name}
          </h3>
        </Link>

        {/* Category and Volume */}
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span className="capitalize bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
            {product.category === 'women' ? 'Femme' : product.category === 'men' ? 'Homme' : 'Unisexe'}
          </span>
          <span>{product.volume}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <span className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}
