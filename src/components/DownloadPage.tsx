import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, Maximize2, X } from 'lucide-react';
import { useComingSoon } from '../App';
import { PhoneSimulator } from './PhoneSimulator';

// ── QR code URL ──
const QR_IMAGE_URL = '/qr-code.png';

// ── Mobile detection helper ──
function isMobileDevice(): boolean {
  return navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
}

// ── SVG icon atoms ──
const IcGooglePlay = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#fff" d="M3.18 23.76c.3.17.64.24.99.21l13.2-11.97L13.8 8.43 3.18 23.76zM20.58 10.4l-2.88-1.65L14.07 12l3.63 3.27 2.88-1.65c.82-.47.82-1.75 0-2.22zM2.01 1.37C1.7 1.7 1.5 2.2 1.5 2.85v18.3c0 .65.2 1.15.51 1.48l.09.08L13.32 11.1v-.21L2.01 1.37zm11.79 9.93l3.57-3.27-13.2-7.56c-.35-.2-.7-.24-1.05-.12l11.68 10.95z" />
  </svg>
);
const IcApple = ({ size = 28 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#fff" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const IcDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IcBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

// ── Coming-Soon Modal (mobile) ──
interface ComingSoonModalProps {
  lang: 'ar' | 'en';
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ lang, onClose }) => {
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
          <IcBell />
        </div>
        <h2 className="cs-modal__title">
          {lang === 'ar' ? 'قريباً!' : 'Coming Soon!'}
        </h2>
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

// ── Reusable StoreBadge component ──
interface StoreBadgeProps {
  store: 'google' | 'apple';
  lang: 'ar' | 'en';
  onComingSoon: () => void;
  size?: 'normal' | 'full';
}
const StoreBadge: React.FC<StoreBadgeProps> = ({ store, lang, onComingSoon, size = 'normal' }) => (
  <button
    type="button"
    onClick={onComingSoon}
    className={`dl-store ${store === 'google' ? 'dl-store--gplay' : 'dl-store--apple'} ${size === 'full' ? 'dl-store--full' : ''}`}
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

// ── QR display ──
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
      width={size} height={size}
      style={{ display: 'block', borderRadius: 8 }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
        const sib = (e.target as HTMLImageElement).nextElementSibling;
        if (sib) (sib as HTMLElement).style.display = 'block';
      }}
    />
    {/* Fallback SVG mosaic */}
    <svg style={{ display: 'none' }} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" fill="#fff" rx="8"/>
      <rect x="8" y="8" width="30" height="30" rx="4" fill="#c241c6"/>
      <rect x="13" y="13" width="20" height="20" rx="2" fill="#fff"/>
      <rect x="16" y="16" width="14" height="14" rx="1" fill="#c241c6"/>
      <rect x="82" y="8" width="30" height="30" rx="4" fill="#c241c6"/>
      <rect x="87" y="13" width="20" height="20" rx="2" fill="#fff"/>
      <rect x="90" y="16" width="14" height="14" rx="1" fill="#c241c6"/>
      <rect x="8" y="82" width="30" height="30" rx="4" fill="#c241c6"/>
      <rect x="13" y="87" width="20" height="20" rx="2" fill="#fff"/>
      <rect x="16" y="90" width="14" height="14" rx="1" fill="#c241c6"/>
      {[45,50,55,60,65,70,75,45,55,65,75,48,52,58,62,68,72,50,60,70,45,48,52,56,60,64,68,72,76].map((x,i) => (
        <rect key={i} x={x} y={[45,45,45,45,45,45,45,50,50,50,50,55,55,55,55,55,55,60,60,60,65,68,68,68,68,68,68,68,68][i]} width="4" height="4" rx="1" fill="#c241c6" opacity="0.8"/>
      ))}
      <text x="60" y="115" textAnchor="middle" fontSize="7" fill="#c241c6" fontWeight="bold">AuraGuard</text>
    </svg>
  </div>
);

// ── QrSection reusable component (kept for backward compat) ──
interface QrSectionProps {
  lang: 'ar' | 'en';
  onExpand: () => void;
  compact?: boolean;
}
export const QrSection: React.FC<QrSectionProps> = ({ lang, onExpand, compact = false }) => (
  <div className={`dl-qr-section glass-panel ${compact ? 'dl-qr-section--compact' : ''}`}>
    <button className="dl-qr-btn" onClick={onExpand} aria-label={lang === 'ar' ? 'تكبير QR' : 'Expand QR'}>
      <QrDisplay size={compact ? 80 : 100} lang={lang} />
      <span className="dl-qr-btn__hover"><Maximize2 size={16} /></span>
    </button>
    <div className="dl-qr-info">
      <strong>{lang === 'ar' ? 'امسح QR للتحميل' : 'Scan QR to Download'}</strong>
      <span>{lang === 'ar' ? 'وجّه كاميرا هاتفك مباشرة' : 'Point your phone camera directly'}</span>
      <button className="dl-qr-expand-btn" onClick={onExpand}>
        <Maximize2 size={12} />
        {lang === 'ar' ? 'تكبير' : 'Enlarge'}
      </button>
    </div>
  </div>
);

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

  useEffect(() => {
    setIsVisible(false);
    const t2 = setTimeout(() => setIsVisible(true), 100);
    return () => { clearTimeout(t2); };
  }, []);

  // Close QR overlay on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setQrExpanded(false); setModalOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`dl-page ${isVisible ? 'fade-in-up' : 'pre-animate'}`} ref={ref}>

      {/* Coming-soon modal for mobile */}
      {modalOpen && (
        <ComingSoonModal lang={lang} onClose={() => setModalOpen(false)} />
      )}

      {/* QR lightbox overlay */}
      {qrExpanded && (
        <div className="qr-overlay" role="dialog" aria-modal="true" aria-label="QR Code" onClick={() => setQrExpanded(false)}>
          <div className="qr-overlay__box" onClick={e => e.stopPropagation()}>
            <button className="qr-overlay__close" onClick={() => setQrExpanded(false)} aria-label="Close">
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
        <button onClick={onBackClick} className="dl-back-btn">
          <ArrowLeft size={16} style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
          <span>{t('backToSite')}</span>
        </button>
      </div>

      {/* HERO ROW */}
      <div className="dl-hero">

        {/* Left: text + store buttons */}
        <div className="dl-hero__text">
          <div className="dl-badge">
            <IcDownload />
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
            <StoreBadge store="apple" lang={lang} onComingSoon={handleComingSoon} />
          </div>

          {/* Beta APK button */}
          <button type="button" onClick={handleComingSoon} className="dl-beta-btn">
            <IcDownload />
            {lang === 'ar' ? 'تحميل النسخة التجريبية (APK)' : 'Download Beta (APK)'}
          </button>

          {/* QR shown ONLY on desktop (hidden on mobile via CSS) */}
          <div className="dl-hero-qr glass-panel">
            <button
              className="dl-hero-qr__thumb"
              onClick={() => setQrExpanded(true)}
              aria-label={lang === 'ar' ? 'تكبير QR' : 'Expand QR'}
            >
              <QrDisplay size={80} lang={lang} />
              <span className="dl-hero-qr__zoom"><Maximize2 size={13} /></span>
            </button>
            <div className="dl-hero-qr__text">
              <strong>{lang === 'ar' ? 'امسح QR للتحميل على هاتفك' : 'Scan QR to download on mobile'}</strong>
              <span>{lang === 'ar' ? 'وجّه كاميرا هاتفك مباشرة' : 'Point your phone camera directly'}</span>
              <button className="dl-qr-expand-btn" onClick={() => setQrExpanded(true)}>
                <Maximize2 size={11} />
                {lang === 'ar' ? 'تكبير' : 'Enlarge'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Phone mockup — using PhoneSimulator to match hero */}
        <div className="dl-hero__phone">
          <div className="dl-phone-label">
            <span>{lang === 'ar' ? 'معاينة التطبيق الفعلي' : 'Live App Preview'}</span>
          </div>
          <PhoneSimulator activeState="monitoring" setActiveState={() => {}} />
        </div>
      </div>

      {/* DETAILS ROW */}
      <div className="dl-details-row dl-details-row--single">
        <div className="dl-checklist glass-panel">
          <h3>{lang === 'ar' ? 'ليه أورا جارد؟' : 'Why AuraGuard?'}</h3>
          <div className="dl-checks">
            {[
              { ar: 'حجم التطبيق صغير جداً لتوفير المساحة', en: 'Extremely small app size' },
              { ar: 'تشفير فوري لتسجيلات الطوارئ', en: 'Instant local encryption for logs' },
              { ar: 'يعمل بدون إنترنت عبر SMS التلقائي', en: 'Works offline via automated SMS' },
              { ar: 'رادار مجتمعي لتنبيه الأشخاص القريبين في نطاق 1 كم', en: 'Community radar alerting nearby people within 1km' },
              { ar: 'تسجيل أدلة سري والشاشة مغلقة', en: 'Silent evidence recording with screen off' },
              { ar: 'مكالمة وهمية لتفادي المواقف الصعبة', en: 'Fake call to exit uncomfortable situations' },
            ].map((item, i) => (
              <div key={i} className="dl-check-item">
                <CheckCircle2 size={16} color="#c241c6" aria-hidden="true" />
                <span>{lang === 'ar' ? item.ar : item.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
