import { useEffect, useRef } from 'react';
import { animate, stagger, splitText } from 'animejs';
import './HeroName.css';

const HeroName = ({ lines }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const splits = [...titleRef.current.querySelectorAll('.hero-name-line')].map(line =>
      splitText(line, { words: false, chars: true })
    );
    const chars = splits.flatMap(split => split.chars);

    const animation = animate(chars, {
      y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      rotate: {
        from: '-1turn',
        delay: 0
      },
      delay: stagger(50),
      ease: 'inOutCirc',
      loopDelay: 7000,
      loop: true
    });

    return () => {
      animation.revert();
      splits.forEach(split => split.revert());
    };
  }, [lines]);

  return (
    <h1 ref={titleRef} className="hero-name" aria-label={lines.join(' ')}>
      {lines.map(line => (
        <span key={line} className="hero-name-line" aria-hidden="true">
          {line}
        </span>
      ))}
    </h1>
  );
};

export default HeroName;
