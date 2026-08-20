import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, Maximize2, X } from 'lucide-react';
import { isMobileDevice, useComingSoon } from '../utils/helpers';
import { IcGooglePlay, IcApple, IcDownload } from './Icons';
import { ComingSoonModal } from './ComingSoonModal';
import { PhoneSimulator } from './PhoneSimulator';

// ── QR code URL ───────────────────────────────────────────────────────────────
const QR_IMAGE_URL = '/qr-code.png';

// ── QR display ────────────────────────────────────────────────────────────────
const QrDisplay: React.FC<{ size: number; lang: 'ar' | 'en' }> = ({ size, lang }) => (
  <div
    className="qr-display"
    style={{ width: size, height: size }}
    role="img"
    aria-label={lang === 'ar' ? 'QR code لتحميل أورا جارد' : 'QR code to download AuraGuard'}
  >
    <img
      src={QR_IMAGE_URL}
      alt="QR code"
      width={size}
      height={size}
      style={{ display: 'block', borderRadius: 8 }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
        const sib = (e.target as HTMLImageElement).nextElementSibling;
        if (sib) (sib as HTMLElement).style.display = 'block';
      }}
    />
    {/* Fallback SVG mosaic */}
    <svg style={{ display: 'none' }} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" fill="#fff" rx="8" />
      <rect x="8"  y="8"  width="30" height="30" rx="4" fill="#c241c6" />
      <rect x="13" y="13" width="20" height="20" rx="2" fill="#fff" />
      <rect x="16" y="16" width="14" height="14" rx="1" fill="#c241c6" />
      <rect x="82" y="8"  width="30" height="30" rx="4" fill="#c241c6" />
      <rect x="87" y="13" width="20" height="20" rx="2" fill="#fff" />
      <rect x="90" y="16" width="14" height="14" rx="1" fill="#c241c6" />
      <rect x="8"  y="82" width="30" height="30" rx="4" fill="#c241c6" />
      <rect x="13" y="87" width="20" height="20" rx="2" fill="#fff" />
      <rect x="16" y="90" width="14" height="14" rx="1" fill="#c241c6" />
      <text x="60" y="115" textAnchor="middle" fontSize="7" fill="#c241c6" fontWeight="bold">AuraGuard</text>
    </svg>
  </div>
);

// ── Reusable StoreBadge ───────────────────────────────────────────────────────
interface StoreBadgeProps {
  store: 'google' | 'apple';
  lang: 'ar' | 'en';
  onComingSoon: () => void;
}
const StoreBadge: React.FC<StoreBadgeProps> = ({ store, lang, onComingSoon }) => (
  <button
    type="button"
    onClick={onComingSoon}
    className={`dl-store ${store === 'google' ? 'dl-store--gplay' : 'dl-store--apple'}`}
    aria-label={
      store === 'google'
        ? (lang === 'ar' ? 'قريباً على Google Play' : 'Coming soon on Google Play')
        : (lang === 'ar' ? 'قريباً على App Store' : 'Coming soon on App Store')
    }
  >
    {store === 'google' ? <IcGooglePlay size={24} /> : <IcApple size={24} />}
    <div className="dl-store__text">
      <span className="dl-store__small">
        {lang === 'ar' ? 'قريباً على' : 'COMING SOON ON'}
      </span>
      <span className="dl-store__big">{store === 'google' ? 'Google Play' : 'App Store'}</span>
    </div>
    <span className="dl-store__soon-badge">{lang === 'ar' ? 'قريباً' : 'Soon'}</span>
  </button>
);

// ── Main DownloadPage ─────────────────────────────────────────────────────────
interface DownloadPageProps { onBackClick: () => void; }

export const DownloadPage: React.FC<DownloadPageProps> = ({ onBackClick }) => {
  const { t, lang } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [qrExpanded, setQrExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const comingSoon = useComingSoon(lang);

  const handleComingSoon = useCallback(() => {
    if (isMobileDevice()) {
      setModalOpen(true);
    } else {
      comingSoon.show();
    }
  }, [comingSoon]);

  // Fade-in entrance
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Close overlays on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setQrExpanded(false); setModalOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const checkItems = lang === 'ar'
    ? [
        'حجم التطبيق صغير جداً لتوفير المساحة',
        'تشفير فوري لتسجيلات الطوارئ',
        'يعمل بدون إنترنت عبر SMS التلقائي',
        'رادار مجتمعي لتنبيه الأقرب في نطاق 1 كم',
        'تسجيل أدلة سري والشاشة مغلقة',
        'مكالمة وهمية لتفادي المواقف الصعبة',
      ]
    : [
        'Extremely small app size',
        'Instant local encryption for emergency logs',
        'Works fully offline via automated SMS',
        'Community radar alerting nearby people within 1km',
        'Silent evidence recording with screen off',
        'Fake call to exit uncomfortable situations',
      ];

  return (
    <div className={`dl-page ${isVisible ? 'fade-in-up' : 'pre-animate'}`} ref={ref}>

      {/* Coming-soon modal (mobile) */}
      {modalOpen && (
        <ComingSoonModal lang={lang} onClose={() => setModalOpen(false)} />
      )}

      {/* QR lightbox */}
      {qrExpanded && (
        <div
          className="qr-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="QR Code"
          onClick={() => setQrExpanded(false)}
        >
          <div className="qr-overlay__box" onClick={e => e.stopPropagation()}>
            <button
              className="qr-overlay__close"
              onClick={() => setQrExpanded(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <QrDisplay size={260} lang={lang} />
            <p className="qr-overlay__label">
              {lang === 'ar' ? 'وجّه كاميرا هاتفك للتحميل المباشر' : 'Point your phone camera to download'}
            </p>
          </div>
        </div>
      )}

      {/* Desktop coming-soon toast */}
      {comingSoon.visible && (
        <div className="coming-soon-toast" role="status" aria-live="polite">
          {comingSoon.message}
        </div>
      )}

      {/* Back button */}
      <div className="dl-back">
        <button onClick={onBackClick} className="dl-back-btn" type="button">
          <ArrowLeft
            size={16}
            style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }}
          />
          <span>{t('backToSite')}</span>
        </button>
      </div>

      {/* ── HERO ROW ──────────────────────────────────────────────────────── */}
      <div className="dl-hero">

        {/* Left: text + store buttons */}
        <div className="dl-hero__text">
          <div className="dl-badge">
            <IcDownload size={15} />
            <span>{lang === 'ar' ? 'قريباً — تحميل مجاني' : 'Coming Soon — Free Download'}</span>
          </div>

          <h1 className="dl-title">
            {lang === 'ar' ? 'حمّل أورا جارد الآن' : 'Download AuraGuard Now'}
          </h1>
          <p className="dl-sub">
            {lang === 'ar'
              ? 'ابدأ رحلتك بأمان تام — رفيقك الصامت في كل خطوة'
              : 'Start your journey with complete safety — your silent partner every step'}
          </p>

          {/* Store badges */}
          <div className="dl-stores">
            <StoreBadge store="google" lang={lang} onComingSoon={handleComingSoon} />
            <StoreBadge store="apple"  lang={lang} onComingSoon={handleComingSoon} />
          </div>

          {/* Beta APK button */}
          <button type="button" onClick={handleComingSoon} className="dl-beta-btn">
            <IcDownload size={16} />
            {lang === 'ar' ? 'تحميل النسخة التجريبية (APK)' : 'Download Beta (APK)'}
          </button>

          {/* QR — desktop only (hidden on mobile via CSS) */}
          <div className="dl-hero-qr glass-panel">
            <button
              className="dl-hero-qr__thumb"
              onClick={() => setQrExpanded(true)}
              aria-label={lang === 'ar' ? 'تكبير QR' : 'Expand QR'}
              type="button"
            >
              <QrDisplay size={80} lang={lang} />
              <span className="dl-hero-qr__zoom"><Maximize2 size={13} /></span>
            </button>
            <div className="dl-hero-qr__text">
              <strong>{lang === 'ar' ? 'امسح QR للتحميل على هاتفك' : 'Scan QR to download on mobile'}</strong>
              <span>{lang === 'ar' ? 'وجّه كاميرا هاتفك مباشرة' : 'Point your phone camera directly'}</span>
              <button
                className="dl-qr-expand-btn"
                type="button"
                onClick={() => setQrExpanded(true)}
              >
                <Maximize2 size={11} />
                {lang === 'ar' ? 'تكبير' : 'Enlarge'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Phone mockup */}
        <div className="dl-hero__phone">
          <div className="dl-phone-label">
            <span>{lang === 'ar' ? 'معاينة التطبيق الفعلي' : 'Live App Preview'}</span>
          </div>
          <PhoneSimulator activeState="monitoring" setActiveState={() => {}} />
        </div>
      </div>

      {/* ── WHY AURAGUARD checklist ───────────────────────────────────────── */}
      <div className="dl-details-row">
        <div className="dl-checklist glass-panel">
          <h3>{lang === 'ar' ? 'ليه أورا جارد؟' : 'Why AuraGuard?'}</h3>
          <div className="dl-checks">
            {checkItems.map((item, i) => (
              <div key={i} className="dl-check-item">
                <CheckCircle2 size={16} color="#c241c6" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
