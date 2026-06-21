import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  onDownloadClick: () => void;
  setCurrentTab: (tab: 'home' | 'download') => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadClick, setCurrentTab }) => {
  const { lang, theme, setLang, setTheme, t } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize past breakpoint
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLang  = () => setLang(lang === 'ar' ? 'en' : 'ar');

  const navLinks = [
    { labelKey: 'howItHelps',  id: 'how-it-helps' },
    { labelKey: 'features',    id: 'features' },
    { label: lang === 'ar' ? 'لقطات الشاشة' : 'Screenshots', id: 'screenshots' },
    { label: lang === 'ar' ? 'فيديوهات' : 'Videos', id: 'video-showcase' },
    { label: lang === 'ar' ? 'تحميل' : 'Download', id: '__download__' },
  ] as const;

  const handleNavClick = (id: string) => {
    if (id === '__download__') {
      onDownloadClick();
      setMenuOpen(false);
      return;
    }
    setCurrentTab('home');
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      <header className="hdr glass-panel">
        {/* Logo — always visible */}
        <button
          className="hdr__logo"
          onClick={() => { setCurrentTab('home'); setMenuOpen(false); }}
          aria-label={lang === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
        >
          <img src="/logo.png" alt="AuraGuard" className="hdr__logo-img" />
          <div className="hdr__logo-text">
            <span className="hdr__brand">{t('brandName')}</span>
            <span className="hdr__slogan">{t('slogan')}</span>
          </div>
        </button>

        {/* Desktop nav — hidden on mobile via CSS */}
        <nav className="hdr__nav hdr__desktop-only" aria-label="Main navigation">
          {navLinks.map(link => (
            <button
              key={link.id}
              className="hdr__nav-link"
              onClick={() => handleNavClick(link.id)}
            >
              {'label' in link ? link.label : t(link.labelKey)}
            </button>
          ))}
        </nav>

        {/* Desktop actions — hidden on mobile via CSS */}
        <div className="hdr__actions hdr__desktop-only">
          <button
            className="hdr__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? (lang === 'ar' ? 'الوضع الفاتح' : 'Light mode') : (lang === 'ar' ? 'الوضع الداكن' : 'Dark mode')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="hdr__lang-btn hdr__icon-btn"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe size={16} />
            <span lang={lang === 'ar' ? 'en' : 'ar'}
                  style={{ fontFamily: lang === 'en' ? "'Cairo', sans-serif" : 'inherit' }}>
              {lang === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>
          <button className="hdr__download-btn" onClick={onDownloadClick}>
            {t('downloadBtn')}
          </button>
        </div>

        {/* Hamburger — mobile only, always visible on mobile */}
        <button
          className="hdr__burger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile drawer — contains ALL controls */}
      <div
        id="mobile-menu"
        className={`hdr__drawer glass-panel ${menuOpen ? 'hdr__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="hdr__drawer-nav">
          {navLinks.map(link => (
            <button
              key={link.id}
              className="hdr__drawer-link"
              onClick={() => handleNavClick(link.id)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {'label' in link ? link.label : t(link.labelKey)}
            </button>
          ))}
        </nav>

        <div className="hdr__drawer-actions">
          <button className="hdr__icon-btn" onClick={toggleTheme} tabIndex={menuOpen ? 0 : -1}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? (lang === 'ar' ? 'وضع فاتح' : 'Light mode') : (lang === 'ar' ? 'وضع داكن' : 'Dark mode')}</span>
          </button>
          <button className="hdr__lang-btn hdr__icon-btn" onClick={toggleLang} tabIndex={menuOpen ? 0 : -1}>
            <Globe size={16} />
            <span lang={lang === 'ar' ? 'en' : 'ar'}
                  style={{ fontFamily: lang === 'en' ? "'Cairo', sans-serif" : 'inherit' }}>
              {lang === 'ar' ? 'English' : 'العربية'}
            </span>
          </button>
          <button
            className="hdr__download-btn hdr__download-btn--full"
            onClick={() => { onDownloadClick(); setMenuOpen(false); }}
            tabIndex={menuOpen ? 0 : -1}
          >
            {t('downloadBtn')}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="hdr__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
