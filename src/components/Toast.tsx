import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toast } = useToast();
  if (!toast) return null;
  return (
    <div style={{ position: 'fixed', bottom: 26, right: 26, zIndex: 200, background: '#1E1E1E', border: '1px solid rgba(212,99,29,0.45)', borderRadius: 2, padding: '13px 18px', fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#F5E6D3', boxShadow: '0 8px 36px rgba(0,0,0,0.5)', animation: 'fadeUp 0.3s ease', maxWidth: 300, display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4631D', flexShrink: 0 }} />
      {toast}
    </div>
  );
}
