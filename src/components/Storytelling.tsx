import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HelpCircle, Users } from 'lucide-react';

export const Storytelling: React.FC = () => {
  const { t, lang } = useApp();

  return (
    <section id="how-it-helps" className="storytelling-section">
      <div className="section-header flex-center">
        <h2>{t('storyTitle')}</h2>
        <div className="divider"></div>
      </div>

      <div className="story-grid">
        
        {/* Card 1: The Problem */}
        <div className="story-card glass-panel">
          <div className="card-icon-wrapper problem-color">
            <HelpCircle size={24} />
          </div>
          <h3>{lang === 'ar' ? 'المشكلة الحقيقية في الشارع' : 'The Real Street Problem'}</h3>
          <p>
            {lang === 'ar' 
              ? 'البنات والستات بيقابلوا مضايقات ومواقف صعبة يومياً. المشكلة الكبيرة إن الطرق التقليدية للإنقاذ زي التليفون بتاخد وقت طويل، والشرطة أو الأهل ممكن يكونوا بعاد جغرافياً عن مكان الحدث في اللحظة الحرجة.'
              : 'Women face daily challenges and harassment on the streets. Traditional rescue methods like calls take too long, and police or family might be too far away to intervene immediately.'}
          </p>
        </div>

        {/* Card 2: The Core P2P Concept */}
        <div className="story-card glass-panel">
          <div className="card-icon-wrapper p2p-color">
            <Users size={24} />
          </div>
          <h3>{lang === 'ar' ? 'الرادار المجتمعي: الأقرب هو الأسرع' : 'Community Radar: The Closest is Fastest'}</h3>
          <p>
            {lang === 'ar'
              ? 'أورا جارد بيغير المعادلة. التطبيق بيعتمد على الرادار المجتمعي. بمجرد تفعيل الطوارئ، بيتم بث نداء استغاثة فوري ومجهول للأشخاص النشطين في نطاق 1 كم لأنهم الأقدر على تقديم النجدة في ثوانٍ.'
              : 'AuraGuard changes the equation. The app relies on community radar. Upon triggering SOS, it broadcasts an anonymous alert to active users within 1km, as they can help within seconds.'}
          </p>
        </div>

        {/* Card 3: Encrypted Safety Shield */}
        <div className="story-card glass-panel">
          <div className="card-icon-wrapper safety-color">
            <ShieldCheck size={24} />
          </div>
          <h3>{lang === 'ar' ? 'دائرة الثقة والخصوصية المطلقة' : 'Trusted Circle & Privacy'}</h3>
          <p>
            {lang === 'ar'
              ? 'خصوصيتك هي أهم أولوياتنا. الاستغاثة بتروح تلقائياً لدائرة الثقة المحددة مسبقاً (الأهل والأصدقاء). والبيانات الشخصية بتفضل مجهولة بالكامل للغرباء، ومفيش أي جهة تقدر تشوف ملفاتك أو موقعك من غير إذنك.'
              : 'Your privacy is our ultimate priority. The SOS automatically alerts your predefined trusted circle of family/friends. Personal data remains fully anonymous to strangers, and no one can access files without your consent.'}
          </p>
        </div>

      </div>

      {/* Storytelling Walkthrough Flow */}
      <div className="story-walkthrough glass-panel">
        <h3>{lang === 'ar' ? 'سيناريو حقيقي: كيف يحميكِ التطبيق؟' : 'Real-Life Scenario: How It Protects You'}</h3>
        
        <div className="flow-steps">
          <div className="flow-step">
            <div className="step-number">1</div>
            <h4>{lang === 'ar' ? 'استشعار الخطر' : 'Danger Sensing'}</h4>
            <p>
              {lang === 'ar'
                ? 'لو بنت حاسة بالخطر أو ماشية في مكان مقلق، بتهز الموبايل بقوة في جيبها أو تضغط 3 مرات على زرار الصوت الجانبي دون لفت الانتباه.'
                : 'If a user feels unsafe walking, she shakes her phone strongly in her pocket or presses the side volume keys 3 times discreetly.'}
            </p>
          </div>

          <div className="flow-step-connector">➔</div>

          <div className="flow-step">
            <div className="step-number">2</div>
            <h4>{lang === 'ar' ? 'بدء الحماية الصامتة' : 'Discreet Protection'}</h4>
            <p>
              {lang === 'ar'
                ? 'التطبيق بيفعل صفارات الإنذار (لو طلبت)، وبيبدأ فوراً تسجيل الكاميرا والميكروفون بالخلفية مشفر لتوثيق كل حاجة بأمان.'
                : 'The app triggers loud alarms (if requested) and starts recording background video/audio instantly, encrypted for tamper-proof evidence.'}
            </p>
          </div>

          <div className="flow-step-connector">➔</div>

          <div className="flow-step">
            <div className="step-number">3</div>
            <h4>{lang === 'ar' ? 'التنبيه المجتمعي والإنقاذ' : 'Community Alert & Rescue'}</h4>
            <p>
              {lang === 'ar'
                ? 'بيتم إرسال رسائل SMS فورية للأهل برابط خريطة تتبع حي، وبث تنبيه للأشخاص القريبين في نطاق 1 كم لنجدة فورية.'
                : 'Instant SMS is sent to family with live GPS tracking, and notifications are broadcasted to nearby community members within 1km for rapid help.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
