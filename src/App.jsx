import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ssm-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('ssm-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f1725]' : 'bg-[#f7f4ef]'}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <footer
          className={`mt-10 border-t transition-colors duration-300 ${
            isDark ? 'border-white/10 bg-[#111b2d] text-white/70' : 'border-stone-200 bg-white text-neutral-500'
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
            <div className="max-w-sm">
              <p className="text-xl font-black tracking-[0.08em] text-rose-500">Scent Spray Me</p>
              <p className={`mt-4 text-sm leading-7 ${isDark ? 'text-white/65' : 'text-neutral-500'}`}>
                A fashion-forward fragrance storefront with polished cards, bold promotional sections and a cleaner shopping flow.
              </p>
              <a
                href="#products"
                className="mt-6 inline-flex rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Explore The Drop
              </a>
            </div>

            <div>
              <h3 className={`text-sm font-black uppercase tracking-[0.18em] ${isDark ? 'text-white' : 'text-neutral-950'}`}>Important Links</h3>
              <div className={`mt-4 flex flex-col gap-3 text-sm ${isDark ? 'text-white/65' : 'text-neutral-500'}`}>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Home</a>
                <a href="#products" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Shop</a>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>About</a>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Blog</a>
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-black uppercase tracking-[0.18em] ${isDark ? 'text-white' : 'text-neutral-950'}`}>Quick Links</h3>
              <div className={`mt-4 flex flex-col gap-3 text-sm ${isDark ? 'text-white/65' : 'text-neutral-500'}`}>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>New Arrivals</a>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Gift Sets</a>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Best Sellers</a>
                <a href="/" className={`transition ${isDark ? 'hover:text-white' : 'hover:text-neutral-950'}`}>Contact</a>
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-black uppercase tracking-[0.18em] ${isDark ? 'text-white' : 'text-neutral-950'}`}>Address</h3>
              <div className={`mt-4 space-y-3 text-sm leading-7 ${isDark ? 'text-white/65' : 'text-neutral-500'}`}>
                <p>14 Ivory Lane, Victoria Island</p>
                <p>Lagos, Nigeria</p>
                <p>+234 700 555 0188</p>
                <p>support@scentssprayme.com</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'border-white/10' : 'border-stone-200'} border-t`}>
            <div className={`mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 ${isDark ? 'text-white/35' : 'text-neutral-400'}`}>
              <p>© 2026 Scent Spray Me. All rights reserved.</p>
              <p>Designed with a cleaner editorial storefront layout.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
