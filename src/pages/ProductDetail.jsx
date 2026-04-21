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
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const categoryLabel =
    product.category === 'women' ? 'Femme' : product.category === 'men' ? 'Homme' : 'Unisexe';

  const handleAddToCart = () => {
    addItem(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-80 w-full object-cover sm:h-96"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>
              <div className="mb-4 flex items-center space-x-2">
                <span className="text-xl text-yellow-400">★</span>
                <span className="font-semibold text-gray-700">{product.rating} (128 reviews)</span>
              </div>
              <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold capitalize text-purple-700">
                {categoryLabel}
              </span>
            </div>

            <div className="border-t pt-6">
              <p className="mb-4 text-base text-gray-600 sm:text-lg">{product.description}</p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Volume:</strong> {product.volume}
                </p>
                <p>
                  <strong>Type:</strong> {product.type || 'Eau de Parfum'}
                </p>
                <p>
                  <strong>Top notes:</strong> {product.topNotes || 'Citrus accord, bergamot'}
                </p>
                <p>
                  <strong>Heart notes:</strong> {product.heartNotes || 'Floral accord, jasmine'}
                </p>
                <p>
                  <strong>Base notes:</strong> {product.baseNotes || 'Musk, amber woods'}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="mb-4 text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-colors hover:bg-purple-700"
                >
                  Add to Cart
                </button>
                <button className="flex-1 rounded-lg border-2 border-purple-600 px-6 py-3 font-bold text-purple-600 transition-colors hover:bg-purple-50">
                  Add to Wishlist
                </button>
              </div>
            </div>

            <div className="rounded-lg border-t bg-blue-50 p-4 pt-6">
              <div className="space-y-2 text-sm">
                <p>
                  ✓ <strong>Free shipping</strong> on orders over $50
                </p>
                <p>
                  ✓ <strong>30-day returns</strong> with no hassle
                </p>
                <p>
                  ✓ <strong>Authenticity guaranteed</strong> on every bottle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
