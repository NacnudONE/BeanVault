import { useEffect, useState } from 'react';

export function useScrollState() {
  const [scrolled, setScrolled] = useState(false);
  const [showBTT, setShowBTT] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowBTT(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrolled, showBTT };
}
