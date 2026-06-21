import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

interface PhoneSimulatorProps {
  activeState: 'monitoring' | 'sos' | 'call' | 'companion' | 'locker';
  setActiveState: (state: 'monitoring' | 'sos' | 'call' | 'companion' | 'locker') => void;
}

/* ── tiny SVG icon helpers (no emoji, no external deps) ── */
const IconShield = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconPhone = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const IconPhoneOff = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07M2 2l20 20" />
    <path d="M6.25 6.25a19.49 19.49 0 00-3.83 5.55A19.79 19.79 0 00.22 20.18 2 2 0 002.18 22h3a2 2 0 002-1.72c.04-.316.1-.628.17-.933" />
  </svg>
);
const IconLock = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconMap = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);
const IconCheck = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconAlertTriangle = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconVideo = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);
const IconBell = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconWifi = ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.55a11 11 0 0114.08 0" />
    <path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1" fill={color} />
  </svg>
);
const IconBattery = ({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
    <line x1="22" y1="11" x2="22" y2="13" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <rect x="3" y="8" width="11" height="8" rx="1" fill={color} opacity="0.7" stroke="none" />
  </svg>
);
const IconSignal = ({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <rect x="2" y="16" width="4" height="6" rx="1" />
    <rect x="8" y="11" width="4" height="11" rx="1" />
    <rect x="14" y="6" width="4" height="16" rx="1" />
    <rect x="20" y="1" width="4" height="21" rx="1" />
  </svg>
);

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ activeState, setActiveState }) => {
  const { lang } = useApp();
  const [countdown, setCountdown] = useState(3);
  const [callStatus, setCallStatus] = useState<'ringing' | 'connected' | 'declined'>('ringing');
  const [callDuration, setCallDuration] = useState(0);
  const [pin, setPin] = useState<string[]>([]);
  const [isLockerUnlocked, setIsLockerUnlocked] = useState(false);
  const [screenKey, setScreenKey] = useState(0); // forces re-animate on state change
  const [currentTime, setCurrentTime] = useState('');

  // Live clock
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTime(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`);
    };
    update();
    const t = setInterval(update, 10000);
    return () => clearInterval(t);
  }, []);

  // SOS countdown
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (activeState === 'sos' && countdown > 0) {
      t = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [activeState, countdown]);

  // Reset on state change
  useEffect(() => {
    setCountdown(3);
    setCallStatus('ringing');
    setCallDuration(0);
    setPin([]);
    setIsLockerUnlocked(false);
    setScreenKey(k => k + 1);
  }, [activeState]);

  // Call timer
  useEffect(() => {
    let t: ReturnType<typeof setInterval>;
    if (activeState === 'call' && callStatus === 'connected') {
      t = setInterval(() => setCallDuration(d => d + 1), 1000);
    }
    return () => clearInterval(t);
  }, [activeState, callStatus]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handlePin = (k: string) => {
    if (pin.length >= 4) return;
    const next = [...pin, k];
    setPin(next);
    if (next.length === 4) {
      if (next.join('') === '1234') setTimeout(() => setIsLockerUnlocked(true), 300);
      else setTimeout(() => setPin([]), 600);
    }
  };

  const isSOS = activeState === 'sos' && countdown === 0;

  return (
    <div className="sim-outer">
      {/* Ambient glow behind phone */}
      <div className={`sim-bg-glow ${isSOS ? 'sim-bg-glow--sos' : ''}`} aria-hidden="true" />

      {/* Phone shell */}
      <div className={`sim-phone ${isSOS ? 'sim-phone--sos' : ''}`}>

        {/* Side buttons */}
        <div className="sim-btn sim-btn--vol-up" aria-hidden="true" />
        <div className="sim-btn sim-btn--vol-down" aria-hidden="true" />
        <div className="sim-btn sim-btn--power" aria-hidden="true" />

        {/* Dynamic island / notch */}
        <div className="sim-notch" aria-hidden="true">
          <div className="sim-notch__pill">
            <div className="sim-notch__cam" />
          </div>
        </div>

        {/* Screen */}
        <div className={`sim-screen sim-screen--${activeState}`}>

          {/* Status bar */}
          <div className="sim-status">
            {/* LTR: time left, icons right / RTL: icons left, time right */}
            <span className="sim-status__time">{currentTime || '09:41'}</span>
            <div className="sim-status__icons">
              <IconSignal size={12} color="rgba(255,255,255,0.8)" />
              <IconWifi size={12} color="rgba(255,255,255,0.8)" />
              <IconBattery size={15} color="rgba(255,255,255,0.8)" />
            </div>
          </div>

          {/* ── SCREEN CONTENT ── */}
          <div className="sim-content" key={screenKey}>

            {/* ══ MONITORING ══ */}
            {activeState === 'monitoring' && (
              <div className="sim-monitoring sim-animate-in">
                {/* App logo */}
                <div className="sim-logo-wrap">
                  <div className="sim-logo-ring sim-logo-ring--outer" />
                  <div className="sim-logo-ring sim-logo-ring--inner" />
                  <img src="/logo.png" alt="AuraGuard" className="sim-logo-img" />
                </div>

                <h3 className="sim-app-name">{lang === 'ar' ? 'أورا جارد' : 'AuraGuard'}</h3>
                <p className="sim-app-tagline">{lang === 'ar' ? 'رفيقك الصامت للأمان' : 'Your Silent Safety Partner'}</p>

                {/* Status pill */}
                <div className="sim-status-pill sim-status-pill--active">
                  <span className="sim-status-dot" />
                  <IconShield size={13} color="#81c784" />
                  <span>{lang === 'ar' ? 'مراقبة صامتة' : 'Silent Monitoring'}</span>
                </div>

                {/* Quick action grid */}
                <div className="sim-quick-grid">
                  {[
                    { icon: <IconPhone size={20} color="#00f2fe" />, labelAr: 'مكالمة', labelEn: 'Call', state: 'call' as const },
                    { icon: <IconMap size={20} color="#f55b8d" />, labelAr: 'مرافق', labelEn: 'Route', state: 'companion' as const },
                    { icon: <IconLock size={20} color="#c241c6" />, labelAr: 'خزنة', labelEn: 'Locker', state: 'locker' as const },
                  ].map(item => (
                    <button key={item.state} className="sim-quick-btn" onClick={() => setActiveState(item.state)}>
                      <span className="sim-quick-icon">{item.icon}</span>
                      <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                    </button>
                  ))}
                </div>

                <p className="sim-hint">{lang === 'ar' ? 'اضغط SOS لتجربة الاستغاثة' : 'Press SOS to test emergency'}</p>
              </div>
            )}

            {/* ══ SOS ══ */}
            {activeState === 'sos' && (
              <div className={`sim-sos sim-animate-in ${countdown === 0 ? 'sim-sos--active' : ''}`}>
                {countdown > 0 ? (
                  <>
                    <div className="sim-countdown-ring">
                      <svg viewBox="0 0 100 100" className="sim-countdown-svg" aria-hidden="true">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,75,114,0.2)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="44" fill="none" stroke="#ff4b72" strokeWidth="8"
                          strokeDasharray="276" strokeDashoffset={276 - (276 * (3 - countdown) / 3)}
                          strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.9s linear' }} />
                      </svg>
                      <span className="sim-countdown-num">{countdown}</span>
                    </div>
                    <p className="sim-sos-label">{lang === 'ar' ? 'جاري إطلاق الاستغاثة...' : 'Triggering SOS...'}</p>
                    <button className="sim-btn-cancel" onClick={() => setActiveState('monitoring')}>
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="sim-sos-icon">
                      <div className="sim-sos-pulse" />
                      <div className="sim-sos-pulse sim-sos-pulse--2" />
                      <IconAlertTriangle size={48} color="#ff4b72" />
                    </div>
                    <h2 className="sim-sos-title">EMERGENCY SOS</h2>
                    <p className="sim-sos-blink">{lang === 'ar' ? 'جاري الإرسال...' : 'Broadcasting...'}</p>
                    <div className="sim-sos-indicators">
                      <div className="sim-indicator">
                        <span className="sim-indicator-dot sim-indicator-dot--red" />
                        <span>{lang === 'ar' ? 'سيرينة مفعّلة' : 'Siren ON'}</span>
                      </div>
                      <div className="sim-indicator">
                        <span className="sim-indicator-dot sim-indicator-dot--cyan" />
                        <IconVideo size={13} color="#00f2fe" />
                        <span>{lang === 'ar' ? 'تسجيل سري .aeg' : 'Silent recording .aeg'}</span>
                      </div>
                      <div className="sim-indicator">
                        <span className="sim-indicator-dot sim-indicator-dot--green" />
                        <span>{lang === 'ar' ? 'GPS مُرسَل للأهل' : 'GPS sent to family'}</span>
                      </div>
                    </div>
                    <button className="sim-btn-cancel sim-btn-cancel--sos" onClick={() => setActiveState('monitoring')}>
                      {lang === 'ar' ? 'أدخل PIN لإيقاف الإنذار' : 'Enter PIN to stop alarm'}
                    </button>
                  </>
                )}
              </div>
            )}

            {/* ══ FAKE CALL ══ */}
            {activeState === 'call' && (
              <div className="sim-call sim-animate-in">
                {callStatus === 'ringing' && (
                  <>
                    <div className="sim-call-avatar sim-call-avatar--ring">
                      <div className="sim-ring-anim" />
                      <div className="sim-ring-anim sim-ring-anim--2" />
                      <span className="sim-call-initials">A</span>
                    </div>
                    <p className="sim-call-type">{lang === 'ar' ? 'مكالمة وهمية واردة' : 'Incoming Fake Call'}</p>
                    <h3 className="sim-call-name">{lang === 'ar' ? 'أبويا' : 'Dad'}</h3>
                    <p className="sim-call-sub">{lang === 'ar' ? 'جاري الرنين...' : 'Ringing...'}</p>
                    <div className="sim-call-actions">
                      <button className="sim-call-btn sim-call-btn--decline" onClick={() => setCallStatus('declined')} aria-label="Decline">
                        <IconPhoneOff size={22} color="#fff" />
                      </button>
                      <button className="sim-call-btn sim-call-btn--accept" onClick={() => setCallStatus('connected')} aria-label="Accept">
                        <IconPhone size={22} color="#fff" />
                      </button>
                    </div>
                  </>
                )}
                {callStatus === 'connected' && (
                  <>
                    <div className="sim-call-avatar sim-call-avatar--connected pulse-primary">
                      <span className="sim-call-initials">A</span>
                    </div>
                    <h3 className="sim-call-name">{lang === 'ar' ? 'أبويا' : 'Dad'}</h3>
                    <p className="sim-call-timer">{fmt(callDuration)}</p>
                    <div className="sim-waveform">
                      {[1,2,3,4,5,6,7].map(i => (
                        <div key={i} className="sim-wave" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <button className="sim-call-btn sim-call-btn--hangup" onClick={() => setActiveState('monitoring')} aria-label="Hang up">
                      <IconPhoneOff size={22} color="#fff" />
                    </button>
                  </>
                )}
                {callStatus === 'declined' && (
                  <div className="sim-call-ended sim-animate-in">
                    <IconPhoneOff size={40} color="#ff4b72" />
                    <p>{lang === 'ar' ? 'تم رفض المكالمة' : 'Call Declined'}</p>
                    <button className="sim-btn-cancel" onClick={() => setActiveState('monitoring')}>
                      {lang === 'ar' ? 'رجوع' : 'Back'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ══ COMPANION ══ */}
            {activeState === 'companion' && (
              <div className="sim-companion sim-animate-in">
                {/* Map area */}
                <div className="sim-map">
                  <div className="sim-map-grid" aria-hidden="true" />
                  {/* Animated route path */}
                  <svg className="sim-map-svg" viewBox="0 0 200 200" aria-hidden="true">
                    <path d="M40 160 Q 40 80 120 80 Q 160 80 160 40" fill="none" stroke="rgba(194,65,198,0.4)" strokeWidth="3" strokeDasharray="6 4" />
                    <path d="M40 160 Q 40 80 120 80 Q 160 80 160 40" fill="none" stroke="#c241c6" strokeWidth="2"
                      strokeDasharray="180" strokeDashoffset="180" className="sim-route-draw" />
                  </svg>
                  {/* User dot */}
                  <div className="sim-user-dot">
                    <div className="sim-user-dot__pulse" />
                    <div className="sim-user-dot__core" />
                  </div>
                  {/* Destination pin */}
                  <div className="sim-dest-pin">
                    <IconMap size={18} color="#f55b8d" />
                  </div>
                </div>
                {/* Overlay card */}
                <div className="sim-companion-card">
                  <div className="sim-companion-header">
                    <span className="sim-companion-title">
                      <IconMap size={14} color="#c241c6" />
                      {lang === 'ar' ? 'المرافق الافتراضي' : 'Virtual Companion'}
                    </span>
                    <div className="sim-timer-badge">03:54</div>
                  </div>
                  <div className="sim-companion-progress">
                    <div className="sim-companion-bar"><div className="sim-companion-fill" /></div>
                    <span>{lang === 'ar' ? '65% مكتملة' : '65% complete'}</span>
                  </div>
                  <button className="sim-btn-safe" onClick={() => setActiveState('monitoring')}>
                    <IconCheck size={14} color="#fff" />
                    {lang === 'ar' ? 'وصلت بأمان' : 'Arrived Safely'}
                  </button>
                </div>
              </div>
            )}

            {/* ══ LOCKER ══ */}
            {activeState === 'locker' && (
              <div className="sim-locker sim-animate-in">
                {!isLockerUnlocked ? (
                  <>
                    <div className="sim-locker-icon">
                      <IconLock size={36} color="#c241c6" />
                    </div>
                    <h3 className="sim-locker-title">{lang === 'ar' ? 'الخزنة الآمنة' : 'Secure Locker'}</h3>
                    <div className="sim-pin-row">
                      {[0,1,2,3].map(i => (
                        <span key={i} className={`sim-pin-dot ${pin.length > i ? 'sim-pin-dot--filled' : ''}`} />
                      ))}
                    </div>
                    <div className="sim-keypad">
                      {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, idx) => (
                        <button key={idx} className={`sim-key ${k === '' ? 'sim-key--empty' : ''}`}
                          disabled={k === ''}
                          onClick={() => { if (k === '⌫') setPin(p => p.slice(0,-1)); else if (k) handlePin(k); }}>
                          {k}
                        </button>
                      ))}
                    </div>
                    <p className="sim-hint">{lang === 'ar' ? 'الرمز التجريبي: 1234' : 'Demo PIN: 1234'}</p>
                  </>
                ) : (
                  <div className="sim-files sim-animate-in">
                    <div className="sim-files-header">
                      <IconLock size={14} color="#c241c6" />
                      <span>{lang === 'ar' ? 'ملفات مشفرة .aeg' : 'Encrypted .aeg files'}</span>
                    </div>
                    {[
                      { name: 'rec_20260619_0930.aeg', size: '14.2 MB', icon: <IconVideo size={16} color="#c241c6" /> },
                      { name: 'audio_20260619_0412.aeg', size: '2.8 MB', icon: <IconBell size={16} color="#f55b8d" /> },
                    ].map(f => (
                      <div key={f.name} className="sim-file-row">
                        <span className="sim-file-icon">{f.icon}</span>
                        <div className="sim-file-info">
                          <span className="sim-file-name">{f.name}</span>
                          <span className="sim-file-size">{f.size}</span>
                        </div>
                        <button className="sim-decrypt-btn" aria-label="Decrypt">
                          <IconLock size={12} color="#c241c6" />
                        </button>
                      </div>
                    ))}
                    <button className="sim-btn-cancel" style={{ marginTop: 'auto' }} onClick={() => setActiveState('monitoring')}>
                      {lang === 'ar' ? 'قفل الخزنة' : 'Lock Locker'}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>{/* sim-content */}
        </div>{/* sim-screen */}

        {/* Home bar */}
        <div className="sim-home-bar" aria-hidden="true" />
      </div>{/* sim-phone */}
    </div>
  );
};
