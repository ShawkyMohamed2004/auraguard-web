import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, EyeOff, PhoneCall, Route, Lock } from 'lucide-react';

interface FeaturesGridProps {
  onSelectFeature: (state: 'monitoring' | 'sos' | 'call' | 'companion' | 'locker') => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onSelectFeature }) => {
  const { t, lang } = useApp();

  const featuresList = [
    {
      id: 'sos' as const,
      icon: <Shield size={32} color="#ff4b72" />,
      title: t('sosTitle'),
      desc: t('sosDesc'),
      actionText: lang === 'ar' ? 'جرب الاستغاثة SOS في المحاكي' : 'Try SOS in Simulator'
    },
    {
      id: 'locker' as const,
      icon: <Lock size={32} color="#c241c6" />,
      title: t('lockerTitle'),
      desc: t('lockerDesc'),
      actionText: lang === 'ar' ? 'افتح الخزنة في المحاكي' : 'Unlock Secure Locker in Simulator'
    },
    {
      id: 'call' as const,
      icon: <PhoneCall size={32} color="#00f2fe" />,
      title: t('fakeCallTitle'),
      desc: t('fakeCallDesc'),
      actionText: lang === 'ar' ? 'شغل مكالمة وهمية بالمحاكي' : 'Trigger Fake Call in Simulator'
    },
    {
      id: 'companion' as const,
      icon: <Route size={32} color="#f55b8d" />,
      title: t('companionTitle'),
      desc: t('companionDesc'),
      actionText: lang === 'ar' ? 'جرب رحلة المرافق بالمحاكي' : 'Try Companion Route in Simulator'
    },
    {
      id: 'recording' as const,
      icon: <EyeOff size={32} color="#726c8d" />,
      title: t('recordingTitle'),
      desc: t('recordingDesc'),
      actionText: lang === 'ar' ? 'مفعل تلقائياً عند تفعيل الـ SOS' : 'Automatically armed during SOS'
    }
  ];

  return (
    <section id="features" className="features-grid-section">
      <div className="section-header flex-center">
        <h2>{t('featuresTitle')}</h2>
        <p className="subtitle">{t('featuresSubtitle')}</p>
        <div className="divider"></div>
      </div>

      <div className="features-grid-container">
        {featuresList.map((feature, idx) => (
          <div 
            key={idx} 
            className="feature-card glass-panel hover-3d"
            onClick={() => {
              if (feature.id !== 'recording') {
                onSelectFeature(feature.id);
                document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                onSelectFeature('sos');
                document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="card-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <span className="card-action-hint">{feature.actionText}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
