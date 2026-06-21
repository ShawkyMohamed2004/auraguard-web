import React from 'react';
import { useApp } from '../context/AppContext';
import { Play } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const { t, lang } = useApp();

  const videos = [
    {
      title: t('video1Title'),
      desc: lang === 'ar' 
        ? 'بيوضح الفيديو ده إزاي الهواتف بتتعرف على الهز القوي أو الضغطات المتتالية لأزرار الصوت وبتشغل حماية الطوارئ من وضع السكون.'
        : 'This video demonstrates how the acceleration sensors detect a strong shake or side-key sequence and boot rescue tasks.',
      placeholder: lang === 'ar' ? 'فيديو تفعيل SOS' : 'SOS Trigger Demo'
    },
    {
      title: t('video2Title'),
      desc: lang === 'ar'
        ? 'طريقة تشغيل المكالمة الوهمية للخروج من أي مواقف محرجة، وآلية عمل التسجيل السري المشفر بدون واجهة مستخدم ظاهرة.'
        : 'Setting up custom schedules for fake calls and starting background camera recording with strict local encryption.',
      placeholder: lang === 'ar' ? 'شرح المكالمة والتسجيل' : 'Fake Call & Recording Demo'
    },
    {
      title: t('video3Title'),
      desc: lang === 'ar'
        ? 'جولة كاملة في واجهة المرافق الافتراضي، وضبط عداد الوصول بأمان مع تتبع إحداثيات GPS لحظة بلحظة لدائرة أمانك.'
        : 'A walkthrough of setting up virtual routes and destination timers to automatically update emergency contacts.',
      placeholder: lang === 'ar' ? 'تتبع المرافق الافتراضي' : 'Virtual Companion Demo'
    }
  ];

  return (
    <section id="video-showcase" className="video-showcase-section">
      <div className="section-header flex-center">
        <h2>{t('videoTitle')}</h2>
        <p className="subtitle">{t('videoSubtitle')}</p>
        <div className="divider"></div>
      </div>

      <div className="video-grid">
        {videos.map((vid, idx) => (
          <div key={idx} className="video-card glass-panel">
            <div className="video-player-placeholder flex-center">
              {/* Overlay styling for premium feel */}
              <div className="video-overlay flex-center">
                <button className="play-button flex-center" title="Play Video">
                  <Play size={24} color="#ffffff" fill="#ffffff" />
                </button>
                <span className="duration-label">01:45</span>
              </div>
              <div className="placeholder-text">{vid.placeholder}</div>
            </div>
            <div className="video-info">
              <h3>{vid.title}</h3>
              <p>{vid.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
