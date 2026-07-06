import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils';

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<Step, string> = { 1: 'SHIPPING', 2: 'DELIVERY', 3: 'PAYMENT', 4: 'CONFIRM' };

function StepCircle({ n, current }: { n: Step; current: Step }) {
  const done = current >= n;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: '0 0 auto' }}>
      <div style={{ width: 33, height: 33, borderRadius: '50%', background: done ? '#D4631D' : '#222', border: done ? 'none' : '1px solid #333', color: done ? '#F5E6D3' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700 }}>{n}</div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: done ? 700 : 400, letterSpacing: '0.08em', textTransform: 'uppercase', color: done ? '#F5E6D3' : '#3A3A3A' }}>{STEP_LABELS[n]}</span>
    </div>
  );
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const sub = cartTotal();
  const ship = sub >= 50 ? 0 : sub > 0 ? 5.99 : 0;

  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 13px', background: '#141414', border: '1px solid #2A2A2A', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', borderRadius: 1 };
  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 6 };

  const placeOrder = () => {
    showToast('Order placed! Confirmation sent to your email.');
    clearCart();
    setTimeout(() => navigate('/'), 200);
  };

  return (
    <div style={{ padding: '48px 40px 96px', maxWidth: 1080, margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 36 }}>Checkout</h1>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 44, maxWidth: 580, gap: 0 }}>
        {([1, 2, 3, 4] as Step[]).map((n, i, arr) => (
          <>
            <StepCircle key={n} n={n} current={step} />
            {i < arr.length - 1 && (
              <div key={`conn-${n}`} style={{ flex: 1, height: 1, background: step > n ? '#D4631D' : '#222', marginTop: 16, marginBottom: 'auto', minWidth: 20 }} />
            )}
          </>
        ))}
      </div>

      <div className="bv-check-l">
        {/* Form panel */}
        <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 34 }}>
          {step === 1 && (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>Shipping Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={labelStyle}>First Name</label><input type="text" placeholder="Jane" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Last Name</label><input type="text" placeholder="Smith" style={inputStyle} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={labelStyle}>Email</label><input type="email" placeholder="jane@email.com" style={inputStyle} /></div>
                  <div><label style={labelStyle}>Phone</label><input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} /></div>
                </div>
                <div><label style={labelStyle}>Address</label><input type="text" placeholder="123 Coffee St, Apt 4B" style={inputStyle} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <div><label style={labelStyle}>City</label><input type="text" placeholder="Austin" style={inputStyle} /></div>
                  <div><label style={labelStyle}>State</label><input type="text" placeholder="TX" style={inputStyle} /></div>
                  <div><label style={labelStyle}>ZIP</label><input type="text" placeholder="78701" style={inputStyle} /></div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>Shipping Method</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ padding: '18px 22px', border: '1px solid #D4631D', background: 'rgba(212,99,29,0.08)', borderRadius: 1, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
                    <div style={{ width: 17, height: 17, borderRadius: '50%', border: '2px solid #D4631D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4631D' }} /></div>
                    <div><p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5E6D3', marginBottom: 2 }}>Standard Shipping</p><p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7B6A5A' }}>3–5 business days</p></div>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#6B9B7A' }}>Free (orders $50+)</span>
                </div>
                <div style={{ padding: '18px 22px', border: '1px solid #2A2A2A', background: '#141414', borderRadius: 1, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
                    <div style={{ width: 17, height: 17, borderRadius: '50%', border: '2px solid #333' }} />
                    <div><p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#F5E6D3', marginBottom: 2 }}>Express Shipping</p><p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#7B6A5A' }}>1–2 business days</p></div>
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#F5E6D3' }}>$12.99</span>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>Payment Details</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div>
                  <label style={labelStyle}>Card Number</label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#141414', border: '1px solid #2A2A2A', padding: '12px 13px', borderRadius: 1, gap: 8 }}>
                    <input type="text" placeholder="4242 4242 4242 4242" style={{ flex: 1, background: 'transparent', border: 'none', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none' }} />
                    <svg width="30" height="19" viewBox="0 0 30 19" fill="none"><rect width="30" height="19" rx="3" fill="#1a1a2e" /><rect x="0" y="5.5" width="30" height="5" fill="#16213e" /><rect x="18" y="10" width="10" height="5" rx="1" fill="#FFD700" opacity="0.8" /></svg>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={labelStyle}>Expiry</label><input type="text" placeholder="MM / YY" style={inputStyle} /></div>
                  <div><label style={labelStyle}>CVV</label><input type="text" placeholder="•••" style={inputStyle} /></div>
                </div>
                <div><label style={labelStyle}>Name on Card</label><input type="text" placeholder="Jane Smith" style={inputStyle} /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', background: 'rgba(107,155,122,0.08)', border: '1px solid rgba(107,155,122,0.18)', borderRadius: 1 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B9B7A" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B9B7A' }}>256-bit SSL encrypted secure payment</span>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#F5E6D3', marginBottom: 8 }}>Review Your Order</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B5A4E', marginBottom: 26 }}>Please review before placing your order.</p>
              <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 1, padding: 18, marginBottom: 18 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 13 }}>Items</p>
                {cart.map(item => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #1E1E1E' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#F5E6D3' }}>
                      {item.name}<span style={{ fontSize: 11, color: '#444', fontWeight: 400 }}> · {item.w} × {item.qty}</span>
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#F5E6D3' }}>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#141414', border: '1px solid #222', borderRadius: 1, padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7B6A5A' }}>Subtotal</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#F5E6D3' }}>{formatPrice(sub)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #242424' }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7B6A5A' }}>Shipping</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B9B7A' }}>{ship === 0 ? (sub > 0 ? 'Free' : '—') : formatPrice(ship)}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#F5E6D3' }}>Total</span><span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#F5E6D3' }}>{formatPrice(sub + ship)}</span></div>
              </div>
            </>
          )}

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between', marginTop: 30, paddingTop: 22, borderTop: '1px solid #222' }}>
            <button onClick={() => step === 1 ? navigate('/cart') : setStep(s => Math.max(1, s - 1) as Step)} style={{ padding: '12px 24px', background: 'transparent', border: '1px solid #2A2A2A', color: '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: 'pointer', borderRadius: 1, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4631D'; e.currentTarget.style.color = '#D4631D'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9B8470'; }}
            >{step === 1 ? '← Cart' : '← Back'}</button>

            {step < 4
              ? <button onClick={() => setStep(s => Math.min(4, s + 1) as Step)} className="bv-btn-primary">{step === 3 ? 'Review Order →' : 'Continue →'}</button>
              : <button onClick={placeOrder} className="bv-btn-primary">Place Order →</button>
            }
          </div>
        </div>

        {/* Order summary sidebar */}
        <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 22, position: 'sticky', top: 86 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#F5E6D3', marginBottom: 18 }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 15, paddingBottom: 15, borderBottom: '1px solid #222' }}>
            {cart.map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#9B8470', lineHeight: 1.4, flex: 1 }}>{item.name}<br /><span style={{ fontSize: 10, color: '#444' }}>{item.w} × {item.qty}</span></div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#F5E6D3', flexShrink: 0 }}>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B5A4E' }}>Subtotal</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#F5E6D3' }}>{formatPrice(sub)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B5A4E' }}>Shipping</span><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#6B9B7A' }}>{ship === 0 ? (sub > 0 ? 'Free' : '—') : formatPrice(ship)}</span></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#F5E6D3' }}>Total</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#F5E6D3' }}>{formatPrice(sub + ship)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
