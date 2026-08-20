import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Storytelling } from './components/Storytelling';
import { FeaturesGrid } from './components/FeaturesGrid';
import { VideoShowcase } from './components/VideoShowcase';
import { ScreenshotsGallery } from './components/ScreenshotsGallery';
import { DownloadPage } from './components/DownloadPage';
import { ComingSoonModal } from './components/ComingSoonModal';
import { IcGooglePlay, IcApple, IcDownload, IcChevronUp } from './components/Icons';
import { isMobileDevice, useComingSoon } from './utils/helpers';

export const App: React.FC = () => {
  const { t, lang } = useApp();
  const [activeState, setActiveState] = useState<'monitoring' | 'sos' | 'call' | 'companion' | 'locker'>('monitoring');
  const [currentTab, setCurrentTab] = useState<'home' | 'download'>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [footerModalOpen, setFooterModalOpen] = useState(false);

  const footerToast = useComingSoon(lang);

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
      <div className="ambient-glow glow-primary" aria-hidden="true" />
      <div className="ambient-glow glow-secondary" aria-hidden="true" />
      <div className="ambient-glow glow-danger" aria-hidden="true" />

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

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="footer glass-panel">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="AuraGuard Logo" className="logo-img" />
            <h3>{t('brandName')}</h3>
          </div>
          <p className="slogan-txt">{t('slogan')}</p>

          {/* Store badges row */}
          <div className="footer-store-row">
            <button
              onClick={handleFooterStoreClick}
              className="footer-store-btn footer-store-btn--gplay"
              aria-label={lang === 'ar' ? 'قريباً على Google Play' : 'Coming soon on Google Play'}
              type="button"
            >
              <IcGooglePlay size={18} />
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
              <IcApple size={18} />
              <div className="footer-store-btn__text">
                <span className="footer-store-btn__small">
                  {lang === 'ar' ? 'حمّل من' : 'DOWNLOAD ON THE'}
                </span>
                <span className="footer-store-btn__big">App Store</span>
              </div>
            </button>

            {/* Beta APK button — same row on desktop, full-width on mobile */}
            <button
              onClick={handleFooterStoreClick}
              className="footer-store-btn footer-store-btn--apk"
              aria-label={lang === 'ar' ? 'تحميل النسخة التجريبية' : 'Download Beta APK'}
              type="button"
            >
              <IcDownload size={15} />
              <div className="footer-store-btn__text">
                <span className="footer-store-btn__small">
                  {lang === 'ar' ? 'نسخة تجريبية' : 'BETA VERSION'}
                </span>
                <span className="footer-store-btn__big">
                  {lang === 'ar' ? 'تحميل APK' : 'Download APK'}
                </span>
              </div>
            </button>
          </div>

          <div className="footer-links">
            {/* TODO: replace with real pages when ready */}
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => alert(lang === 'ar' ? 'قريباً' : 'Coming soon')}
            >
              {t('privacyPolicy')}
            </button>
            <button
              type="button"
              className="footer-link-btn"
              onClick={() => alert(lang === 'ar' ? 'قريباً' : 'Coming soon')}
            >
              {t('termsOfService')}
            </button>
          </div>

          <div className="footer-bottom">
            <p>{t('footerRights')}</p>
          </div>
        </div>
      </footer>

      {/* ── Scroll-to-top ──────────────────────────────────────────────────── */}
      <button
        className={`scroll-top-btn ${showScrollTop ? 'scroll-top-btn--visible' : ''}`}
        onClick={scrollToTop}
        aria-label={lang === 'ar' ? 'العودة للأعلى' : 'Scroll to top'}
        type="button"
      >
        <IcChevronUp size={20} />
      </button>

      {/* ── Footer modal (mobile) ──────────────────────────────────────────── */}
      {footerModalOpen && (
        <ComingSoonModal lang={lang} onClose={() => setFooterModalOpen(false)} />
      )}

      {/* ── Footer toast (desktop) ────────────────────────────────────────── */}
      {footerToast.visible && (
        <div className="coming-soon-toast" role="status" aria-live="polite">
          {footerToast.message}
        </div>
      )}
    </div>
  );
};

export default App;
