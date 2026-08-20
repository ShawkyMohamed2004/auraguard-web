import React, { useState } from 'react';
import { X } from 'lucide-react';
import { IcBell } from './Icons';

interface ComingSoonModalProps {
  lang: 'ar' | 'en';
  onClose: () => void;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ lang, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <div
      className="cs-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'ar' ? 'قريباً' : 'Coming Soon'}
      onClick={onClose}
    >
      <div className="cs-modal" onClick={e => e.stopPropagation()}>
        <button
          className="cs-modal__close"
          onClick={onClose}
          aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
        >
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
