import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { useLanguage } from '../../i18n/LanguageContext';
import './LanguageToggle.css';

const TEXT_TARGETS = [
  '.language-toggle-label',
  '.hero-kicker',
  '.hero-menu a',
  '.chapter-title',
  '.chapter-subtitle',
  '.relic-meta',
  '.relic-stat-label',
  '.relic-desc',
  '.relic-tags li',
  '.relic-links a',
  '.featured-relic-cta',
  '.skill-card-title',
  '.skill-card-category',
  '.cert-card-title',
  '.cert-card-date',
  '.cert-card-detail',
  '.cert-card-cta',
  '.footer-quote',
  '.footer-text',
  '.footer-heading',
  '.footer-nav li',
  '.footer-social-label',
  '.footer-top',
  '.footer-credits p'
].join(',');

const visibleTextTargets = () =>
  [...document.querySelectorAll(TEXT_TARGETS)].filter(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
  });

const clearInline = elements =>
  elements.forEach(el => {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.filter = '';
  });

const LanguageToggle = () => {
  const { lang, toggle, t } = useLanguage();
  const busyRef = useRef(false);
  const leavingRef = useRef([]);

  useEffect(() => {
    if (!busyRef.current) return;
    const entering = [...new Set([...leavingRef.current.filter(el => el.isConnected), ...visibleTextTargets()])].sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    );
    leavingRef.current = [];

    animate(entering, {
      opacity: [0, 1],
      y: ['1.1em', '0em'],
      filter: ['blur(6px)', 'blur(0px)'],
      duration: 650,
      delay: stagger(22, { start: 40 }),
      ease: 'outQuart',
      onComplete: () => {
        clearInline(entering);
        busyRef.current = false;
      }
    });
  }, [lang]);

  const swap = () => {
    if (busyRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      toggle();
      return;
    }
    busyRef.current = true;
    const leaving = visibleTextTargets();
    leavingRef.current = leaving;

    animate(leaving, {
      opacity: 0,
      y: '-0.6em',
      filter: 'blur(4px)',
      duration: 220,
      delay: stagger(6),
      ease: 'inQuad',
      onComplete: toggle
    });
  };

  return (
    <button
      type="button"
      className="language-toggle ornate-button"
      onClick={swap}
      aria-label={t.toggle.aria}
      lang={lang === 'es' ? 'en' : 'es'}
    >
      <span className="language-toggle-label">{t.toggle.label}</span>
    </button>
  );
};

export default LanguageToggle;
