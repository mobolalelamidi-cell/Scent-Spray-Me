import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { formatPrice } from '../utils/validators';

const categoryOptions = [
  { value: 'all', label: 'All' },
  { value: 'women', label: 'For Her' },
  { value: 'men', label: 'For Him' },
  { value: 'unisex', label: 'Unisex' },
];

const featureCards = [
  { subtitle: 'Featured pick' },
  { subtitle: 'Daily wear' },
  { subtitle: 'Bold signature' },
  { subtitle: 'Evening edit' },
  { subtitle: 'Weekend edit' },
];

const serviceItems = [
  {
    title: 'Free Shipping',
    text: 'On orders over $80',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h3l4 3v2h-7z" />
        <circle cx="8" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: 'Secure Checkout',
    text: 'Protected payment flow',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    title: 'Gift Ready',
    text: 'Premium wrapping available',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h16v10H4z" />
        <path d="M12 10v10" />
        <path d="M4 14h16" />
        <path d="M12 10c-2.5 0-4-1-4-2.5S9.5 5 12 10Z" />
        <path d="M12 10c2.5 0 4-1 4-2.5S14.5 5 12 10Z" />
      </svg>
    ),
  },
  {
    title: 'Support 24/7',
    text: 'Help whenever you need it',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12a8 8 0 1 1 16 0" />
        <path d="M4 12v5h4v-5" />
        <path d="M20 12v5h-4v-5" />
        <path d="M12 19v1" />
      </svg>
    ),
  },
];

const articleCards = [
  {
    title: 'How to choose a signature scent',
    date: 'April 14, 2026',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Layering perfume without overpowering it',
    date: 'April 16, 2026',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Daytime scents that still feel luxurious',
    date: 'April 19, 2026',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Home({ theme = 'dark' }) {
  const { filteredProducts, products, filters, setFilters } = useProductStore();
  const isDark = theme === 'dark';

  const orderedProducts = [...products].sort((a, b) => (a.homepageRank ?? 99) - (b.homepageRank ?? 99));
  const featuredProducts = orderedProducts.filter((product) => product.featured);
  const bestSellerProducts = orderedProducts.filter((product) => product.bestSeller);
  const seasonalProducts = orderedProducts.filter((product) => product.seasonal);
  const heroProduct = featuredProducts[0] || orderedProducts[0];
  const remainingProducts = orderedProducts.filter((product) => product.id !== heroProduct.id);
  const womenPromoProduct = remainingProducts.find((product) => product.category === 'women');
  const basePromoProducts = remainingProducts.slice(0, 4);
  const promoProducts = [
    ...basePromoProducts,
    ...(womenPromoProduct && !basePromoProducts.some((product) => product.id === womenPromoProduct.id)
      ? [womenPromoProduct]
      : []),
  ].slice(0, 5);
  const bannerProduct = bestSellerProducts[0] || heroProduct;
  const secondaryBannerProduct =
    seasonalProducts[0] || featuredProducts[1] || orderedProducts[1] || heroProduct;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f1725] text-white' : 'bg-[#f7f4ef] text-neutral-950'}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 lg:px-8">
        <section
          className={`overflow-hidden rounded-[1.6rem] shadow-[0_24px_80px_rgba(15,23,42,0.14)] sm:rounded-[2rem] ${
            isDark ? 'bg-[#1c2637]' : 'bg-gradient-to-r from-stone-200 via-stone-100 to-white'
          }`}
        >
          <div className="grid items-center gap-8 px-5 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-10 lg:px-14 lg:py-14">
            <div className="relative z-10">
              <h1 className={`max-w-xl text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>
                About us
              </h1>
              <p className={`mt-4 max-w-lg text-sm leading-7 sm:mt-5 sm:text-lg ${isDark ? 'text-white/70' : 'text-neutral-600'}`}>
                We are building a fragrance destination around confidence, style, and unforgettable presence.
                Scent Spray Me is all about helping our customers discover standout perfumes for everyday wear,
                special moments, and signature personal expression.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link to="/cart" className="rounded-full bg-rose-500 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-rose-600">
                  Shop Best Sellers
                </Link>
                <a
                  href="#products"
                  className={`rounded-full border px-6 py-3 text-center text-sm font-semibold transition ${
                    isDark
                      ? 'border-white/15 bg-white/6 text-white hover:border-white/30'
                      : 'border-neutral-300 bg-white/80 text-neutral-900 hover:border-neutral-400'
                  }`}
                >
                  Explore Collection
                </a>
              </div>
              <p className={`mt-8 text-[2rem] font-black uppercase leading-none tracking-[-0.06em] sm:mt-10 sm:whitespace-nowrap sm:text-[4.4rem] lg:text-[5.8rem] ${isDark ? 'text-white/6' : 'text-white/90'}`}>
                Scent Spray Me
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <div className={`absolute inset-x-10 bottom-6 h-10 rounded-full blur-2xl ${isDark ? 'bg-black/35' : 'bg-rose-900/15'}`} />
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="relative h-[280px] w-full max-w-sm rounded-[1.6rem] object-cover object-center shadow-[0_22px_70px_rgba(15,23,42,0.24)] sm:h-[360px] sm:rounded-[2rem]"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          {featureCards.map((card, index) => {
            const imageProduct = promoProducts[index] || products[index] || heroProduct;
            const featured = index === 2;
            const cardLabel = imageProduct.bestSeller
              ? 'Best seller'
              : imageProduct.featured
                ? 'Featured'
                : 'New arrival';

            return (
              <article
                key={`${card.subtitle}-${imageProduct.id}`}
                className={`${featured ? 'md:col-span-2' : ''} group relative min-h-[240px] overflow-hidden rounded-[1.5rem] border ${
                  isDark ? 'border-white/8 bg-[#111827]' : 'border-white/60 bg-white'
                } shadow-[0_18px_44px_rgba(15,23,42,0.16)] sm:min-h-[260px] sm:rounded-[1.7rem]`}
              >
                <img
                  src={imageProduct.image}
                  alt={imageProduct.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/58 to-black/10" />
                <div className="absolute inset-x-4 inset-y-4 rounded-[1.2rem] border border-white/10 bg-black/28 backdrop-blur-md sm:inset-y-5 sm:left-5 sm:right-auto sm:w-[42%] sm:rounded-[1.4rem]" />

                <div className="relative z-10 flex h-full max-w-full flex-col justify-between p-5 text-white sm:max-w-[18rem] sm:p-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.38em] text-white/75 sm:text-xs sm:tracking-[0.42em]">{card.subtitle}</p>
                    <p className="mt-4 inline-flex w-fit rounded-full border border-white/10 bg-white/14 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white sm:mt-5 sm:text-[11px] sm:tracking-[0.24em]">
                      {cardLabel}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black uppercase leading-none sm:text-[2.3rem]">{imageProduct.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-white/84 sm:mt-4 sm:text-base sm:leading-8">{imageProduct.description}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 sm:mt-5 sm:gap-3 sm:text-[11px] sm:tracking-[0.2em]">
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
                        {imageProduct.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
                        {imageProduct.volume}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2">
                        ★ {imageProduct.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section
          className={`grid gap-4 rounded-[1.5rem] px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:grid-cols-2 sm:rounded-[1.75rem] lg:grid-cols-4 ${
            isDark ? 'bg-[#141f31]' : 'bg-white'
          }`}
        >
          {serviceItems.map((item) => (
            <div key={item.title} className="flex items-center gap-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full ${isDark ? 'bg-white/8 text-rose-400' : 'bg-rose-50 text-rose-500'}`}>
                {item.icon}
              </div>
              <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{item.title}</p>
                <p className={`text-sm ${isDark ? 'text-white/55' : 'text-neutral-500'}`}>{item.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-[1.6rem] bg-neutral-900 text-white shadow-[0_20px_60px_rgba(15,23,42,0.2)] sm:rounded-[2rem]">
          <div className="grid items-center gap-8 px-5 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-stone-300">Seasonal edit</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none sm:text-5xl">{bannerProduct.name}</h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-stone-200">
                {bannerProduct.description}
              </p>
            </div>

            <div className="grid items-center gap-6 md:grid-cols-[0.9fr_1.1fr]">
              <img
                src={bannerProduct.image}
                alt={bannerProduct.name}
                className="mx-auto h-56 w-full max-w-xs rounded-[1.5rem] object-cover shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:h-64 sm:rounded-[1.75rem]"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-300">
                  {bannerProduct.bestSeller ? 'Top seller' : 'Featured bottle'}
                </p>
                <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
                  {bannerProduct.bestSeller ? 'Best seller spotlight' : 'Featured now'}
                </h3>
                <p className="mt-3 text-sm leading-6 text-stone-200">
                  {bannerProduct.topNotes} on top, {bannerProduct.baseNotes.toLowerCase()} underneath.
                </p>
                <a href="#products" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-stone-100">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="py-4 sm:py-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-500">Our Products</p>
            <h2 className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Top perfume picks</h2>
            <p className={`mt-3 text-sm ${isDark ? 'text-white/55' : 'text-neutral-500'}`}>
              Browse the same clean catalog style from your reference, adapted for fragrances.
            </p>
          </div>

          <div
            className={`mt-8 flex flex-col gap-4 rounded-[1.5rem] p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:rounded-[1.75rem] sm:p-5 ${
              isDark ? 'bg-[#141f31]' : 'bg-white'
            }`}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilters({ category: option.value })}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      filters.category === option.value
                        ? 'bg-rose-500 text-white'
                        : isDark
                          ? 'bg-white/6 text-white/65 hover:bg-white/10'
                          : 'bg-stone-100 text-neutral-600 hover:bg-stone-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="w-full lg:max-w-md">
                <input
                  type="text"
                  placeholder="Search perfumes, notes, moods..."
                  value={filters.search}
                  onChange={(e) => setFilters({ search: e.target.value })}
                  className={`w-full rounded-full border px-5 py-3 text-sm outline-none transition ${
                    isDark
                      ? 'border-white/10 bg-white/6 text-white placeholder:text-white/35 focus:border-rose-400 focus:bg-white/8'
                      : 'border-stone-200 bg-stone-50 text-neutral-700 focus:border-rose-300 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className={`group overflow-hidden rounded-[1.5rem] border transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] ${
                      isDark ? 'border-white/8 bg-[#182335]' : 'border-stone-200 bg-[#faf8f5]'
                    }`}
                  >
                    <Link to={`/product/${product.id}`} className="block">
                      <div className={`${isDark ? 'bg-[#111827]' : 'bg-white'} aspect-[1/0.9] overflow-hidden`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'bg-white/8 text-rose-400' : 'bg-rose-50 text-rose-500'}`}>
                          {product.category}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-white/55' : 'text-neutral-500'}`}>{product.volume}</span>
                      </div>
                      {(product.featured || product.bestSeller || product.seasonal) && (
                        <div className="flex flex-wrap gap-2">
                          {product.featured && (
                            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'bg-rose-500/15 text-rose-300' : 'bg-rose-100 text-rose-600'}`}>
                              Featured
                            </span>
                          )}
                          {product.bestSeller && (
                            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'bg-amber-500/15 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>
                              Best seller
                            </span>
                          )}
                          {product.seasonal && (
                            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700'}`}>
                              Seasonal
                            </span>
                          )}
                        </div>
                      )}
                      <div>
                        <Link to={`/product/${product.id}`} className={`text-lg font-bold transition ${isDark ? 'text-white hover:text-rose-400' : 'text-neutral-900 hover:text-rose-500'}`}>
                          {product.name}
                        </Link>
                        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-white/60' : 'text-neutral-500'}`}>{product.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-neutral-950'}`}>{formatPrice(product.price)}</span>
                        <span className="text-sm text-amber-500">★ {product.rating}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={`rounded-[1.5rem] border border-dashed px-6 py-14 text-center ${isDark ? 'border-white/15 bg-white/4' : 'border-stone-300 bg-stone-50'}`}>
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-neutral-800'}`}>No perfumes matched that search.</p>
                <p className={`mt-2 text-sm ${isDark ? 'text-white/55' : 'text-neutral-500'}`}>Try another note family or reset the filters above.</p>
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.6rem] bg-slate-700 text-white shadow-[0_20px_60px_rgba(51,65,85,0.24)] sm:rounded-[2rem]">
          <div className="grid items-center gap-8 px-5 py-8 md:grid-cols-[0.8fr_1fr_0.9fr] md:px-10 md:py-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-200">Fresh mood</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none sm:text-5xl">{secondaryBannerProduct.name}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-100">
                {secondaryBannerProduct.description}
              </p>
            </div>

            <img
              src={secondaryBannerProduct.image}
              alt={secondaryBannerProduct.name}
              className="mx-auto h-60 w-full max-w-sm rounded-[1.6rem] object-cover shadow-[0_18px_60px_rgba(0,0,0,0.2)] sm:h-72 sm:rounded-[2rem]"
            />

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-200">
                {secondaryBannerProduct.seasonal ? 'Seasonal mood' : 'Fresh pick'}
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase sm:text-3xl">
                {secondaryBannerProduct.seasonal ? 'Seasonal spotlight' : 'Freshly featured'}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-100">
                {secondaryBannerProduct.topNotes} opening into {secondaryBannerProduct.heartNotes.toLowerCase()}.
              </p>
              <a href="#products" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                Shop Now
              </a>
            </div>
          </div>
        </section>

        <section className="py-4 sm:py-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-rose-500">Recent News</p>
            <h2 className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Fragrance journal</h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {articleCards.map((article) => (
              <article
                key={article.title}
                className={`overflow-hidden rounded-[1.5rem] shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${
                  isDark ? 'bg-[#141f31]' : 'bg-white'
                }`}
              >
                <img src={article.image} alt={article.title} className="h-52 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-white/35' : 'text-neutral-400'}`}>{article.date}</p>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{article.title}</h3>
                  <p className={`text-sm leading-6 ${isDark ? 'text-white/60' : 'text-neutral-500'}`}>
                    Build a polished storefront story with editorial cards, stronger hierarchy, and clear featured moments.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
