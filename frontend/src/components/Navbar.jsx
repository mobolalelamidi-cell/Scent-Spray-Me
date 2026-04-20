import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Scent Spray Me" className="h-16 w-auto" />
          </Link>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-xs mx-8">
            <input
              type="text"
              placeholder="Rechercher des parfums..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm text-gray-700">Bienvenue, {user.name || user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                  Connexion
                </Link>
                <Link to="/signup" className="text-sm text-purple-600 hover:text-purple-700">
                  S'inscrire
                </Link>
              </>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <div className="text-2xl">🛒</div>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
