import { useState, useCallback } from 'react';

// ── Mobile detection ──────────────────────────────────────────────────────────
export function isMobileDevice(): boolean {
  return navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
}

// ── Coming-soon toast hook ────────────────────────────────────────────────────
export function useComingSoon(lang: 'ar' | 'en') {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  const message =
    lang === 'ar'
      ? 'قريباً — التطبيق سيكون متاحاً قريباً على المتاجر'
      : 'Coming Soon — App will be available on stores soon';

  return { visible, show, message };
}
