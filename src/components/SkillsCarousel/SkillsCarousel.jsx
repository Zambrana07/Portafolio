import { useEffect, useRef, useState } from 'react';
import CircularCarousel from '../CircularCarousel/CircularCarousel';
import { ChevronLeft, ChevronRight, CrossIcon, PixelArt } from '../Icons/Icons';
import { CENSER_SIDEWAYS, KNOT, RELIC_PALETTE } from '../ScrollRelic/relicArt';
import { useLanguage } from '../../i18n/LanguageContext';
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
    {skills.map((skill, i) => (
      <li key={i}>
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

const RelicTrack = ({ scrollerRef, active = 0, count = 1, onSeek }) => {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const activeRef = useRef(active);
  const countRef = useRef(count);
  const onSeekRef = useRef(onSeek);
  activeRef.current = active;
  countRef.current = Math.max(count, 1);
  onSeekRef.current = onSeek;

  useEffect(() => {
    const scroller = scrollerRef?.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    let metrics = { maxScroll: 0, maxLeft: 0 };
    let dragging = false;

    const thumbMin = () => thumb.firstElementChild.getBoundingClientRect().width * 2 + 36;

    const updateFromScroller = () => {
      if (!scroller) return;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const trackWidth = track.clientWidth;
      const thumbWidth = Math.min(trackWidth, Math.max(thumbMin(), (trackWidth * scroller.clientWidth) / scroller.scrollWidth));
      const maxLeft = trackWidth - thumbWidth;
      metrics = { maxScroll, maxLeft };
      thumb.style.width = `${thumbWidth}px`;
      thumb.style.transform = `translateX(${maxScroll > 0 ? (scroller.scrollLeft / maxScroll) * maxLeft : 0}px)`;
    };

    const updateFromIndex = () => {
      if (scroller) return;
      const trackWidth = track.clientWidth;
      const total = countRef.current;
      const thumbWidth = Math.min(trackWidth, Math.max(thumbMin(), trackWidth / total));
      const maxLeft = Math.max(0, trackWidth - thumbWidth);
      metrics = { maxScroll: total - 1, maxLeft };
      thumb.style.width = `${thumbWidth}px`;
      if (dragging) return;
      const ratio = total > 1 ? activeRef.current / (total - 1) : 0;
      thumb.style.transform = `translateX(${ratio * maxLeft}px)`;
    };

    const update = () => (scroller ? updateFromScroller() : updateFromIndex());

    const ratioFromClientX = clientX => {
      if (!metrics.maxLeft) return 0;
      const rect = track.getBoundingClientRect();
      return Math.min(1, Math.max(0, (clientX - rect.left - thumb.offsetWidth / 2) / metrics.maxLeft));
    };

    const applyRatio = (ratio, settle = false) => {
      if (scroller) {
        if (settle) {
          scroller.scrollTo({ left: ratio * metrics.maxScroll, behavior: 'smooth' });
        } else {
          scroller.scrollLeft = ratio * metrics.maxScroll;
        }
        return;
      }
      thumb.style.transform = `translateX(${ratio * metrics.maxLeft}px)`;
      onSeekRef.current?.(ratio, settle);
    };

    const onThumbDown = event => {
      event.preventDefault();
      const startX = event.clientX;
      const startLeft = scroller
        ? scroller.scrollLeft
        : (activeRef.current / Math.max(countRef.current - 1, 1)) * metrics.maxLeft;
      thumb.setPointerCapture(event.pointerId);
      if (scroller) scroller.style.scrollSnapType = 'none';
      track.classList.add('is-dragging');
      dragging = true;
      let lastRatio = startLeft / (metrics.maxLeft || 1);

      const onMove = moveEvent => {
        if (!metrics.maxLeft) return;
        if (scroller) {
          scroller.scrollLeft = startLeft + ((moveEvent.clientX - startX) / metrics.maxLeft) * metrics.maxScroll;
          return;
        }
        lastRatio = Math.min(1, Math.max(0, startLeft / metrics.maxLeft + (moveEvent.clientX - startX) / metrics.maxLeft));
        applyRatio(lastRatio, false);
      };
      const onUp = () => {
        dragging = false;
        track.classList.remove('is-dragging');
        if (scroller) scroller.style.scrollSnapType = '';
        else applyRatio(lastRatio, true);
        thumb.removeEventListener('pointermove', onMove);
        thumb.removeEventListener('pointerup', onUp);
        thumb.removeEventListener('pointercancel', onUp);
        update();
      };

      thumb.addEventListener('pointermove', onMove);
      thumb.addEventListener('pointerup', onUp);
      thumb.addEventListener('pointercancel', onUp);
    };

    const onTrackDown = event => {
      if (thumb.contains(event.target) || !metrics.maxLeft) return;
      applyRatio(ratioFromClientX(event.clientX), true);
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(track);
    scroller?.addEventListener('scroll', update, { passive: true });
    thumb.addEventListener('pointerdown', onThumbDown);
    track.addEventListener('pointerdown', onTrackDown);
    update();

    return () => {
      resizeObserver.disconnect();
      scroller?.removeEventListener('scroll', update);
      thumb.removeEventListener('pointerdown', onThumbDown);
      track.removeEventListener('pointerdown', onTrackDown);
    };
  }, [scrollerRef]);

  useEffect(() => {
    if (scrollerRef?.current) return;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const trackWidth = track.clientWidth;
    const total = Math.max(count, 1);
    const minWidth = thumb.firstElementChild.getBoundingClientRect().width * 2 + 36;
    const thumbWidth = Math.min(trackWidth, Math.max(minWidth, trackWidth / total));
    const maxLeft = Math.max(0, trackWidth - thumbWidth);
    thumb.style.width = `${thumbWidth}px`;
    const ratio = total > 1 ? active / (total - 1) : 0;
    thumb.style.transform = `translateX(${ratio * maxLeft}px)`;
  }, [active, count, scrollerRef]);

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
  const { t } = useLanguage();
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
      <ul ref={scrollerRef} className="skills-swiper" aria-label={t.skills.label}>
        {skills.map((skill, i) => (
          <li key={i} className="skills-swiper-card">
            {renderSkill(skill, i)}
          </li>
        ))}
      </ul>
      <div className="skills-controls">
        <button type="button" className="skills-arrow ornate-button" onClick={() => step(-1)} disabled={edge.start} aria-label={t.skills.previous}>
          <ChevronLeft />
        </button>
        <RelicTrack scrollerRef={scrollerRef} />
        <button type="button" className="skills-arrow ornate-button" onClick={() => step(1)} disabled={edge.end} aria-label={t.skills.next}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const SkillsRing = ({ skills }) => {
  const { t } = useLanguage();
  const apiRef = useRef(null);
  const [active, setActive] = useState(0);

  return (
    <div className="skills-stage chapter-reveal">
      <CircularCarousel
        items={skills}
        renderItem={renderSkill}
        label={t.skills.label}
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
        apiRef={apiRef}
        onChange={setActive}
      />
      <div className="skills-controls skills-controls--ring">
        <RelicTrack
          active={active}
          count={skills.length}
          onSeek={(ratio, settle) => apiRef.current?.seekProgress(ratio, settle)}
        />
      </div>
      <SkillsList skills={skills} />
    </div>
  );
};

const SkillsCarousel = ({ skills }) => {
  const lite = useLiteMode();
  if (lite) return <SkillsSwiper skills={skills} />;
  return <SkillsRing skills={skills} />;
};

export default SkillsCarousel;
