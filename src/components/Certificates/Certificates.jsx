import { useRef, useState } from 'react';
import { GoldText } from '../Icons/Icons';
import { useLanguage } from '../../i18n/LanguageContext';
import './Certificates.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const Certificates = ({ items }) => {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const active = activeIndex === null ? null : items[activeIndex];

  const open = index => {
    setActiveIndex(index);
    dialogRef.current.showModal();
  };

  const close = () => dialogRef.current.close();

  return (
    <>
      <div className="cert-grid">
        {items.map((cert, i) => (
          <button key={cert.image} type="button" className="cert-card ornate-frame tilt-card chapter-reveal" onClick={() => open(i)}>
            <span className="cert-card-numeral ornate-button">{ROMAN[i]}</span>
            <span className="cert-card-media">
              <img src={cert.image} alt="" loading="lazy" />
            </span>
            <span className="cert-card-body">
              <span className="cert-card-issuer">{cert.issuer}</span>
              <GoldText className="cert-card-title">{cert.title}</GoldText>
              <span className="cert-card-date">{cert.date}</span>
              <span className="cert-card-detail">{cert.detail}</span>
              <span className="cert-card-cta ornate-button">{t.certificates.cta}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="cert-dialog"
        onClick={e => e.target === dialogRef.current && close()}
        onClose={() => setActiveIndex(null)}
      >
        {active && (
          <figure className="cert-dialog-figure ornate-frame">
            <img src={active.image} alt={`${t.certificates.alt}: ${active.title}`} />
            <figcaption>
              {active.title} · {active.issuer}
              {active.url && (
                <>
                  {' · '}
                  <a href={active.url} target="_blank" rel="noreferrer">
                    {t.certificates.verify}
                  </a>
                </>
              )}
            </figcaption>
            <button type="button" className="cert-dialog-close ornate-button" onClick={close} aria-label={t.certificates.close}>
              ×
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
};

export default Certificates;
