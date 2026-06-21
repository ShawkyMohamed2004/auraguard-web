import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';
type Theme = 'dark' | 'light';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation & General
  brandName: { ar: 'أورا جارد', en: 'AuraGuard' },
  slogan: { ar: 'رفيقك الصامت للأمان', en: 'Your Silent Safety Partner' },
  home: { ar: 'الرئيسية', en: 'Home' },
  features: { ar: 'المميزات', en: 'Features' },
  howItHelps: { ar: 'قصص أمان', en: 'Safety Stories' },
  downloadBtn: { ar: 'تحميل التطبيق', en: 'Download App' },
  backToSite: { ar: 'رجوع للموقع', en: 'Back to Site' },
  
  // Hero Section
  heroTitle: { ar: 'حصن أمانك الذكي في الشارع والمواصلات', en: 'Your Intelligent Shield in Every Journey' },
  heroSubtitle: { ar: 'تطبيق مصري بمواصفات عالمية، مصمم لحماية المرأة والعائلة عبر رادار مجتمعي ذكي، استغاثة فورية بدون إنترنت، وتسجيل سري مشفر للأدلة والشاشة مغلقة.', en: 'A high-end safety app designed to protect you in the streets and public transport using smart community radar, instant offline SOS, and secure discreet evidence recording with screen off.' },
  getStarted: { ar: 'احمي نفسك الآن', en: 'Protect Yourself Now' },
  watchDemo: { ar: 'شاهد فيديو تعريفي', en: 'Watch Demo Video' },

  // Storytelling Introduction
  storyTitle: { ar: 'ليه أورا جارد مش مجرد تطبيق طوارئ تقليدي؟', en: 'Why AuraGuard is Not Just Another Safety App' },
  storyDesc1: { ar: 'في اللحظات الحرجة، كل ثانية بتفرق. لو واجهتي موقف محرج في المواصلات أو حسيتي بالخطر وانتي مروحة بليل، الاتصال بالطرق التقليدية بياخد وقت والنجدة ممكن تكون بعيدة. أورا جارد اتصمم عشان يحل المشكلة دي بذكاء وسرعة.', en: 'In critical moments, every second counts. If you face an uncomfortable situation in transport or feel unsafe walking late, calling for help traditional ways takes too long and family might be far. AuraGuard solves this instantly.' },
  storyDesc2: { ar: 'التطبيق بيستفيد من الرادار المجتمعي لأن الأقرب مكاناً هو الأسرع إنقاذًا، وبيرسل استغاثة فورية لدائرة ثقتك وللمنقذين القريبين في نطاق 1 كم بسرية تامة.', en: 'The app leverages community radar because the closest person is the fastest to rescue, dispatching an SOS to your trusted circle and nearby rescuers within 1km securely.' },

  // Features Overview
  featuresTitle: { ar: 'مميزات خارقة مصممة للمواقف الصعبة', en: 'Powerful Features Built for Real Situations' },
  featuresSubtitle: { ar: 'تحت أي ظرف، شاشتك مقفولة أو مفتوحة، بدون إنترنت أو معاه، أورا جارد جاهز لحمايتك.', en: 'Under any condition, screen locked or active, offline or online, AuraGuard is ready to protect you.' },
  
  // Feature 1: SOS
  sosTitle: { ar: 'استغاثة SOS صامتة وسريعة', en: 'Instant & Silent SOS Trigger' },
  sosDesc: { ar: 'مش محتاجة تفتحي شاشة الموبايل. بـ 3 ضغطات متتالية على أزرار الصوت، أو هزة قوية للموبايل وهو في جيبك، الاستغاثة بتشتغل فوراً وبتبعت موقعك ورابط تتبع حي لعائلتك.', en: 'No need to unlock your phone. Press the side volume keys 3 times, or shake your phone strongly in your pocket to trigger an instant SOS with live GPS tracking shared with your family.' },
  
  // Feature 2: Discreet Recording
  recordingTitle: { ar: 'تسجيل الأدلة السري والمشفر', en: 'Discreet & Encrypted Recording' },
  recordingDesc: { ar: 'عند تفعيل الاستغاثة، التطبيق بيبدأ يسجل فيديو وصوت فوراً في الخلفية والشاشة مغلقة تماماً. التسجيلات بتتخزن مشفرة بامتداد .aeg ومحدش يقدر يمسحها من الموبايل غير بـ PIN كود الحماية الخاص بيكي.', en: 'Upon SOS, the app records audio and video silently with the screen completely off. Files are encrypted as .aeg and stored in a secure locker, accessible and deletable only by your master PIN.' },
  
  // Feature 3: Fake Call
  fakeCallTitle: { ar: 'مكالمة وهمية فورية للإنقاذ', en: 'Realistic Fake Call Simulator' },
  fakeCallDesc: { ar: 'لو في مكان مريب أو كلام ملوش لزمة وعايزة تمشي بشكل طبيعي، ضغطة واحدة على اختصار المكالمة وهيرن موبايلك بواجهة مكالمة حقيقية جداً واسم ورنين وصوت بتحدديهم بنفسك.', en: 'Stuck in an uncomfortable talk or suspicious ride? Trigger a highly realistic fake call with custom caller names, ringtones, and simulated audio to excuse yourself naturally.' },
  
  // Feature 4: Virtual Companion
  companionTitle: { ar: 'المرافق الافتراضي الذكي', en: 'Smart Virtual Companion' },
  companionDesc: { ar: 'حددي وجهتك ووقت مشوارك. رفيقك الصامت هيراقب رحلتك على الخريطة؛ ولو الوقت خلص ومأكدتيش وصولك بسلام، دايرة أمانك هتوصلها إشارة خطر فورية بمكانك الحالي.', en: 'Set your route and estimated arrival. Your silent companion monitors your path on the map; if the timer expires without your safe check-in, an emergency alert is sent to your circle.' },

  // Feature 5: Secure Locker
  lockerTitle: { ar: 'الخزنة السرية المحمية', en: 'PIN-Protected Evidence Locker' },
  lockerDesc: { ar: 'جميع تسجيلات الطوارئ والملفات الحساسة محفوظة في قاعدة بيانات Isar المشفرة محلياً. لا يمكن للمتطفلين رؤيتها في معرض الصور، وتفتح فقط ببصمة الإصبع أو كود الأمان.', en: 'All emergency recordings and sensitive files are saved in an encrypted local database (Isar DB). Hidden from the public gallery, they open only with your biometric lock or master PIN.' },

  // Video Section
  videoTitle: { ar: 'شاهد أورا جارد في العمل', en: 'See AuraGuard in Action' },
  videoSubtitle: { ar: 'فيديوهات تشرح كيفية عمل مستشعرات الهواتف في الخلفية وتفعيل الحماية بصمت.', en: 'Videos demonstrating how the background triggers and silent rescue systems protect you.' },
  video1Title: { ar: '1. شرح تفعيل الاستغاثة بضغط الأزرار والهز', en: '1. How to Trigger SOS via Side Keys & Shaking' },
  video2Title: { ar: '2. كيفية عمل المكالمة الوهمية والتسجيل السري', en: '2. Setting up Fake Call & Silent Recording' },
  video3Title: { ar: '3. دورة حياة المرافق الافتراضي وتتبع الخريطة', en: '3. Virtual Companion & Live Map Tracking' },

  // Interactive Playground UI
  playgroundTitle: { ar: 'جرب الميزات بنفسك (المحاكي التفاعلي)', en: 'Try Features Live (Interactive Simulator)' },
  playgroundSubtitle: { ar: 'اضغط على الأزرار لتشغيل ومحاكاة سيناريوهات الخطر على الهاتف الافتراضي.', en: 'Click the buttons to simulate emergency scenarios on the virtual smartphone.' },
  btnSimulateSOS: { ar: 'تفعيل SOS (اهتزاز/أزرار)', en: 'Simulate SOS (Shake/Buttons)' },
  btnSimulateCall: { ar: 'تشغيل مكالمة وهمية', en: 'Trigger Fake Call' },
  btnSimulateCompanion: { ar: 'مراقبة المشوار المباشر', en: 'Start Virtual Companion' },
  btnSimulateLocker: { ar: 'فتح الخزنة الآمنة', en: 'Unlock Secure Locker' },
  statusMonitoring: { ar: 'الوضع: مراقبة صامتة', en: 'Status: Silent Monitoring' },
  statusSOS: { ar: 'إنذار SOS نشط! جاري إرسال إحداثيات GPS وتسجيل الأدلة...', en: 'SOS Activated! Broadcasting GPS & recording evidence...' },
  statusCall: { ar: 'مكالمة وهمية واردة... (اسحب للرد أو الرفض)', en: 'Incoming Fake Call... (Swipe to Answer/Decline)' },
  statusCompanion: { ar: 'المرافق نشط: جاري تتبع الرحلة (متبقي 4 دقائق)', en: 'Companion Active: Tracking trip (4 mins remaining)' },
  statusLocker: { ar: 'تم فك تشفير الخزنة الآمنة (Isar DB)', en: 'Secure Locker Decrypted (Isar DB)' },
  cancelAction: { ar: 'إلغاء العملية', en: 'Cancel Action' },

  // Download Page Mockup UI
  downloadTitle: { ar: 'تحميل تطبيق أورا جارد', en: 'Download AuraGuard App' },
  downloadSubtitle: { ar: 'ابدأ مشوارك بأمان كامل مع رفيقك الصامت', en: 'Start your journey with complete peace of mind' },
  scanQr: { ar: 'امسح الـ QR للتحميل المباشر', en: 'Scan QR for Direct Download' },
  splashScreenText: { ar: 'جاري فتح التطبيق...', en: 'Launching App...' },
  appHomeWelcome: { ar: 'أهلاً بك في أورا جارد', en: 'Welcome to AuraGuard' },
  appHomeStatus: { ar: 'درع الحماية نشط ويراقب الهاتف بالخلفية', en: 'Protection shield is active & monitoring in background' },
  appHomeSosBtn: { ar: 'اضغط SOS للاستغاثة', en: 'Press SOS for Emergency' },
  
  // Footer
  footerRights: { ar: 'جميع الحقوق محفوظة © ٢٠٢٦ أورا جارد. أمنك هو شغفنا.', en: 'All rights reserved © 2026 AuraGuard. Your safety is our mission.' },
  privacyPolicy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
  termsOfService: { ar: 'شروط الاستخدام', en: 'Terms of Service' }
};

interface AppContextType {
  lang: Language;
  theme: Theme;
  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auto-detect language from browser
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'ar';
  const initialLang: Language = browserLang.startsWith('ar') ? 'ar' : 'en';
  const [lang, setLangState] = useState<Language>(
    (localStorage.getItem('auraguard_lang') as Language) || initialLang
  );

  // Auto-detect theme from system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme: Theme = prefersDark ? 'dark' : 'light';
  const [theme, setThemeState] = useState<Theme>(
    (localStorage.getItem('auraguard_theme') as Theme) || initialTheme
  );

  // Apply initial lang + theme to documentElement immediately
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('auraguard_lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('auraguard_theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <AppContext.Provider value={{ lang, theme, setLang, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
