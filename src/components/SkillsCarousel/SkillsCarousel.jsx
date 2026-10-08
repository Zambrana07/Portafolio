import { useEffect, useRef, useState } from 'react';
import CircularCarousel from '../CircularCarousel/CircularCarousel';
import { ChevronLeft, ChevronRight, CrossIcon, PixelArt } from '../Icons/Icons';
import { CENSER_SIDEWAYS, KNOT, RELIC_PALETTE } from '../ScrollRelic/relicArt';
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

const MAX_TILT = 32;
const MIN_SCALE = 0.82;
const MIN_BRIGHTNESS = 0.55;

const applyCoverflow = scroller => {
  const center = scroller.scrollLeft + scroller.clientWidth / 2;
  for (const item of scroller.children) {
    const card = item.firstElementChild;
    const width = item.offsetWidth;
    const offset = (item.offsetLeft + width / 2 - center) / width;
    const distance = Math.min(1, Math.abs(offset));
    const direction = Math.max(-1, Math.min(1, offset));
    card.style.transform = `perspective(700px) rotateY(${-direction * MAX_TILT}deg) scale(${1 - distance * (1 - MIN_SCALE)})`;
    card.style.filter = `brightness(${1 - distance * (1 - MIN_BRIGHTNESS)})`;
    item.style.zIndex = String(10 - Math.round(distance * 5));
  }
};

const RelicTrack = ({ scrollerRef }) => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    let metrics = { maxScroll: 0, maxLeft: 0 };

    const update = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const trackWidth = track.clientWidth;
      const minWidth = thumb.firstElementChild.getBoundingClientRect().width * 2 + 36;
      const thumbWidth = Math.min(trackWidth, Math.max(minWidth, (trackWidth * scroller.clientWidth) / scroller.scrollWidth));
      const maxLeft = trackWidth - thumbWidth;
      metrics = { maxScroll, maxLeft };
      thumb.style.width = `${thumbWidth}px`;
      thumb.style.transform = `translateX(${maxScroll > 0 ? (scroller.scrollLeft / maxScroll) * maxLeft : 0}px)`;
    };

    const onThumbDown = event => {
      event.preventDefault();
      const startX = event.clientX;
      const startScroll = scroller.scrollLeft;
      thumb.setPointerCapture(event.pointerId);
      scroller.style.scrollSnapType = 'none';
      track.classList.add('is-dragging');

      const onMove = moveEvent => {
        if (!metrics.maxLeft) return;
        scroller.scrollLeft = startScroll + ((moveEvent.clientX - startX) / metrics.maxLeft) * metrics.maxScroll;
      };
      const onUp = () => {
        track.classList.remove('is-dragging');
        scroller.style.scrollSnapType = '';
        thumb.removeEventListener('pointermove', onMove);
        thumb.removeEventListener('pointerup', onUp);
        thumb.removeEventListener('pointercancel', onUp);
      };

      thumb.addEventListener('pointermove', onMove);
      thumb.addEventListener('pointerup', onUp);
      thumb.addEventListener('pointercancel', onUp);
    };

    const onTrackDown = event => {
      if (thumb.contains(event.target) || !metrics.maxLeft) return;
      const rect = track.getBoundingClientRect();
      const ratio = (event.clientX - rect.left - thumb.offsetWidth / 2) / metrics.maxLeft;
      scroller.scrollTo({ left: Math.min(1, Math.max(0, ratio)) * metrics.maxScroll, behavior: 'smooth' });
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(track);
    scroller.addEventListener('scroll', update, { passive: true });
    thumb.addEventListener('pointerdown', onThumbDown);
    track.addEventListener('pointerdown', onTrackDown);
    update();

    return () => {
      resizeObserver.disconnect();
      scroller.removeEventListener('scroll', update);
      thumb.removeEventListener('pointerdown', onThumbDown);
      track.removeEventListener('pointerdown', onTrackDown);
    };
  }, [scrollerRef]);

  return (
    <div ref={trackRef} className="relic-track" aria-hidden="true">
      <div ref={thumbRef} className="relic-track-thumb">
        <PixelArt grid={CENSER_SIDEWAYS} palette={RELIC_PALETTE} className="relic-track-censer" />
        <div className="relic-track-rod">
          <PixelArt grid={KNOT} palette={RELIC_PALETTE} className="relic-track-knot" />
        </div>
        <PixelArt grid={CENSER_SIDEWAYS} palette={RELIC_PALETTE} className="relic-track-censer relic-track-censer--end" />
      </div>
    </div>
  );
};

const SkillsSwiper = ({ skills }) => {
  const scrollerRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const scroller = scrollerRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      applyCoverflow(scroller);
      const max = scroller.scrollWidth - scroller.clientWidth;
      const start = scroller.scrollLeft <= 4;
      const end = scroller.scrollLeft >= max - 4;
      setEdge(prev => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    scroller.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
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
        <button type="button" className="skills-arrow ornate-button" onClick={() => step(-1)} disabled={edge.start} aria-label="Habilidad anterior">
          <ChevronLeft />
        </button>
        <RelicTrack scrollerRef={scrollerRef} />
        <button type="button" className="skills-arrow ornate-button" onClick={() => step(1)} disabled={edge.end} aria-label="Siguiente habilidad">
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
