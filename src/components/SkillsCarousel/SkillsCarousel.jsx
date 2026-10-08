import { useEffect, useRef, useState } from 'react';
import CircularCarousel from '../CircularCarousel/CircularCarousel';
import { ChevronLeft, ChevronRight, CrossIcon } from '../Icons/Icons';
import './SkillsCarousel.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
const LITE_QUERY = '(max-width: 900px), (pointer: coarse)';

const useLiteMode = () => {
  const [lite, setLite] = useState(() => window.matchMedia(LITE_QUERY).matches);
  useEffect(() => {
    const query = window.matchMedia(LITE_QUERY);
    const update = () => setLite(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return lite;
};

const renderSkill = (skill, index) => (
  <div className="skill-card pixel-frame pixel-frame--crimson">
    <span className="skill-card-numeral">{ROMAN[index]}</span>
    <CrossIcon className="skill-card-cross" />
    <p className="skill-card-title">{skill.title}</p>
    <p className="skill-card-category">{skill.subtitle}</p>
  </div>
);

const SkillsList = ({ skills }) => (
  <ul className="skills-list-sr">
    {skills.map(skill => (
      <li key={skill.title}>
        {skill.title} ({skill.subtitle})
      </li>
    ))}
  </ul>
);

const SkillsSwiper = ({ skills }) => {
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      setProgress(max > 0 ? scroller.scrollLeft / max : 0);
    };
    update();
    scroller.addEventListener('scroll', update, { passive: true });
    return () => scroller.removeEventListener('scroll', update);
  }, []);

  const step = dir => {
    const scroller = scrollerRef.current;
    const card = scroller.firstElementChild;
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    scroller.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <div className="skills-stage skills-stage--lite chapter-reveal">
      <ul ref={scrollerRef} className="skills-swiper" aria-label="Habilidades">
        {skills.map((skill, i) => (
          <li key={skill.title} className="skills-swiper-card">
            {renderSkill(skill, i)}
          </li>
        ))}
      </ul>
      <div className="skills-controls">
        <button type="button" className="skills-arrow ornate-button" onClick={() => step(-1)} disabled={progress <= 0.01} aria-label="Habilidad anterior">
          <ChevronLeft />
        </button>
        <div className="skills-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.12 + progress * 0.88})` }} />
        </div>
        <button type="button" className="skills-arrow ornate-button" onClick={() => step(1)} disabled={progress >= 0.99} aria-label="Siguiente habilidad">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const SkillsCarousel = ({ skills }) => {
  const lite = useLiteMode();

  if (lite) return <SkillsSwiper skills={skills} />;

  return (
    <div className="skills-stage chapter-reveal">
      <CircularCarousel
        items={skills}
        renderItem={renderSkill}
        label="Habilidades"
        preset="panorama"
        intro="rise"
        cardWidth={220}
        aspectRatio={0.78}
        speed={10}
        gap={28}
        autoplay="drift"
        direction="left"
        momentum={0.6}
        snap
        pauseOnHover
        focusOnClick
        draggable
        parallax={0.3}
        stretch={0.5}
        fadeColor="#0b0807"
        depthFade={0.6}
        innerShade={0.6}
        cornerRadius={4}
      />
      <SkillsList skills={skills} />
    </div>
  );
};

export default SkillsCarousel;
