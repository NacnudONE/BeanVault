import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { starString, priceFor, formatPrice } from '../utils';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

const WEIGHTS = ['250g', '500g', '1kg'];
const GRINDS = ['Whole Bean', 'Coarse', 'Medium-Coarse', 'Medium', 'Medium-Fine', 'Fine'];
type Tab = 'description' | 'brewing' | 'reviews';

const SAMPLE_REVIEWS = [
  { name: 'Sarah M.', stars: '★★★★★', date: 'June 2026', text: "Absolutely stunning. The floral notes are unlike anything I've tried. Arrived 3 days post-roast — incredibly fresh." },
  { name: 'Tom K.', stars: '★★★★★', date: 'May 2026', text: 'My go-to morning coffee now. Consistent quality every order. The brewing guide helped me dial in my technique perfectly.' },
  { name: 'Linda R.', stars: '★★★★☆', date: 'May 2026', text: 'Excellent coffee. Lost one star because shipping took a day longer than expected, but beans were worth every minute of the wait.' },
];

const RATING_BARS = [5, 4, 3, 2, 1].map(n => {
  const pcts: Record<number, number> = { 5: 65, 4: 20, 3: 9, 2: 4, 1: 2 };
  return { n, stars: '★'.repeat(n) + '☆'.repeat(5 - n), pct: pcts[n] };
});

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = PRODUCTS.find(p => p.slug === slug) ?? PRODUCTS[0];
  const related = PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4);

  const [weight, setWeight] = useState('250g');
  const [grind, setGrind] = useState('Whole Bean');
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>('description');

  const handleAdd = () => {
    addToCart(product, weight, grind, qty);
    showToast(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: '40px 40px 80px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#555' }}>
        <Link to="/" style={{ color: '#555', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#555')}>Home</Link>
        <span style={{ color: '#333' }}>›</span>
        <Link to="/shop" style={{ color: '#555', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#555')}>Shop</Link>
        <span style={{ color: '#333' }}>›</span>
        <span style={{ color: '#9B8470' }}>{product.name}</span>
      </div>

      {/* Main detail */}
      <div className="bv-detail" style={{ marginBottom: 56 }}>
        {/* Image col */}
        <div>
          <div style={{ aspectRatio: '1', background: 'linear-gradient(160deg,#2C1208,#1a0804 50%,#0d0401)', border: '1px solid #272727', borderRadius: 2, position: 'relative', overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(60,26,11,0.1) 0,rgba(60,26,11,0.1) 1px,transparent 1px,transparent 12px)', backgroundSize: '12px 12px' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(107,66,38,0.38)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
              </svg>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(107,66,38,0.38)' }}>{product.name}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['linear-gradient(135deg,#2a1008,#1a0504)', 'linear-gradient(225deg,#1a0804,#2a1208)', 'linear-gradient(315deg,#241006,#1a0504)'].map((bg, i) => (
              <div key={i} style={{ width: 70, height: 70, background: bg, border: `1px solid ${i === 0 ? '#D4631D' : '#272727'}`, borderRadius: 1, cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#D4631D')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = i === 0 ? '#D4631D' : '#272727')}
              />
            ))}
          </div>
        </div>

        {/* Info col */}
        <div>
          <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(212,99,29,0.12)', border: '1px solid rgba(212,99,29,0.3)', borderRadius: 1, marginBottom: 14 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4631D' }}>{product.roast} Roast</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 700, color: '#F5E6D3', lineHeight: 1.15, marginBottom: 12 }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ color: '#D4631D', fontSize: 15, letterSpacing: '0.04em' }}>{starString(product.rating)}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#555' }}>({product.reviews} reviews)</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: '#6B9B7A' }}>● In Stock</span>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>{formatPrice(priceFor(product, weight))}</div>

          {/* Weight */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 10 }}>Weight</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {WEIGHTS.map(w => {
                const active = weight === w;
                return (
                  <button key={w} onClick={() => setWeight(w)} style={{ padding: '9px 16px', border: `1px solid ${active ? '#D4631D' : '#2A2A2A'}`, background: active ? 'rgba(212,99,29,0.1)' : 'transparent', color: active ? '#F5E6D3' : '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, transition: 'all 0.2s', borderRadius: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{w}</span>
                    <span style={{ fontSize: 11, opacity: 0.7 }}>{formatPrice(priceFor(product, w))}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grind */}
          <div style={{ marginBottom: 22 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 10 }}>Grind Type</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {GRINDS.map(g => {
                const active = grind === g;
                return (
                  <button key={g} onClick={() => setGrind(g)} style={{ padding: '8px 13px', border: `1px solid ${active ? '#D4631D' : '#2A2A2A'}`, background: active ? 'rgba(212,99,29,0.08)' : 'transparent', color: active ? '#F5E6D3' : '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: 'pointer', transition: 'all 0.2s', borderRadius: 1, whiteSpace: 'nowrap' }}>
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qty + Add to Cart */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 22, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #2A2A2A', borderRadius: 1 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 38, height: 42, background: 'transparent', border: 'none', cursor: 'pointer', color: '#F5E6D3', fontSize: 19, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#F5E6D3')}>−</button>
              <span style={{ width: 42, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#F5E6D3' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ width: 38, height: 42, background: 'transparent', border: 'none', cursor: 'pointer', color: '#F5E6D3', fontSize: 19, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4631D')} onMouseLeave={e => (e.currentTarget.style.color = '#F5E6D3')}>+</button>
            </div>
            <button onClick={handleAdd} className="bv-btn-primary" style={{ flex: 1, minWidth: 160 }}>Add to Cart</button>
          </div>

          {/* Flavor profile */}
          <div style={{ borderTop: '1px solid #222', paddingTop: 18 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 10 }}>Flavor Profile</p>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {product.flavors.map(f => (
                <span key={f} style={{ padding: '5px 12px', background: 'rgba(60,26,11,0.4)', border: '1px solid rgba(212,99,29,0.2)', borderRadius: 20, fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, color: '#D4631D', letterSpacing: '0.03em' }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderTop: '1px solid #222', marginBottom: 56 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #222', marginBottom: 32, overflowX: 'auto' }}>
          {(['description', 'brewing', 'reviews'] as Tab[]).map(t => {
            const labels: Record<Tab, string> = { description: 'Description', brewing: 'Brewing Guide', reviews: `Reviews (${product.reviews})` };
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} style={{ padding: '13px 26px', border: 'none', borderBottom: `2px solid ${active ? '#D4631D' : 'transparent'}`, background: 'transparent', color: active ? '#F5E6D3' : '#555', fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: active ? 600 : 400, cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {labels[t]}
              </button>
            );
          })}
        </div>

        {tab === 'description' && (
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#8A7A6A', lineHeight: 1.82 }}>{product.description}</p>
          </div>
        )}
        {tab === 'brewing' && (
          <div style={{ maxWidth: 600 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: '#F5E6D3', marginBottom: 22 }}>Step-by-Step Brewing Guide</h4>
            <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 15 }}>
              {product.brewing.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 15, alignItems: 'flex-start' }}>
                  <div style={{ width: 27, height: 27, borderRadius: '50%', background: '#3C1A0B', border: '1px solid #D4631D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: '#D4631D', marginTop: 2 }}>{i + 1}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#8A7A6A', lineHeight: 1.72, paddingTop: 3 }}>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
        {tab === 'reviews' && (
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 200 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: '#F5E6D3', lineHeight: 1 }}>{product.rating}</div>
              <div style={{ color: '#D4631D', fontSize: 18, letterSpacing: '0.04em', marginBottom: 8 }}>{starString(product.rating)}</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#555' }}>{product.reviews} reviews</p>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {RATING_BARS.map(rb => (
                  <div key={rb.n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#D4631D', width: 60, flexShrink: 0 }}>{rb.stars}</span>
                    <div style={{ flex: 1, height: 3, background: '#2A2A2A', borderRadius: 2 }}>
                      <div style={{ height: 3, background: '#D4631D', borderRadius: 2, width: `${rb.pct}%` }} />
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#555', width: 30, textAlign: 'right' }}>{rb.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
              {SAMPLE_REVIEWS.map((rev, i) => (
                <div key={i} style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: '22px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5E6D3' }}>{rev.name}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#555' }}>{rev.date}</span>
                  </div>
                  <div style={{ color: '#D4631D', fontSize: 13, marginBottom: 8 }}>{rev.stars}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7B6A5A', lineHeight: 1.65 }}>{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related */}
      <div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>You Might Also Like</h3>
        <div className="bv-related">
          {related.map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
      </div>
    </div>
  );
}
