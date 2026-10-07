import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import './Chapter.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const RelicCard = ({ item, numeral }) => (
  <article className={`relic-card${item.highlight ? ' relic-card--highlight' : ''}`}>
    <span className="relic-numeral" aria-hidden="true">
      {numeral}
    </span>
    <p className="relic-meta">{item.meta}</p>
    <h3 className="relic-title">{item.title}</h3>
    {item.highlight && (
      <div className="relic-stat">
        <span className="relic-stat-value">{item.highlight.value}</span>
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
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
    )}
  </article>
);

const FeaturedRelic = ({ item }) => (
  <a className="featured-relic" href={item.href} target="_blank" rel="noopener noreferrer">
    <div className="featured-relic-media">
      <img src={item.image} alt={`Vista de ${item.title}`} loading="lazy" />
    </div>
    <div className="featured-relic-body">
      <p className="relic-meta">{item.meta}</p>
      <h3 className="featured-relic-title">{item.title}</h3>
      <p className="relic-desc">{item.description}</p>
      <ul className="relic-tags">
        {item.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <span className="featured-relic-cta">Visitar Evolve ↗</span>
    </div>
  </a>
);

const Chapter = ({ id, numeral, title, subtitle, items = [], featured, children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const targets = sectionRef.current.querySelectorAll('.chapter-header, .relic-card, .featured-relic, .chapter-reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(el => (el.style.opacity = 1));
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
            ease: 'outQuart'
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
      <header className="chapter-header">
        <p className="chapter-numeral">Capitulum {numeral}</p>
        <h2 className="chapter-title">{title}</h2>
        <p className="chapter-subtitle">{subtitle}</p>
        <div className="chapter-divider" aria-hidden="true">
          <span />✠<span />
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
