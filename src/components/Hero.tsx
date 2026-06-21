import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneSimulator } from './PhoneSimulator';

interface HeroProps {
  activeState: 'monitoring' | 'sos' | 'call' | 'companion' | 'locker';
  setActiveState: (s: 'monitoring' | 'sos' | 'call' | 'companion' | 'locker') => void;
  onDownloadClick: () => void;
}

const controls = [
  {
    state: 'sos' as const,
    labelAr: 'استغاثة SOS',
    labelEn: 'Trigger SOS',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    color: '#ff4b72',
  },
  {
    state: 'call' as const,
    labelAr: 'مكالمة وهمية',
    labelEn: 'Fake Call',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 17.3 17.3 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    color: '#00f2fe',
  },
  {
    state: 'companion' as const,
    labelAr: 'المرافق',
    labelEn: 'Companion',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
        <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
      </svg>
    ),
    color: '#f55b8d',
  },
  {
    state: 'locker' as const,
    labelAr: 'الخزنة',
    labelEn: 'Locker',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    color: '#c241c6',
  },
] as const;

export const Hero: React.FC<HeroProps> = ({ activeState, setActiveState, onDownloadClick }) => {
  const { t, lang } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`hero-section ${isVisible ? 'hero-visible' : ''}`} ref={ref}>
      {/* Floating orbs */}
      <div className="hero-orb hero-orb--1" aria-hidden="true" />
      <div className="hero-orb hero-orb--2" aria-hidden="true" />

      <div className="hero-grid">
        {/* ── Text column ── */}
        <div className="hero-text-content">
          <div className="hero-badge">
            <span className="pulse-dot" />
            <span>{lang === 'ar' ? 'الشبكة الأمنية المجتمعية الأولى بمصر' : "Egypt's 1st P2P Safety Network"}</span>
          </div>

          <h2 className="hero-title">{t('heroTitle')}</h2>
          <p className="hero-desc">{t('heroSubtitle')}</p>

          {/* CTA buttons */}
          <div className="hero-action-buttons">
            <button onClick={onDownloadClick} className="btn-primary-gradient">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginInlineEnd: 8 }}>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              {t('getStarted')}
            </button>
            <a href="#video-showcase" className="btn-secondary-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginInlineEnd: 8 }}>
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
              {t('watchDemo')}
            </a>
          </div>

          {/* Simulator controls */}
          <div className="sim-controls glass-panel">
            <div className="sim-controls__header">
              <h4>{t('playgroundTitle')}</h4>
              <p>{t('playgroundSubtitle')}</p>
            </div>
            <div className="sim-controls__grid">
              {controls.map(c => (
                <button
                  key={c.state}
                  className={`sim-ctrl-btn ${activeState === c.state ? 'sim-ctrl-btn--active' : ''}`}
                  style={{ '--ctrl-color': c.color } as React.CSSProperties}
                  onClick={() => setActiveState(c.state)}
                >
                  <span className="sim-ctrl-icon">{c.icon}</span>
                  <span>{lang === 'ar' ? c.labelAr : c.labelEn}</span>
                </button>
              ))}
            </div>
            {activeState !== 'monitoring' && (
              <button className="sim-reset-btn" onClick={() => setActiveState('monitoring')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                </svg>
                {lang === 'ar' ? 'إعادة تعيين' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* ── Phone column ── */}
        <div className="hero-graphic-container">
          <PhoneSimulator activeState={activeState} setActiveState={setActiveState} />
        </div>
      </div>
    </section>
  );
};
