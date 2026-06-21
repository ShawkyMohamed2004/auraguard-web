import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotCategory {
  id: string;
  labelAr: string;
  labelEn: string;
  screenshots: { src: string; altAr: string; altEn: string }[];
}

const categories: ScreenshotCategory[] = [
  {
    id: 'onboarding',
    labelAr: 'الشاشات التعريفية',
    labelEn: 'Onboarding',
    screenshots: [
      { src: '/screenshots/1. Onboarding/1. Splash Screen.png', altAr: 'شاشة البداية', altEn: 'Splash Screen' },
      { src: '/screenshots/1. Onboarding/2. Onboarding Screen 1.jpg', altAr: 'التعريف 1', altEn: 'Onboarding 1' },
      { src: '/screenshots/1. Onboarding/3. Onboarding Screen 2.jpg', altAr: 'التعريف 2', altEn: 'Onboarding 2' },
      { src: '/screenshots/1. Onboarding/4. Onboarding Screen 3.jpg', altAr: 'التعريف 3', altEn: 'Onboarding 3' },
      { src: '/screenshots/1. Onboarding/5. Onboarding Screen 4.jpg', altAr: 'التعريف 4', altEn: 'Onboarding 4' },
    ],
  },
  {
    id: 'auth',
    labelAr: 'تسجيل الدخول',
    labelEn: 'Login & Recovery',
    screenshots: [
      { src: '/screenshots/2. Authentication & Recovery/1. Login Screen.jpg', altAr: 'شاشة الدخول', altEn: 'Login Screen' },
      { src: '/screenshots/2. Authentication & Recovery/2. Forgot Password Screen.jpg', altAr: 'نسيت كلمة المرور', altEn: 'Forgot Password' },
      { src: '/screenshots/2. Authentication & Recovery/3. Reset Otp Screen.jpg', altAr: 'رمز التحقق', altEn: 'OTP Verification' },
      { src: '/screenshots/2. Authentication & Recovery/4. New Password Screen.jpg', altAr: 'كلمة مرور جديدة', altEn: 'New Password' },
    ],
  },
  {
    id: 'signup',
    labelAr: 'إنشاء الحساب',
    labelEn: 'Sign Up & Setup',
    screenshots: [
      { src: '/screenshots/3. Sign up & Setup Profile/1. Signup Screen.jpg', altAr: 'إنشاء حساب', altEn: 'Sign Up' },
      { src: '/screenshots/3. Sign up & Setup Profile/2. Otp Verification Screen.jpg', altAr: 'تحقق OTP', altEn: 'OTP Verification' },
      { src: '/screenshots/3. Sign up & Setup Profile/3. Create Password Screen.jpg', altAr: 'إنشاء كلمة مرور', altEn: 'Create Password' },
      { src: '/screenshots/3. Sign up & Setup Profile/4. Personal Info Screen.jpg', altAr: 'المعلومات الشخصية', altEn: 'Personal Info' },
      { src: '/screenshots/3. Sign up & Setup Profile/5. Permissions Screen.jpg', altAr: 'الصلاحيات', altEn: 'Permissions' },
      { src: '/screenshots/3. Sign up & Setup Profile/6. Add Contacts Screen.jpg', altAr: 'إضافة جهات اتصال', altEn: 'Add Contacts' },
      { src: '/screenshots/3. Sign up & Setup Profile/7. Setup Complete Screen.jpg', altAr: 'الإعداد مكتمل', altEn: 'Setup Complete' },
    ],
  },
  {
    id: 'home',
    labelAr: 'الصفحة الرئيسية',
    labelEn: 'Home',
    screenshots: [
      { src: '/screenshots/4. Core Protection Hub/1. Home Screen.png', altAr: 'الرئيسية', altEn: 'Home Screen' },
      { src: '/screenshots/4. Core Protection Hub/2. Notifications Screen.jpg', altAr: 'الإشعارات', altEn: 'Notifications' },
      { src: '/screenshots/4. Core Protection Hub/3. Notifications Screen.jpg', altAr: 'الإشعارات 2', altEn: 'Notifications 2' },
    ],
  },
  {
    id: 'sos',
    labelAr: 'الاستغاثة الطارئة',
    labelEn: 'Emergency SOS',
    screenshots: [
      { src: '/screenshots/10. Emergency SOS & Maps/1. CountDown Screen.jpg', altAr: 'عداد الطوارئ', altEn: 'SOS Countdown' },
      { src: '/screenshots/10. Emergency SOS & Maps/2. Sos Activated Screen.jpg', altAr: 'SOS مفعل', altEn: 'SOS Activated' },
      { src: '/screenshots/10. Emergency SOS & Maps/3. Sos Summary Screen.jpg', altAr: 'ملخص SOS', altEn: 'SOS Summary' },
      { src: '/screenshots/8. Map & Rader/Map Screen.jpg', altAr: 'خريطة الطوارئ', altEn: 'Emergency Map' },
    ],
  },
  {
    id: 'fakecall',
    labelAr: 'المكالمة الوهمية',
    labelEn: 'Fake Call',
    screenshots: [
      { src: '/screenshots/5. Fake Call Simulator/Fake Call Setup Screen.jpg', altAr: 'إعداد المكالمة', altEn: 'Call Setup' },
      { src: '/screenshots/5. Fake Call Simulator/Incoming Fake Call Screen.jpg', altAr: 'مكالمة واردة', altEn: 'Incoming Call' },
      { src: '/screenshots/5. Fake Call Simulator/Active Fake Call Screen.jpg', altAr: 'مكالمة نشطة', altEn: 'Active Call' },
    ],
  },
  {
    id: 'locker',
    labelAr: 'الخزنة الآمنة',
    labelEn: 'Secure Locker',
    screenshots: [
      { src: '/screenshots/9. Evidence Locker/1. Locker Pin Setup Screen.jpg', altAr: 'إعداد PIN', altEn: 'PIN Setup' },
      { src: '/screenshots/9. Evidence Locker/2. Locker Pin Screen.jpg', altAr: 'إدخال PIN', altEn: 'Enter PIN' },
      { src: '/screenshots/9. Evidence Locker/3. Locker Screen.jpg', altAr: 'محتوى الخزنة', altEn: 'Locker Content' },
      { src: '/screenshots/9. Evidence Locker/4. Locker Screen.jpg', altAr: 'ملفات مشفرة', altEn: 'Encrypted Files' },
    ],
  },
  {
    id: 'applock',
    labelAr: 'قفل التطبيق',
    labelEn: 'App Lock',
    screenshots: [
      { src: '/screenshots/11. App Lock Protection/1. App Lock Screen.jpg', altAr: 'قفل التطبيق', altEn: 'App Lock Screen' },
      { src: '/screenshots/11. App Lock Protection/2. App Lock Reset Screen.jpg', altAr: 'إعادة تعيين القفل', altEn: 'Reset App Lock' },
    ],
  },
  {
    id: 'contacts',
    labelAr: 'جهات الثقة',
    labelEn: 'Trusted Contacts',
    screenshots: [
      { src: '/screenshots/7. Trusted Contacts/1. Trusted Contacts Screen.jpg', altAr: 'جهات الثقة', altEn: 'Trusted Contacts' },
      { src: '/screenshots/7. Trusted Contacts/2. Trusted Contacts Screen 2.jpg', altAr: 'جهات الثقة 2', altEn: 'Trusted Contacts 2' },
      { src: '/screenshots/7. Trusted Contacts/3. Contact Detail Screen.jpg', altAr: 'تفاصيل جهة اتصال', altEn: 'Contact Detail' },
    ],
  },
  {
    id: 'settings',
    labelAr: 'الإعدادات',
    labelEn: 'Settings',
    screenshots: [
      { src: '/screenshots/12. Settings & Customization/1. Settings Screen 1.jpg', altAr: 'الإعدادات', altEn: 'Settings' },
      { src: '/screenshots/12. Settings & Customization/2. Settings Screen 2.jpg', altAr: 'الإعدادات 2', altEn: 'Settings 2' },
      { src: '/screenshots/12. Settings & Customization/3. Edit Profile Screen.jpg', altAr: 'تعديل الملف', altEn: 'Edit Profile' },
      { src: '/screenshots/12. Settings & Customization/4. SOS Customization Screen 1.jpg', altAr: 'إعدادات SOS 1', altEn: 'SOS Settings 1' },
      { src: '/screenshots/12. Settings & Customization/5. SOS Customization Screen 2.jpg', altAr: 'إعدادات SOS 2', altEn: 'SOS Settings 2' },
      { src: '/screenshots/12. Settings & Customization/6. Recording Settings Screen.jpg', altAr: 'إعدادات التسجيل', altEn: 'Recording Settings' },
      { src: '/screenshots/12. Settings & Customization/7. Security Settings Screen.jpg', altAr: 'الأمان', altEn: 'Security' },
      { src: '/screenshots/12. Settings & Customization/8. Change Password Screen.jpg', altAr: 'تغيير كلمة المرور', altEn: 'Change Password' },
      { src: '/screenshots/12. Settings & Customization/9. Two Factor Auth Screen.jpg', altAr: 'التحقق الثنائي', altEn: '2FA' },
      { src: '/screenshots/12. Settings & Customization/10. Delete Account Screen.jpg', altAr: 'حذف الحساب', altEn: 'Delete Account' },
      { src: '/screenshots/12. Settings & Customization/11. Notification Settings Screen.jpg', altAr: 'إعدادات الإشعارات', altEn: 'Notifications' },
      { src: '/screenshots/12. Settings & Customization/12. Help Screen.jpg', altAr: 'المساعدة', altEn: 'Help' },
    ],
  },
];

/** Single phone image with skeleton shimmer loading — remembers loaded state */
const loadedCache = new Set<string>(); // module-level cache

const PhoneImage: React.FC<{
  src: string;
  alt: string;
  isActive: boolean;
}> = ({ src, alt, isActive }) => {
  const [loaded, setLoaded] = useState(() => loadedCache.has(src));

  const handleLoad = () => {
    loadedCache.add(src);
    setLoaded(true);
  };

  return (
    <div className="sg-img-wrapper">
      {/* Shimmer skeleton shown until loaded */}
      {!loaded && <div className="sg-skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={isActive ? 'eager' : 'lazy'}
        draggable={false}
        className={`sg-img ${loaded ? 'sg-img--loaded' : 'sg-img--loading'}`}
        onLoad={handleLoad}
      />
    </div>
  );
};

export const ScreenshotsGallery: React.FC = () => {
  const { lang } = useApp();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset index when switching category, but do NOT remount images
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const current = categories[activeCategory];

  const prev = () => setActiveIndex(i => (i - 1 + current.screenshots.length) % current.screenshots.length);
  const next = () => setActiveIndex(i => (i + 1) % current.screenshots.length);

  return (
    <section
      id="screenshots"
      className={`screenshots-section ${isVisible ? 'fade-in-up' : 'pre-animate'}`}
      ref={sectionRef}
    >
      <div className="section-header flex-center">
        <h2 className="screenshots-title">
          {lang === 'ar' ? 'استكشف التطبيق بنفسك' : 'Explore the App Yourself'}
        </h2>
        <p className="subtitle">
          {lang === 'ar'
            ? 'لقطات حقيقية من داخل التطبيق — شاهد كل ميزة بالتفصيل'
            : 'Real screenshots from inside the app — see every feature in detail'}
        </p>
        <div className="divider"></div>
      </div>

      {/* Category Tabs */}
      <div className="screenshots-tabs-wrapper">
        <div className="screenshots-tabs">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              className={`tab-pill ${activeCategory === idx ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              {lang === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Phone Carousel — fixed min-height so it never collapses */}
      <div className="phones-carousel-wrapper sg-carousel-stable">
        <button
          className="carousel-arrow left"
          onClick={prev}
          aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
        >
          <ChevronLeft size={22} />
        </button>

        <div className="phones-track sg-track">
          {/*
            Pre-render ALL category images for EVERY category,
            but only show the active one to avoid height collapse and remounting.
          */}
          {categories.map((cat, catIdx) => {
            const isCatActive = catIdx === activeCategory;
            // Compute visible indices for this category
            const len = cat.screenshots.length;
            let catVisibleIndices: number[];
            if (len === 1) catVisibleIndices = [0];
            else if (len === 2) catVisibleIndices = [0, 1];
            else {
              const ci = isCatActive ? activeIndex : 0;
              catVisibleIndices = [(ci - 1 + len) % len, ci, (ci + 1) % len];
            }

            return (
              <div
                key={cat.id}
                className="sg-category-layer"
                aria-hidden={!isCatActive}
                style={{ display: isCatActive ? 'flex' : 'none' }}
              >
                {catVisibleIndices.map((imgIdx, position) => {
                  const isCenter = position === Math.floor(catVisibleIndices.length / 2);
                  const shot = cat.screenshots[imgIdx];
                  return (
                    <div
                      key={`${cat.id}-${imgIdx}`}
                      className={`phone-frame-card ${isCenter ? 'center-card' : 'side-card'}`}
                      onClick={() => {
                        if (!isCenter && isCatActive) setActiveIndex(imgIdx);
                      }}
                    >
                      <div className="phone-shell">
                        <div className="shell-notch">
                          <div className="shell-camera" />
                        </div>
                        <div className="shell-screen">
                          <PhoneImage
                            src={shot.src}
                            alt={lang === 'ar' ? shot.altAr : shot.altEn}
                            isActive={isCatActive}
                          />
                        </div>
                        <div className="shell-home-bar" />
                      </div>

                      {isCenter && (
                        <p className="phone-card-label">
                          {lang === 'ar' ? shot.altAr : shot.altEn}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <button
          className="carousel-arrow right"
          onClick={next}
          aria-label={lang === 'ar' ? 'التالي' : 'Next'}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {current.screenshots.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Screenshot ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="carousel-counter">
        {activeIndex + 1} / {current.screenshots.length}
      </p>
    </section>
  );
};
