import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const ROAST_OPTS = ['Light', 'Medium', 'Dark', 'Espresso'];
const ORIGIN_OPTS = ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala', 'Kenya', 'Indonesia', 'Costa Rica'];
const SORT_OPTS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function Shop() {
  const [roastFilter, setRoastFilter] = useState<string[]>([]);
  const [originFilter, setOriginFilter] = useState<string[]>([]);
  const [sort, setSort] = useState('popularity');

  const toggleRoast = (r: string) => setRoastFilter(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  const toggleOrigin = (o: string) => setOriginFilter(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]);
  const clearFilters = () => { setRoastFilter([]); setOriginFilter([]); };

  const filtered = PRODUCTS
    .filter(p => (!roastFilter.length || roastFilter.includes(p.roast)) && (!originFilter.length || originFilter.includes(p.origin)))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const activeTags = [
    ...roastFilter.map(r => ({ label: `Roast: ${r}`, clear: () => setRoastFilter(prev => prev.filter(x => x !== r)) })),
    ...originFilter.map(o => ({ label: `Origin: ${o}`, clear: () => setOriginFilter(prev => prev.filter(x => x !== o)) })),
  ];

  return (
    <div style={{ padding: '48px 40px 96px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 22, flexWrap: 'wrap' }}>
        <div>
          <p className="bv-label">Our Collection</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, color: '#F5E6D3' }}>Shop All Coffees</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#555' }}>{filtered.length} products</span>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '10px 14px', background: '#1C1C1C', border: '1px solid #2A2A2A', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: 'pointer', outline: 'none' }}>
            {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {activeTags.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18, alignItems: 'center' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#555' }}>Filters:</span>
          {activeTags.map((tag, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 11px', background: 'rgba(212,99,29,0.1)', border: '1px solid rgba(212,99,29,0.28)', borderRadius: 2 }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#D4631D' }}>{tag.label}</span>
              <span onClick={tag.clear} style={{ color: '#D4631D', cursor: 'pointer', fontSize: 15, lineHeight: 1 }}>×</span>
            </div>
          ))}
          <button onClick={clearFilters} style={{ padding: '4px 11px', background: 'transparent', border: '1px solid #2A2A2A', color: '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: 'pointer', borderRadius: 2, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4631D'; e.currentTarget.style.color = '#D4631D'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9B8470'; }}
          >Clear all</button>
        </div>
      )}

      <div className="bv-shop-l">
        <aside style={{ background: '#161616', border: '1px solid #242424', borderRadius: 2, padding: 26, position: 'sticky', top: 86 }}>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 22 }}>Filters</h3>

          <div style={{ marginBottom: 26 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 13 }}>Roast Level</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ROAST_OPTS.map(r => {
                const active = roastFilter.includes(r);
                return (
                  <label key={r} onClick={() => toggleRoast(r)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: active ? '#D4631D' : '#9B8470', userSelect: 'none' }}>
                    <div style={{ width: 15, height: 15, borderRadius: 3, border: '1px solid #333', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {active && <div style={{ width: 8, height: 8, background: '#D4631D', borderRadius: 1 }} />}
                    </div>
                    {r}
                  </label>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 26 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 13 }}>Origin</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ORIGIN_OPTS.map(o => {
                const active = originFilter.includes(o);
                return (
                  <label key={o} onClick={() => toggleOrigin(o)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, color: active ? '#D4631D' : '#9B8470', userSelect: 'none' }}>
                    <div style={{ width: 15, height: 15, borderRadius: 3, border: '1px solid #333', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {active && <div style={{ width: 8, height: 8, background: '#D4631D', borderRadius: 1 }} />}
                    </div>
                    {o}
                  </label>
                );
              })}
            </div>
          </div>

          <button onClick={clearFilters} style={{ width: '100%', padding: 10, background: 'transparent', border: '1px solid #2A2A2A', color: '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4631D'; e.currentTarget.style.color = '#D4631D'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9B8470'; }}
          >Clear Filters</button>
        </aside>

        <div className="bv-pgrid">
          {filtered.map(p => <ProductCard key={p.id} product={p} compact />)}
        </div>
      </div>
    </div>
  );
}
