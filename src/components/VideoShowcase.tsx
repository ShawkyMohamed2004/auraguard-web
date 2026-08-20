import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, ChevronRight } from 'lucide-react';

// ── Video data ────────────────────────────────────────────────────────────────
interface VideoItem {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  duration: string;
  tagAr: string;
  tagEn: string;
  tagColor: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 1,
    titleAr: 'تفعيل استغاثة SOS بضغط الأزرار أو الهز',
    titleEn: 'Trigger SOS via Side Keys or Shake',
    descAr:
      'بيوضح الفيديو ده إزاي مستشعرات الهاتف بتتعرف على الهز القوي أو ٣ ضغطات متتالية على أزرار الصوت، وبتشغل منظومة الطوارئ من وضع السكون تلقائياً.',
    descEn:
      'Demonstrates how the phone sensors detect a strong shake or 3 consecutive side-key presses, silently booting the full emergency system from a locked screen.',
    duration: '1:52',
    tagAr: 'استغاثة SOS',
    tagEn: 'SOS Trigger',
    tagColor: 'var(--danger)',
  },
  {
    id: 2,
    titleAr: 'المكالمة الوهمية والتسجيل السري المشفر',
    titleEn: 'Fake Call & Silent Encrypted Recording',
    descAr:
      'طريقة تشغيل المكالمة الوهمية بواجهة حقيقية جداً للخروج من المواقف الصعبة، وآلية عمل التسجيل السري في الخلفية مع الشاشة مغلقة بدون أي مؤشر ظاهر.',
    descEn:
      'Shows how to trigger a hyper-realistic fake call to exit uncomfortable situations, and how background recording works silently with the screen completely off.',
    duration: '2:10',
    tagAr: 'مكالمة وهمية',
    tagEn: 'Fake Call',
    tagColor: 'var(--accent-cyan)',
  },
  {
    id: 3,
    titleAr: 'المرافق الافتراضي وتتبع الخريطة المباشر',
    titleEn: 'Virtual Companion & Live Map Tracking',
    descAr:
      'جولة كاملة في واجهة المرافق الافتراضي — ضبط الوجهة والوقت المتوقع، وإزاي النظام بيبعت تنبيه طوارئ فوري لدائرة أمانك لو الوقت انتهى من غير تأكيد الوصول.',
    descEn:
      "Full walkthrough of setting a route and timer, and how the system sends an instant emergency alert to your safety circle if you don't confirm arrival in time.",
    duration: '1:38',
    tagAr: 'المرافق الذكي',
    tagEn: 'Companion',
    tagColor: 'var(--secondary)',
  },
];

// ── Trust / stats bar data ────────────────────────────────────────────────────
interface StatItem {
  valueAr: string;
  valueEn: string;
  labelAr: string;
  labelEn: string;
  icon: React.ReactNode;
}

const IcShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IcUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IcLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IcZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const STATS: StatItem[] = [
  {
    valueAr: '< ٣ ثواني',
    valueEn: '< 3 sec',
    labelAr: 'وقت تفعيل الاستغاثة',
    labelEn: 'SOS activation time',
    icon: <IcZap />,
  },
  {
    valueAr: '١ كم',
    valueEn: '1 km',
    labelAr: 'نطاق الرادار المجتمعي',
    labelEn: 'Community radar range',
    icon: <IcShield />,
  },
  {
    valueAr: '١٠٠٪',
    valueEn: '100%',
    labelAr: 'تشفير محلي للتسجيلات',
    labelEn: 'Local encryption for recordings',
    icon: <IcLock />,
  },
  {
    valueAr: 'بدون نت',
    valueEn: 'Offline',
    labelAr: 'يعمل عبر SMS تلقائي',
    labelEn: 'Works via automated SMS',
    icon: <IcUsers />,
  },
];

// ── Video thumbnail placeholder ───────────────────────────────────────────────
const VideoThumbnail: React.FC<{ video: VideoItem; lang: 'ar' | 'en'; isActive?: boolean }> = ({
  video,
  lang,
  isActive = false,
}) => (
  <div className={`vs-thumb ${isActive ? 'vs-thumb--active' : ''}`}>
    <div className="vs-thumb__img" aria-hidden="true">
      {/* Decorative gradient background mimicking a video thumbnail */}
      <div className="vs-thumb__gradient" />
      <div className="vs-thumb__play-sm">
        <Play size={14} fill="#fff" color="#fff" />
      </div>
      <span className="vs-thumb__dur">{video.duration}</span>
    </div>
    <div className="vs-thumb__info">
      <span className="vs-thumb__tag" style={{ color: video.tagColor }}>
        {lang === 'ar' ? video.tagAr : video.tagEn}
      </span>
      <p className="vs-thumb__title">
        {lang === 'ar' ? video.titleAr : video.titleEn}
      </p>
    </div>
    {isActive && <div className="vs-thumb__active-bar" style={{ background: video.tagColor }} />}
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export const VideoShowcase: React.FC = () => {
  const { t, lang } = useApp();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = VIDEOS[activeIdx];

  return (
    <section id="video-showcase" className="vs-section">

      {/* Section header */}
      <div className="section-header flex-center">
        <h2>{t('videoTitle')}</h2>
        <p className="subtitle">{t('videoSubtitle')}</p>
        <div className="divider" />
      </div>

      {/* ── Main video player ──────────────────────────────────────────────── */}
      <div className="vs-player-wrap glass-panel">

        {/* Featured video area */}
        <div className="vs-featured">
          <div className="vs-featured__viewport" aria-label={lang === 'ar' ? 'مشغل الفيديو' : 'Video player'}>
            {/* Stylised placeholder — replaces with real <video> / iframe when ready */}
            <div className="vs-featured__bg" aria-hidden="true" />

            {/* Gradient overlay */}
            <div className="vs-featured__overlay" aria-hidden="true" />

            {/* Tag badge */}
            <span
              className="vs-featured__tag"
              style={{ background: active.tagColor + '22', border: `1px solid ${active.tagColor}55`, color: active.tagColor }}
            >
              {lang === 'ar' ? active.tagAr : active.tagEn}
            </span>

            {/* Duration label */}
            <span className="vs-featured__dur">{active.duration}</span>

            {/* Centre play button */}
            <button
              className="vs-featured__play"
              aria-label={lang === 'ar' ? 'تشغيل الفيديو' : 'Play video'}
              type="button"
              /* onClick: wire up to a real player / modal when videos are ready */
            >
              <Play size={32} fill="#fff" color="#fff" />
            </button>

            {/* Caption bar at bottom */}
            <div className="vs-featured__caption">
              <p className="vs-featured__caption-title">
                {lang === 'ar' ? active.titleAr : active.titleEn}
              </p>
              <p className="vs-featured__caption-desc">
                {lang === 'ar' ? active.descAr : active.descEn}
              </p>
            </div>
          </div>
        </div>

        {/* Playlist / tab switcher */}
        <div className="vs-playlist" role="list" aria-label={lang === 'ar' ? 'قائمة الفيديوهات' : 'Video playlist'}>
          {VIDEOS.map((vid, idx) => (
            <button
              key={vid.id}
              type="button"
              role="listitem"
              className={`vs-playlist__item ${idx === activeIdx ? 'vs-playlist__item--active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              aria-current={idx === activeIdx ? 'true' : undefined}
              aria-label={lang === 'ar' ? vid.titleAr : vid.titleEn}
            >
              <VideoThumbnail video={vid} lang={lang} isActive={idx === activeIdx} />
              <ChevronRight
                size={16}
                className="vs-playlist__chevron"
                aria-hidden="true"
                style={{ color: idx === activeIdx ? vid.tagColor : 'var(--text-muted)' }}
              />
            </button>
          ))}

          {/* "Coming soon" note */}
          <p className="vs-playlist__note">
            {lang === 'ar'
              ? '🎬 الفيديوهات ستُتاح عند الإطلاق الرسمي للتطبيق'
              : '🎬 Videos will be available at the official app launch'}
          </p>
        </div>
      </div>

      {/* ── Trust / stats bar — uses the freed space from 3 cards → 1 player ── */}
      <div className="vs-stats-bar" aria-label={lang === 'ar' ? 'إحصاءات التطبيق' : 'App statistics'}>
        {STATS.map((stat, i) => (
          <div key={i} className="vs-stat glass-panel">
            <span className="vs-stat__icon" aria-hidden="true">{stat.icon}</span>
            <strong className="vs-stat__value">
              {lang === 'ar' ? stat.valueAr : stat.valueEn}
            </strong>
            <span className="vs-stat__label">
              {lang === 'ar' ? stat.labelAr : stat.labelEn}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
};
