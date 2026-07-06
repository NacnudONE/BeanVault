import { useScrollState } from '../hooks/useScrollState';

export default function BackToTopButton() {
  const { showBTT } = useScrollState();
  if (!showBTT) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{ position: 'fixed', bottom: 26, left: 26, zIndex: 200, width: 42, height: 42, borderRadius: '50%', background: '#1C1C1C', border: '1px solid #D4631D', color: '#D4631D', fontSize: 17, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', transition: 'all 0.2s', animation: 'fadeIn 0.3s ease' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#D4631D'; e.currentTarget.style.color = '#F5E6D3'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#1C1C1C'; e.currentTarget.style.color = '#D4631D'; }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
