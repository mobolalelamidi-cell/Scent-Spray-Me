import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuthStore } from '../store/authStore';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/#products' },
  { label: 'About', to: '/' },
  { label: 'Blogs', to: '/' },
];

const quickLinks = [
  { label: 'Trending Product', to: '#products' },
  { label: 'Best Sellers', to: '#products' },
  { label: 'Top Rated', to: '#products' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuthStore();
  const isDark = theme === 'dark';

  const handleMobileToggle = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 border-b px-4 py-4 transition-colors duration-300 sm:px-6 lg:px-8 ${
        isDark
          ? 'border-white/8 bg-[#131d2d] text-white'
          : 'border-stone-200/80 bg-[#f7f4ef]/90 text-neutral-950 backdrop-blur'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex min-w-0 items-center gap-4 lg:gap-10">
            <Link to="/" className="truncate text-lg font-black tracking-[0.08em] text-rose-500 sm:text-2xl">
              Scent Spray Me
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  className={`text-sm font-semibold transition ${
                    isDark ? 'text-white/55 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="group relative">
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition ${
                    isDark ? 'text-white/55 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Quick Links
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="m7 10 5 5 5-5z" />
                  </svg>
                </button>

                <div
                  className={`invisible absolute left-0 top-full z-20 mt-3 min-w-[220px] rounded-2xl border p-3 opacity-0 shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:opacity-100 ${
                    isDark ? 'border-white/10 bg-[#162133]' : 'border-stone-200 bg-white'
                  }`}
                >
                  {quickLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.to}
                      className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isDark ? 'text-white/70 hover:bg-white/6 hover:text-white' : 'text-neutral-700 hover:bg-stone-100 hover:text-neutral-950'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className={`group hidden items-center overflow-hidden rounded-full transition-all duration-300 md:flex ${
                isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-white'
              }`}
            >
              <label className="flex items-center">
                <input
                  type="text"
                  placeholder="Search here..."
                  className={`w-0 bg-transparent py-2 text-sm outline-none transition-all duration-300 group-hover:w-40 group-hover:px-4 group-focus-within:w-40 group-focus-within:px-4 ${
                    isDark ? 'text-white placeholder:text-white/35' : 'text-neutral-700 placeholder:text-neutral-400'
                  }`}
                />
                <span
                  className={`flex h-11 w-11 items-center justify-center ${
                    isDark ? 'text-white/70 group-hover:text-white' : 'text-neutral-700 group-hover:text-neutral-950'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
              </label>
            </div>

            {user ? (
              <button
                type="button"
                onClick={logout}
                className={`hidden text-sm font-semibold sm:block ${
                  isDark ? 'text-white/65 hover:text-white' : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                {user.name || user.email}
              </button>
            ) : (
              <Link
                to="/login"
                className={`hidden text-sm font-semibold sm:block ${
                  isDark ? 'text-white/65 hover:text-white' : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className={`relative flex h-11 w-11 items-center justify-center rounded-full transition ${
                isDark ? 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white' : 'bg-white text-neutral-800 hover:text-neutral-950'
              }`}
              aria-label="Open cart"
              onClick={closeMobileMenu}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.9a1 1 0 0 0 1-.8L21 7H7" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`relative hidden h-8 w-16 items-center rounded-full px-1 transition sm:flex ${
                isDark ? 'bg-white/12' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                  isDark ? 'translate-x-8' : 'translate-x-0'
                }`}
              />
              <span className="relative z-10 flex w-full items-center justify-between px-1 text-[10px] font-bold uppercase tracking-[0.15em]">
                <span className={isDark ? 'text-white/35' : 'text-amber-500'}>☀</span>
                <span className={isDark ? 'text-slate-900' : 'text-slate-500'}>☾</span>
              </span>
            </button>

            <button
              type="button"
              onClick={handleMobileToggle}
              aria-label="Toggle menu"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden ${
                isDark ? 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white' : 'bg-white text-neutral-800 hover:text-neutral-950'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                {isMobileMenuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className={`mt-4 rounded-[1.5rem] border p-4 lg:hidden ${
              isDark ? 'border-white/10 bg-[#162133]' : 'border-stone-200 bg-white'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={closeMobileMenu}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isDark ? 'text-white/80 hover:bg-white/6 hover:text-white' : 'text-neutral-700 hover:bg-stone-100 hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <p className={`px-4 text-[11px] font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-white/35' : 'text-neutral-400'}`}>
                Quick Links
              </p>
              <div className="mt-2 flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.to}
                    onClick={closeMobileMenu}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isDark ? 'text-white/70 hover:bg-white/6 hover:text-white' : 'text-neutral-700 hover:bg-stone-100 hover:text-neutral-950'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className={`text-sm font-semibold ${
                    isDark ? 'text-white/75 hover:text-white' : 'text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  {user.name || user.email}
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className={`text-sm font-semibold ${
                    isDark ? 'text-white/75 hover:text-white' : 'text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  Login
                </Link>
              )}

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={`relative flex h-8 w-16 items-center rounded-full px-1 transition ${
                  isDark ? 'bg-white/12' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                    isDark ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
                <span className="relative z-10 flex w-full items-center justify-between px-1 text-[10px] font-bold uppercase tracking-[0.15em]">
                  <span className={isDark ? 'text-white/35' : 'text-amber-500'}>☀</span>
                  <span className={isDark ? 'text-slate-900' : 'text-slate-500'}>☾</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
