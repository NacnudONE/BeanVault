import { useNavigate } from 'react-router-dom';
import type { Product } from '../data/types';
import { starString, formatPrice } from '../utils';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface Props {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: Props) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const p = compact ? '15px 15px 19px' : '18px 18px 22px';
  const nameSize = compact ? 16 : 17;
  const priceSize = compact ? 16 : 17;
  const starSize = compact ? 11 : 12;
  const btnPad = compact ? 9 : 10;

  return (
    <div
      onClick={() => navigate(`/shop/${product.slug}`)}
      className="bv-card"
      style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
    >
      <div style={{ aspectRatio: '1', background: 'linear-gradient(160deg,#2a1008,#1a0804 55%,#0d0401)', position: 'relative', overflow: 'hidden' }}>
        <div className="bv-img-placeholder" />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: compact ? 7 : 8 }}>
          <svg width={compact ? 38 : 44} height={compact ? 38 : 44} viewBox="0 0 24 24" fill="none" stroke="rgba(107,66,38,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
          </svg>
          <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(107,66,38,0.4)' }}>product photo</span>
        </div>
        <div style={{ position: 'absolute', top: compact ? 9 : 10, left: compact ? 9 : 10, padding: compact ? '2px 8px' : '3px 9px', background: 'rgba(18,18,18,0.92)', border: '1px solid #2A2A2A', borderRadius: 1 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: compact ? 9 : 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4631D' }}>{product.roast}</span>
        </div>
      </div>

      <div style={{ padding: p }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#404040', marginBottom: 4 }}>{product.origin}</p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: nameSize, fontWeight: 600, color: '#F5E6D3', marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: '#D4631D', fontSize: starSize }}>{starString(product.rating)}</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: priceSize, fontWeight: 700, color: '#F5E6D3' }}>{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); addToCart(product, '250g', 'Whole Bean', 1); showToast(`${product.name} added to cart!`); }}
          className="bv-add-btn"
          style={{ width: '100%', padding: `${btnPad}px`, background: 'transparent', border: '1px solid #2A2A2A', color: '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#D4631D'; e.currentTarget.style.borderColor = '#D4631D'; e.currentTarget.style.color = '#F5E6D3'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9B8470'; }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
