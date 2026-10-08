import { useEffect, useRef } from 'react';
import { PixelArt } from '../Icons/Icons';
import { CENSER, KNOT, RELIC_PALETTE as PALETTE } from './relicArt';
import './ScrollRelic.css';

const IDLE_DELAY = 900;

const ScrollRelic = () => {
  const rootRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const thumb = thumbRef.current;
    const doc = document.documentElement;
    let frame = 0;
    let idleTimer = 0;
    let metrics = { maxScroll: 0, maxTop: 0 };

    const update = () => {
      frame = 0;
      const view = window.innerHeight;
      const maxScroll = doc.scrollHeight - view;
      const railHeight = root.clientHeight;
      const minHeight = thumb.firstElementChild.getBoundingClientRect().height * 2 + 48;
      const thumbHeight = Math.min(railHeight, Math.max(minHeight, (railHeight * view) / doc.scrollHeight));
      const maxTop = railHeight - thumbHeight;
      const top = maxScroll > 0 ? (window.scrollY / maxScroll) * maxTop : 0;

      metrics = { maxScroll, maxTop };
      root.classList.toggle('is-hidden', maxScroll <= 0);
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onScroll = () => {
      schedule();
      root.classList.add('is-active');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => root.classList.remove('is-active'), IDLE_DELAY);
    };

    const onThumbDown = event => {
      event.preventDefault();
      const startY = event.clientY;
      const startScroll = window.scrollY;
      thumb.setPointerCapture(event.pointerId);
      root.classList.add('is-dragging');

      const onMove = moveEvent => {
        if (!metrics.maxTop) return;
        const delta = ((moveEvent.clientY - startY) / metrics.maxTop) * metrics.maxScroll;
        window.scrollTo({ top: startScroll + delta, behavior: 'instant' });
      };
      const onUp = () => {
        root.classList.remove('is-dragging');
        thumb.removeEventListener('pointermove', onMove);
        thumb.removeEventListener('pointerup', onUp);
        thumb.removeEventListener('pointercancel', onUp);
      };

      thumb.addEventListener('pointermove', onMove);
      thumb.addEventListener('pointerup', onUp);
      thumb.addEventListener('pointercancel', onUp);
    };

    const onRailDown = event => {
      if (thumb.contains(event.target) || !metrics.maxTop) return;
      const rect = root.getBoundingClientRect();
      const ratio = (event.clientY - rect.top - thumb.offsetHeight / 2) / metrics.maxTop;
      window.scrollTo({ top: Math.min(1, Math.max(0, ratio)) * metrics.maxScroll, behavior: 'smooth' });
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    thumb.addEventListener('pointerdown', onThumbDown);
    root.addEventListener('pointerdown', onRailDown);
    update();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
      thumb.removeEventListener('pointerdown', onThumbDown);
      root.removeEventListener('pointerdown', onRailDown);
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-relic" aria-hidden="true">
      <div ref={thumbRef} className="scroll-relic-thumb">
        <PixelArt grid={CENSER} palette={PALETTE} className="scroll-relic-censer" />
        <div className="scroll-relic-rod">
          <PixelArt grid={KNOT} palette={PALETTE} className="scroll-relic-knot" />
        </div>
        <PixelArt grid={CENSER} palette={PALETTE} className="scroll-relic-censer scroll-relic-censer--bottom" />
      </div>
    </div>
  );
};

export default ScrollRelic;
