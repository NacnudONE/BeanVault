import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { STATS } from '../data/stats';
import { TESTIMONIALS } from '../data/testimonials';
import ProductCard from '../components/ProductCard';
import { useToast } from '../context/ToastContext';
import { starString } from '../utils';

const INSTA_LABELS = ['lifestyle', 'product', 'origin', 'brew', 'café', 'roastery', 'beans', 'latte', 'farmer'];
const INSTA_GRADS = [
  'linear-gradient(135deg,#2a1008,#1a0504)',
  'linear-gradient(225deg,#3C1A0B,#1a0804)',
  'linear-gradient(315deg,#1a0804,#2a1008)',
  'linear-gradient(45deg,#241006,#3C1A0B)',
  'linear-gradient(135deg,#1a0a04,#2a1008)',
  'linear-gradient(270deg,#2a1008,#1a0504)',
  'linear-gradient(0deg,#3C1A0B,#241006)',
  'linear-gradient(180deg,#1a0a04,#2a1008)',
  'linear-gradient(90deg,#2a1008,#3C1A0B)',
];

export default function Home() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [testiIdx, setTestiIdx] = useState(0);
  const [email, setEmail] = useState('');

  const featured = PRODUCTS.slice(0, 4);
  const testi = TESTIMONIALS[testiIdx];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1A1A1A', fontFamily: "'Inter', sans-serif", color: '#E8D5BF' }}>

      {/* ── Hero ── */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'radial-gradient(ellipse at 28% 55%,#2C1206 0%,#1A1A1A 58%),linear-gradient(180deg,#0D0D0D,#1A1A1A)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 72% 28%,rgba(60,26,11,0.22) 0%,transparent 48%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 800, padding: '0 40px', animation: 'fadeUp 0.9s ease 0.1s both' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#D4631D', marginBottom: 20 }}>Premium Craft Coffee</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(52px,9vw,100px)', fontWeight: 700, color: '#F5E6D3', lineHeight: 1.01, marginBottom: 22, letterSpacing: '-0.02em' }}>
            Roasted to<br /><em style={{ fontStyle: 'italic', color: '#D4631D' }}>Perfection</em>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 300, color: '#9B8470', marginBottom: 52, lineHeight: 1.7 }}>
            Hand-picked beans from the world's finest farms,<br />roasted fresh and delivered to your door.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="bv-btn-primary" onClick={() => navigate('/shop')}>Shop Now</button>
            <button className="bv-btn-outline" onClick={() => navigate('/about')}>Our Story</button>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.3, pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9B8470' }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: 'linear-gradient(to bottom,#9B8470,transparent)' }} />
        </div>
      </section>

      {/* ── Featured ── */}
      <section style={{ padding: '96px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="bv-label">Our Selection</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, color: '#F5E6D3', lineHeight: 1.1 }}>Featured Coffees</h2>
        </div>
        <div className="bv-featured">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="bv-btn-sm" onClick={() => navigate('/shop')}>View All Coffees →</button>
        </div>
      </section>

      {/* ── From Farm to Cup ── */}
      <section style={{ background: '#131313', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', padding: '80px 0 64px' }}>
            <p className="bv-label">How It Works</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5E6D3' }}>From Farm to Cup</h2>
          </div>
          <div className="bv-proc">
            {[
              { num: '01', title: 'Source', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />, text: "We travel to 15+ origins to hand-select beans from smallholder farmers, building direct trade relationships that ensure quality and fairness." },
              { num: '02', title: 'Roast', icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />, text: "Each batch is roasted to order in our Austin roastery. Our Head Roaster profiles every origin individually to unlock its unique character and peak flavor." },
              { num: '03', title: 'Deliver', icon: <><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>, text: "Ships within 24 hours of roasting in nitrogen-flushed, compostable bags — arriving at peak freshness, ready to transform your morning." },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center', padding: `0 40px 80px`, ...(i === 1 ? { borderLeft: '1px solid #222', borderRight: '1px solid #222' } : {}) }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', border: '1px solid rgba(212,99,29,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 26px', position: 'relative' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4631D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                  <div style={{ position: 'absolute', top: -1, right: -1, width: 20, height: 20, borderRadius: '50%', background: '#131313', border: '1px solid #D4631D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#D4631D' }}>{step.num}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 600, color: '#F5E6D3', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#6B5A4E', lineHeight: 1.75 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: '#3C1A0B' }}>
        <div className="bv-stats" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '58px 40px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: '#F5E6D3', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4631D' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '96px 40px', background: '#131313', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <p className="bv-label">Customer Love</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 52 }}>What Our Community Says</h2>
          <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: '48px 44px', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ fontSize: 17, color: '#D4631D', marginBottom: 20, letterSpacing: '0.06em' }}>{starString(testi.rating)}</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontStyle: 'italic', color: '#D0C0AA', lineHeight: 1.75, marginBottom: 30 }}>"{testi.quote}"</p>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5E6D3', marginBottom: 4 }}>{testi.name}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#555', letterSpacing: '0.03em' }}>{testi.role}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 28 }}>
            {['←', '→'].map((arrow, i) => (
              <button key={i} onClick={() => setTestiIdx(idx => (idx + (i === 0 ? -1 : 1) + TESTIMONIALS.length) % TESTIMONIALS.length)}
                style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid #2A2A2A', background: 'transparent', color: '#9B8470', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4631D'; e.currentTarget.style.color = '#D4631D'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9B8470'; }}
              >{arrow}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram grid ── */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p className="bv-label">Follow Along</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#F5E6D3', marginBottom: 6 }}>@BeanVault</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#555', marginBottom: 32 }}>Join our community of 28K coffee lovers</p>
          <div className="bv-insta">
            {INSTA_LABELS.map((label, i) => (
              <div key={i} style={{ aspectRatio: '1', background: INSTA_GRADS[i], position: 'relative', cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 9, color: 'rgba(107,66,38,0.4)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section style={{ background: '#3C1A0B', borderTop: '1px solid rgba(212,99,29,0.2)' }}>
        <div style={{ maxWidth: 540, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
          <p className="bv-label" style={{ color: '#D4631D' }}>Stay Connected</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,4vw,38px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 10 }}>Join the BeanVault Community</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,230,211,0.5)', marginBottom: 30, lineHeight: 1.65 }}>Brewing tips, new arrivals, and exclusive offers — fresh to your inbox.</p>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', maxWidth: 420, margin: '0 auto' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required style={{ flex: 1, padding: '14px 15px', background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(212,99,29,0.3)', borderRight: 'none', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 13, outline: 'none', minWidth: 0 }} />
            <button type="submit" style={{ padding: '14px 22px', background: '#D4631D', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#B5531A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#D4631D')}
            >Subscribe</button>
          </form>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,230,211,0.25)', marginTop: 14 }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
