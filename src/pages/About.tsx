import { useNavigate } from 'react-router-dom';
import { TEAM } from '../data/team';
import { TIMELINE } from '../data/timeline';
import { VALUES } from '../data/values';

export default function About() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '96px 40px 80px', background: 'linear-gradient(135deg,#0D0D0D,#1A1A1A 40%,#2C1206 80%,#1A1A1A)', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p className="bv-label">Since 2019</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(44px,7vw,80px)', fontWeight: 700, color: '#F5E6D3', lineHeight: 1.05, marginBottom: 20 }}>Our Story</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#7B6A5A', lineHeight: 1.7 }}>A passion project born in a garage. A mission to connect coffee lovers with the world's finest beans.</p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <p className="bv-label">The Mission</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 20, lineHeight: 1.2 }}>Built on a belief that great coffee changes everything.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7B6A5A', lineHeight: 1.8, marginBottom: 16 }}>BeanVault was founded in 2019 by Maria Santos, after a decade buying specialty coffee for importers. Frustrated by the disconnect between farmers and consumers, she set out to build something different — a company where every relationship is direct, every bean is traceable, and every cup tells a story.</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7B6A5A', lineHeight: 1.8 }}>What started in a small Austin garage has grown into a beloved brand — but our core belief hasn't changed: the world is a better place when people drink better coffee.</p>
          </div>
          <div style={{ aspectRatio: '0.85', background: 'linear-gradient(160deg,#2a1008,#1a0804 50%,#0d0401)', border: '1px solid #272727', borderRadius: 2, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(60,26,11,0.1) 0,rgba(60,26,11,0.1) 1px,transparent 1px,transparent 12px)', backgroundSize: '12px 12px' }} />
            <span style={{ position: 'relative', fontFamily: 'monospace', fontSize: 11, color: 'rgba(107,66,38,0.4)' }}>roastery photo</span>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 40px', background: '#131313', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p className="bv-label">The People</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5E6D3' }}>Meet the Team</h2>
          </div>
          <div className="bv-team">
            {TEAM.map(m => (
              <div key={m.id} style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, overflow: 'hidden', textAlign: 'center', padding: '0 0 30px' }}>
                <div style={{ height: 180, background: 'linear-gradient(180deg,#2a1008,#1a0804)', position: 'relative', overflow: 'hidden', marginBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                  <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#1A1A1A', border: '2px solid rgba(212,99,29,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(107,66,38,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(107,66,38,0.35)' }}>team photo</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: '#F5E6D3', marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4631D', marginBottom: 13 }}>{m.role}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7B6A5A', lineHeight: 1.65, padding: '0 22px' }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p className="bv-label">Milestones</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5E6D3' }}>Our Journey</h2>
        </div>
        <div className="bv-tline" style={{ borderTop: '1px solid #222', paddingTop: 40 }}>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ padding: '0 28px 0 0', borderRight: '1px solid #222', position: 'relative' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#D4631D', position: 'absolute', top: -46, left: 0, boxShadow: '0 0 0 4px #1A1A1A' }} />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#D4631D', marginBottom: 5 }}>{t.year}</p>
              <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 9 }}>{t.title}</h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B5A4E', lineHeight: 1.65 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 40px', background: '#131313', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p className="bv-label">What We Stand For</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5E6D3' }}>Our Values</h2>
          </div>
          <div className="bv-vals">
            {VALUES.map(v => (
              <div key={v.num} style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: '34px 30px' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#3C1A0B', border: '1px solid rgba(212,99,29,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 700, color: '#D4631D' }}>{v.num}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: '#F5E6D3', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7B6A5A', lineHeight: 1.72 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: '#3C1A0B', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,99,29,0.7)', marginBottom: 12 }}>Ready?</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 20 }}>Taste the Difference</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,230,211,0.55)', marginBottom: 34 }}>Experience coffee the way it was meant to be — fresh-roasted, thoughtfully sourced.</p>
        <button className="bv-btn-primary" onClick={() => navigate('/shop')}>Shop Now</button>
      </section>
    </div>
  );
}
