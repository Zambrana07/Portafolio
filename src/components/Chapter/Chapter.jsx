import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { ArrowIcon, CrossIcon, GoldText } from '../Icons/Icons';
import { SWORD_FOCUS_EVENT } from '../../lib/swordFocus';
import './Chapter.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const TILT_X = 3;
const TILT_Y = 4;

const RelicCard = ({ item, numeral }) => (
  <article className={`relic-card ornate-frame tilt-card${item.highlight ? ' relic-card--highlight' : ''}`}>
    <span className="relic-numeral ornate-button" aria-hidden="true">
      {numeral}
    </span>
    <p className="relic-meta">{item.meta}</p>
    <GoldText as="h3" className="relic-title tilt-pop">
      {item.title}
    </GoldText>
    {item.highlight && (
      <div className="relic-stat tilt-pop">
        <GoldText className="relic-stat-value">{item.highlight.value}</GoldText>
        <span className="relic-stat-label">{item.highlight.label}</span>
      </div>
    )}
    <p className="relic-desc">{item.description}</p>
    {item.tags.length > 0 && (
      <ul className="relic-tags">
        {item.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    )}
    {item.links.length > 0 && (
      <div className="relic-links">
        {item.links.map(link => (
          <a key={link.href} className="ornate-button" href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} <ArrowIcon />
          </a>
        ))}
      </div>
    )}
  </article>
);

const FeaturedRelic = ({ item }) => (
  <a className="featured-relic ornate-frame tilt-card" href={item.href} target="_blank" rel="noopener noreferrer">
    <span className="featured-relic-badge ornate-button">
      <CrossIcon /> Opus Magnum <CrossIcon />
    </span>
    <div className="featured-relic-media">
      <img src={item.image} alt={`Vista de ${item.title}`} loading="lazy" />
    </div>
    <div className="featured-relic-body">
      <p className="relic-meta">{item.meta}</p>
      <GoldText as="h3" className="featured-relic-title tilt-pop">
        {item.title}
      </GoldText>
      <p className="relic-desc">{item.description}</p>
      <ul className="relic-tags">
        {item.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <span className="featured-relic-cta ornate-button tilt-pop">
        Visitar Evolve <ArrowIcon />
      </span>
    </div>
  </a>
);

const useCardTilt = sectionRef => {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cards = [...sectionRef.current.querySelectorAll('.tilt-card')];

    const handlers = cards.map(card => {
      const move = e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(px - 0.5) * TILT_Y}deg`);
        card.style.setProperty('--rx', `${(0.5 - py) * TILT_X}deg`);
      };
      const enter = () => {
        card.classList.add('is-tilting');
        window.dispatchEvent(new CustomEvent(SWORD_FOCUS_EVENT, { detail: card }));
      };
      const leave = () => {
        card.classList.remove('is-tilting');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        window.dispatchEvent(new CustomEvent(SWORD_FOCUS_EVENT, { detail: null }));
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      return { card, move, enter, leave };
    });

    return () =>
      handlers.forEach(({ card, move, enter, leave }) => {
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
      });
  }, [sectionRef]);
};

const Chapter = ({ id, numeral, title, subtitle, items = [], featured, children }) => {
  const sectionRef = useRef(null);
  useCardTilt(sectionRef);

  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll(
      '.chapter-header, .relic-card, .featured-relic, .chapter-reveal'
    );
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => {
        el.style.opacity = 1;
        el.classList.add('tilt-ready');
      });
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animate(entry.target, {
            opacity: [0, 1],
            y: ['3rem', 0],
            filter: ['blur(8px)', 'blur(0px)'],
            duration: 1200,
            ease: 'outQuart',
            onComplete: () => {
              entry.target.style.filter = '';
              entry.target.style.transform = '';
              entry.target.classList.add('tilt-ready');
            }
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="chapter">
      <div className="chapter-rule" aria-hidden="true">
        <span />
        <CrossIcon />
        <span />
      </div>

      <header className="chapter-header">
        <p className="chapter-numeral">Capitulum {numeral}</p>
        <GoldText as="h2" className="chapter-title">
          {title}
        </GoldText>
        <p className="chapter-subtitle">{subtitle}</p>
        <div className="chapter-divider" aria-hidden="true">
          <span />
          <CrossIcon />
          <span />
        </div>
      </header>

      {featured && <FeaturedRelic item={featured} />}

      {children}

      {items.length > 0 && (
        <div className="chapter-list">
          {items.map((item, i) => (
            <RelicCard key={item.title} item={item} numeral={ROMAN[i]} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Chapter;
