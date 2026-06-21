import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Storytelling } from './components/Storytelling';
import { FeaturesGrid } from './components/FeaturesGrid';
import { VideoShowcase } from './components/VideoShowcase';
import { ScreenshotsGallery } from './components/ScreenshotsGallery';
import { DownloadPage } from './components/DownloadPage';
import { X } from 'lucide-react';

// ── Coming-soon toast hook ──
export function useComingSoon(lang: 'ar' | 'en') {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);
  const message = lang === 'ar'
    ? 'قريباً — التطبيق سيكون متاحاً قريباً على المتاجر'
    : 'Coming Soon — App will be available on stores soon';
  return { visible, show, message };
}

// ── Mobile detection helper ──
function isMobileDevice(): boolean {
  return navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
}

// ── Footer Coming-Soon Modal ──
interface FooterModalProps {
  lang: 'ar' | 'en';
  onClose: () => void;
}
const FooterComingSoonModal: React.FC<FooterModalProps> = ({ lang, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div className="cs-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="cs-modal" onClick={e => e.stopPropagation()}>
        <button className="cs-modal__close" onClick={onClose} aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}>
          <X size={18} />
        </button>
        <div className="cs-modal__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <h2 className="cs-modal__title">{lang === 'ar' ? 'قريباً!' : 'Coming Soon!'}</h2>
        <p className="cs-modal__body">
          {lang === 'ar'
            ? 'التطبيق سيكون متاحاً قريباً على جوجل بلاي وآب ستور. سجّل اهتمامك لتُعلَم عند الإطلاق.'
            : 'App coming soon on Google Play & App Store. Register your interest to be notified at launch.'}
        </p>
        {submitted ? (
          <p className="cs-modal__success">
            {lang === 'ar' ? 'شكراً! سنعلمك عند الإطلاق.' : 'Thanks! We will notify you at launch.'}
          </p>
        ) : (
          <form className="cs-modal__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="cs-modal__input"
              placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
            <button type="submit" className="cs-modal__submit">
              {lang === 'ar' ? 'أعلمني' : 'Notify Me'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// ── SVG icons for footer ──
const IcGooglePlayFooter = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="#ffffff" d="M3.18 23.76c.3.17.64.24.99.21l13.2-11.97L13.8 8.43 3.18 23.76zM20.58 10.4l-2.88-1.65L14.07 12l3.63 3.27 2.88-1.65c.82-.47.82-1.75 0-2.22zM2.01 1.37C1.7 1.7 1.5 2.2 1.5 2.85v18.3c0 .65.2 1.15.51 1.48l.09.08L13.32 11.1v-.21L2.01 1.37zm11.79 9.93l3.57-3.27-13.2-7.56c-.35-.2-.7-.24-1.05-.12l11.68 10.95z"/>
  </svg>
);
const IcAppleFooter = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="#ffffff" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);
const IcDownloadFooter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IcChevronUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const App: React.FC = () => {
  const { t, lang } = useApp();
  const [activeState, setActiveState] = useState<'monitoring' | 'sos' | 'call' | 'companion' | 'locker'>('monitoring');
  const [currentTab, setCurrentTab] = useState<'home' | 'download'>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [footerModalOpen, setFooterModalOpen] = useState(false);

  const footerToast = useComingSoon(lang);

  // Issue 8: footer buttons use modal on mobile, toast on desktop
  const handleFooterStoreClick = useCallback(() => {
    if (isMobileDevice()) {
      setFooterModalOpen(true);
    } else {
      footerToast.show();
    }
  }, [footerToast]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="app-layout">
      <div className="ambient-glow glow-primary" aria-hidden="true"></div>
      <div className="ambient-glow glow-secondary" aria-hidden="true"></div>
      <div className="ambient-glow glow-danger" aria-hidden="true"></div>

      <Header
        onDownloadClick={() => setCurrentTab('download')}
        setCurrentTab={setCurrentTab}
      />

      <main className="main-container">
        {currentTab === 'home' ? (
          <>
            <Hero
              activeState={activeState}
              setActiveState={setActiveState}
              onDownloadClick={() => setCurrentTab('download')}
            />
            <Storytelling />
            <FeaturesGrid onSelectFeature={(state) => setActiveState(state)} />
            <ScreenshotsGallery />
            <VideoShowcase />
          </>
        ) : (
          <DownloadPage onBackClick={() => setCurrentTab('home')} />
        )}
      </main>

      {/* Footer */}
      <footer className="footer glass-panel">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="AuraGuard Logo" className="logo-img" />
            <h3>{t('brandName')}</h3>
          </div>
          <p className="slogan-txt">{t('slogan')}</p>

          {/* Footer store badges */}
          <div className="footer-store-row">
            <button
              onClick={handleFooterStoreClick}
              className="footer-store-btn footer-store-btn--gplay"
              aria-label={lang === 'ar' ? 'قريباً على Google Play' : 'Coming soon on Google Play'}
              type="button"
            >
              <IcGooglePlayFooter />
              <div className="footer-store-btn__text">
                <span className="footer-store-btn__small">
                  {lang === 'ar' ? 'احصل عليه من' : 'GET IT ON'}
                </span>
                <span className="footer-store-btn__big">Google Play</span>
              </div>
            </button>
            <button
              onClick={handleFooterStoreClick}
              className="footer-store-btn footer-store-btn--apple"
              aria-label={lang === 'ar' ? 'قريباً على App Store' : 'Coming soon on App Store'}
              type="button"
            >
              <IcAppleFooter />
              <div className="footer-store-btn__text">
                <span className="footer-store-btn__small">
                  {lang === 'ar' ? 'حمّل من' : 'DOWNLOAD ON THE'}
                </span>
                <span className="footer-store-btn__big">App Store</span>
              </div>
            </button>
          </div>

          {/* Beta APK — full width, below store badges, prominent */}
          <button
            onClick={handleFooterStoreClick}
            className="footer-beta-btn"
            aria-label={lang === 'ar' ? 'تحميل النسخة التجريبية' : 'Download Beta APK'}
            type="button"
          >
            <IcDownloadFooter />
            <div className="footer-store-btn__text">
              <span className="footer-store-btn__small">
                {lang === 'ar' ? 'نسخة تجريبية' : 'BETA VERSION'}
              </span>
              <span className="footer-store-btn__big">
                {lang === 'ar' ? 'تحميل APK' : 'Download APK'}
              </span>
            </div>
          </button>

          <div className="footer-links">
            <a href="#privacy">{t('privacyPolicy')}</a>
            <a href="#terms">{t('termsOfService')}</a>
          </div>
          <div className="footer-bottom">
            <p>{t('footerRights')}</p>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top button */}
      <button
        className={`scroll-top-btn ${showScrollTop ? 'scroll-top-btn--visible' : ''}`}
        onClick={scrollToTop}
        aria-label={lang === 'ar' ? 'العودة للأعلى' : 'Scroll to top'}
        type="button"
      >
        <IcChevronUp />
      </button>

      {/* Footer modal (mobile) */}
      {footerModalOpen && (
        <FooterComingSoonModal lang={lang} onClose={() => setFooterModalOpen(false)} />
      )}

      {/* Footer toast (desktop) */}
      {footerToast.visible && (
        <div className="coming-soon-toast" role="status" aria-live="polite">
          {footerToast.message}
        </div>
      )}
    </div>
  );
};

export default App;
