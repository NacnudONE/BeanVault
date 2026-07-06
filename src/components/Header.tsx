import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useScrollState } from '../hooks/useScrollState';

export default function Header() {
  const { cartCount } = useCart();
  const { scrolled } = useScrollState();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    transition: 'all 0.3s',
    background: scrolled ? 'rgba(20,20,20,0.97)' : 'rgba(20,20,20,0.25)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderBottom: scrolled ? '1px solid #242424' : '1px solid transparent',
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <span
            onClick={() => { navigate('/'); setMenuOpen(false); }}
            style={{ cursor: 'pointer', fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#F5E6D3', letterSpacing: '0.01em', flexShrink: 0, userSelect: 'none' }}
          >
            BEAN<span style={{ color: '#D4631D' }}>VAULT</span>
          </span>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 34, flex: 1, justifyContent: 'center' }} className="bv-dnav">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `bv-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B8470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <div onClick={() => navigate('/cart')} style={{ position: 'relative', cursor: 'pointer' }} className="bv-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9B8470" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <div style={{ position: 'absolute', top: -7, right: -7, width: 17, height: 17, borderRadius: '50%', background: '#D4631D', color: '#F5E6D3', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </div>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(o => !o)}
              className="bv-ham"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 5, padding: 4, flexShrink: 0 }}
              aria-label="Toggle menu"
            >
              <div style={{ width: 22, height: 2, background: '#B8A89A', borderRadius: 1 }} />
              <div style={{ width: 22, height: 2, background: '#B8A89A', borderRadius: 1 }} />
              <div style={{ width: 16, height: 2, background: '#B8A89A', borderRadius: 1 }} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div style={{ position: 'fixed', top: 68, left: 0, right: 0, zIndex: 99, background: '#141414', borderBottom: '1px solid #242424', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 22, animation: 'slideDown 0.2s ease' }}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={{ fontSize: 17, fontWeight: 500, color: '#F5E6D3', cursor: 'pointer', textDecoration: 'none' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        .bv-dnav { display: flex !important; }
        .bv-ham  { display: none !important; }
        @media (max-width: 640px) {
          .bv-dnav { display: none !important; }
          .bv-ham  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
