import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug) ?? BLOG_POSTS[0];
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div>
      {/* Header */}
      <section style={{ padding: '72px 40px 52px', background: 'linear-gradient(180deg,#131313,#1A1A1A)', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '3px 11px', background: 'rgba(212,99,29,0.14)', border: '1px solid rgba(212,99,29,0.28)', borderRadius: 1, marginBottom: 15 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4631D' }}>{post.category}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,5vw,50px)', fontWeight: 700, color: '#F5E6D3', lineHeight: 1.15, marginBottom: 20 }}>{post.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#2a1008', border: '1px solid rgba(212,99,29,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(107,66,38,0.6)" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#C8B99A' }}>{post.author}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#444' }}>{post.authorRole}</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#444' }}>{post.date}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#D4631D', fontWeight: 500 }}>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <div style={{ height: 400, background: 'linear-gradient(160deg,#2a1008,#1a0804 50%,#0d0401)', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(60,26,11,0.08) 0,rgba(60,26,11,0.08) 1px,transparent 1px,transparent 14px)', backgroundSize: '14px 14px' }} />
        <span style={{ position: 'relative', fontFamily: 'monospace', fontSize: 11, color: 'rgba(107,66,38,0.38)' }}>featured image — {post.title}</span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '52px 40px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 52 }}>
          {post.content.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#9B8A7A', lineHeight: 1.85 }}>{para}</p>
          ))}
        </div>

        {/* Author card */}
        <div style={{ borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '26px 0', display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#2a1008,#1a0504)', border: '2px solid rgba(212,99,29,0.28)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(107,66,38,0.5)" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4631D', marginBottom: 4 }}>Written by</p>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: '#F5E6D3', marginBottom: 3 }}>{post.author}</h4>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>{post.authorRole}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#7B6A5A', lineHeight: 1.6 }}>Passionate about connecting coffee lovers with extraordinary beans from around the world.</p>
          </div>
        </div>

        {/* Share */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>Share:</span>
          {['Twitter', 'LinkedIn', 'Copy Link'].map(label => (
            <button key={label} style={{ padding: '7px 16px', background: '#1C1C1C', border: '1px solid #2A2A2A', color: '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 12, cursor: 'pointer', borderRadius: 1, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4631D'; e.currentTarget.style.color = '#D4631D'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9B8470'; }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* Related */}
      <section style={{ padding: '0 40px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>Related Articles</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 }}>
          {related.map(rp => (
            <article key={rp.id} onClick={() => navigate(`/blog/${rp.slug}`)} className="bv-card" style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 148, background: 'linear-gradient(160deg,#2a1008,#0d0401)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(107,66,38,0.35)' }}>blog image</span>
                <div style={{ position: 'absolute', top: 11, left: 11, padding: '2px 8px', background: 'rgba(212,99,29,0.85)', borderRadius: 1 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5E6D3' }}>{rp.category}</span>
                </div>
              </div>
              <div style={{ padding: '18px 18px 22px' }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#F5E6D3', lineHeight: 1.3, marginBottom: 8 }}>{rp.title}</h4>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#D4631D', fontWeight: 500 }}>Read More →</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
