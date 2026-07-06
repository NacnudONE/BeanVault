import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { FAQ } from '../data/faq';

export default function Contact() {
  const { showToast } = useToast();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const inputStyle: React.CSSProperties = { width: '100%', padding: '13px 14px', background: '#1C1C1C', border: '1px solid #2A2A2A', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 14, outline: 'none', borderRadius: 1 };
  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 7 };

  return (
    <div style={{ padding: '60px 40px 96px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 52, textAlign: 'center' }}>
        <p className="bv-label">Get in Touch</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px,5vw,54px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 12 }}>Contact Us</h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#6B5A4E' }}>We'd love to hear from you — questions, feedback, or just to talk coffee.</p>
      </div>

      <div className="bv-contact" style={{ marginBottom: 72 }}>
        {/* Form */}
        <form onSubmit={e => { e.preventDefault(); showToast("Message sent! We'll get back to you soon."); }} style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
            <div><label style={labelStyle}>Name</label><input type="text" placeholder="Your name" style={inputStyle} /></div>
            <div><label style={labelStyle}>Email</label><input type="email" placeholder="your@email.com" style={inputStyle} /></div>
          </div>
          <div>
            <label style={labelStyle}>Subject</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }}>
              <option>General Inquiry</option>
              <option>Order Issue</option>
              <option>Wholesale</option>
              <option>Subscription</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Message</label>
            <textarea rows={6} placeholder="Tell us how we can help..." style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </div>
          <button type="submit" className="bv-btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
        </form>

        {/* Info + map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 30 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: '#F5E6D3', marginBottom: 22 }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, label: 'Address', text: <>2401 Roastery Lane<br />Austin, TX 78701</> },
                { icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.9 19.79 19.79 0 0 1 1.62 3.24 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />, label: 'Phone', text: '(512) 555-0142' },
                { icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>, label: 'Email', text: 'hello@beanvault.co' },
                { icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>, label: 'Hours', text: <>Mon–Fri: 8am–6pm CT<br />Sat–Sun: 9am–4pm CT</> },
              ].map(({ icon, label, text }) => (
                <div key={label} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D4631D" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 3 }}>{icon}</svg>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#F5E6D3', marginBottom: 2 }}>{label}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7B6A5A', lineHeight: 1.5 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 210, background: 'linear-gradient(135deg,#141414,#1E1E1E)', border: '1px solid #272727', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4631D" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#444' }}>Google Map placeholder</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#555' }}>2401 Roastery Lane, Austin TX</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 38 }}>
          <p className="bv-label">Common Questions</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 700, color: '#F5E6D3' }}>FAQ</h2>
        </div>
        <div style={{ borderTop: '1px solid #222' }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #222' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#F5E6D3', lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ color: '#D4631D', fontSize: 22, flexShrink: 0, lineHeight: 1, fontWeight: 300, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div style={{ maxHeight: openFaq === i ? 200 : 0, opacity: openFaq === i ? 1 : 0, overflow: 'hidden', transition: 'all 0.32s ease', paddingBottom: openFaq === i ? 18 : 0 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7B6A5A', lineHeight: 1.75 }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
