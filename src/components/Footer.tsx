import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thanks for subscribing!');
    setEmail('');
  };

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Shop All', to: '/shop' },
    { label: 'About Us', to: '/about' },
    { label: 'Journal', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ];

  const serviceLinks = ['FAQ', 'Shipping Info', 'Returns', 'Subscription', 'Privacy Policy'];

  return (
    <footer style={{ background: '#111111', borderTop: '1px solid #1E1E1E' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '68px 40px 44px' }}>
        <div className="bv-foot">
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#F5E6D3', display: 'block', marginBottom: 14 }}>
              BEAN<span style={{ color: '#D4631D' }}>VAULT</span>
            </span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#4A3A2A', lineHeight: 1.7, marginBottom: 18 }}>
              Hand-picked beans, roasted to order. Delivering extraordinary coffee from the world's finest farms since 2019.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                <path key="tw" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
              ].map((_, i) => (
                <SocialIcon key={i} idx={i} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 18 }}>Quick Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {links.map(({ label, to }) => (
                <span key={label} onClick={() => navigate(to)} className="bv-footer-link">{label}</span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 18 }}>Customer Service</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {serviceLinks.map(label => (
                <span key={label} className="bv-footer-link" onClick={label === 'FAQ' ? () => navigate('/contact') : undefined}>{label}</span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 18 }}>Newsletter</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#4A3A2A', lineHeight: 1.65, marginBottom: 14 }}>Fresh-roasted news and exclusive deals, direct to your inbox.</p>
            <form onSubmit={handleNewsletter} style={{ display: 'flex' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" required style={{ flex: 1, padding: '10px 12px', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRight: 'none', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 12, outline: 'none', minWidth: 0 }} />
              <button type="submit" style={{ padding: '10px 14px', background: '#D4631D', border: 'none', cursor: 'pointer', color: '#F5E6D3', fontSize: 13, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#B5531A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#D4631D')}
              >→</button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1A1A1A', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#333' }}>© 2026 BeanVault. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 22 }}>
          {['Terms', 'Privacy', 'Cookies'].map(l => (
            <span key={l} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#333', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </div>

      <style>{`
        .bv-footer-link {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #4A3A2A;
          cursor: pointer;
          transition: color 0.2s;
        }
        .bv-footer-link:hover { color: #D4631D; }
      `}</style>
    </footer>
  );
}

function SocialIcon({ idx }: { idx: number }) {
  const icons = [
    <svg key={0} width="13" height="13" viewBox="0 0 24 24" fill="#9B8470"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>,
    <svg key={1} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9B8470" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    <svg key={2} width="13" height="13" viewBox="0 0 24 24" fill="#9B8470"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
  ];
  return (
    <div style={{ width: 32, height: 32, border: '1px solid #242424', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#D4631D')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#242424')}
    >
      {icons[idx]}
    </div>
  );
}
