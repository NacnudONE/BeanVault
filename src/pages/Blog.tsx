import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';

const CATS = ['all', 'Brewing Tips', 'Coffee Culture', 'Recipes', 'News'];
const CAT_COUNTS: Record<string, number> = { all: 6, 'Brewing Tips': 2, 'Coffee Culture': 1, 'Recipes': 1, 'News': 2 };

export default function Blog() {
  const navigate = useNavigate();
  const [cat, setCat] = useState('all');

  const filtered = cat === 'all' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === cat);
  const popular = BLOG_POSTS.slice(0, 3);

  return (
    <div style={{ padding: '48px 40px 80px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 34 }}>
        <p className="bv-label">Knowledge &amp; Culture</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4.5vw,50px)', fontWeight: 700, color: '#F5E6D3', marginBottom: 26 }}>The BeanVault Journal</h1>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {CATS.map(c => {
            const active = cat === c;
            return (
              <button key={c} onClick={() => setCat(c)} style={{ padding: '8px 20px', border: 'none', borderRadius: 2, background: active ? '#D4631D' : '#1C1C1C', color: active ? '#F5E6D3' : '#9B8470', fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: active ? 700 : 400, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em' }}>
                {c === 'all' ? 'All Posts' : c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bv-blog-l">
        <div>
          <div className="bv-bgrid">
            {filtered.map(post => (
              <article key={post.id} onClick={() => navigate(`/blog/${post.slug}`)} className="bv-card" style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: 188, background: 'linear-gradient(160deg,#2a1008,#1a0804 50%,#0d0401)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,rgba(60,26,11,0.1) 0,rgba(60,26,11,0.1) 1px,transparent 1px,transparent 12px)', backgroundSize: '12px 12px' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 9, color: 'rgba(107,66,38,0.35)' }}>blog image</div>
                  <div style={{ position: 'absolute', top: 13, left: 13, padding: '3px 9px', background: 'rgba(212,99,29,0.9)', borderRadius: 1 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#F5E6D3' }}>{post.category}</span>
                  </div>
                </div>
                <div style={{ padding: '22px 22px 26px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, color: '#F5E6D3', marginBottom: 9, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#6B5A4E', lineHeight: 1.65, marginBottom: 16 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#C8B99A' }}>{post.author}<span style={{ color: '#444', fontWeight: 400 }}> · {post.date}</span></span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#D4631D', fontWeight: 500 }}>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 22, marginBottom: 22 }}>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 13 }}>Search</h4>
            <div style={{ display: 'flex' }}>
              <input type="text" placeholder="Search articles..." style={{ flex: 1, padding: '10px 13px', background: '#141414', border: '1px solid #2A2A2A', borderRight: 'none', color: '#F5E6D3', fontFamily: "'Inter', sans-serif", fontSize: 13, outline: 'none', minWidth: 0 }} />
              <button style={{ padding: '10px 14px', background: '#D4631D', border: 'none', cursor: 'pointer', color: '#F5E6D3', fontSize: 13 }}>→</button>
            </div>
          </div>

          <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 22, marginBottom: 22 }}>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 15 }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {CATS.map((c, i) => (
                <div key={c} onClick={() => setCat(c)} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < CATS.length - 1 ? '1px solid #222' : 'none', cursor: 'pointer' }}
                  onMouseEnter={e => { (e.currentTarget.querySelector('span') as HTMLElement).style.color = '#D4631D'; }}
                  onMouseLeave={e => { (e.currentTarget.querySelector('span') as HTMLElement).style.color = '#9B8470'; }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9B8470', transition: 'color 0.2s' }}>{c === 'all' ? 'All Posts' : c}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#444' }}>{CAT_COUNTS[c]}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#1C1C1C', border: '1px solid #272727', borderRadius: 2, padding: 22 }}>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5E6D3', marginBottom: 15 }}>Popular Posts</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {popular.map(pop => (
                <div key={pop.id} onClick={() => navigate(`/blog/${pop.slug}`)} style={{ display: 'flex', gap: 11, cursor: 'pointer', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <div style={{ width: 50, height: 50, flexShrink: 0, background: 'linear-gradient(135deg,#2a1008,#1a0504)', border: '1px solid #272727', borderRadius: 1 }} />
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: '#D0C0AA', lineHeight: 1.35, marginBottom: 4 }}>{pop.title}</p>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#444' }}>{pop.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
