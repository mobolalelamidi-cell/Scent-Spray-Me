import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/validators';

export default function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProductStore();
  const { addItem } = useCart();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Produit non trouvé</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-yellow-400 text-xl">⭐</span>
                <span className="text-gray-700 font-semibold">{product.rating} (128 reviews)</span>
              </div>
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                {product.category === 'women' ? 'Femme' : product.category === 'men' ? 'Homme' : 'Unisexe'}
              </span>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 text-lg mb-4">{product.description}</p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Volume:</strong> {product.volume}
                </p>
                <p>
                  <strong>Type:</strong> Eau de Parfum
                </p>
                <p>
                  <strong>Notes de tête:</strong> Agrumes, Bergamote
                </p>
                <p>
                  <strong>Notes de cœur:</strong> Floral, Rose
                </p>
                <p>
                  <strong>Notes de base:</strong> Musc, Ambre
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {formatPrice(product.price)}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-lg transition-colors">
                  ❤️ Add to Wishlist
                </button>
              </div>
            </div>

            <div className="border-t pt-6 bg-blue-50 p-4 rounded-lg">
              <div className="space-y-2 text-sm">
                <p>
                  ✓ <strong>Livraison gratuite</strong> pour les commandes de plus de 50€
                </p>
                <p>
                  ✓ <strong>Retours 30 jours</strong> - Sans questions
                </p>
                <p>
                  ✓ <strong>Authenticité garantie</strong> - Tous les produits vérifiés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
