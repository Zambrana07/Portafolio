import { useRef, useState } from 'react';
import { GoldText } from '../Icons/Icons';
import './Certificates.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const Certificates = ({ items }) => {
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);

  const open = cert => {
    setActive(cert);
    dialogRef.current.showModal();
  };

  const close = () => dialogRef.current.close();

  return (
    <>
      <div className="cert-grid">
        {items.map((cert, i) => (
          <button key={cert.title} type="button" className="cert-card ornate-frame tilt-card chapter-reveal" onClick={() => open(cert)}>
            <span className="cert-card-numeral ornate-button">{ROMAN[i]}</span>
            <span className="cert-card-media">
              <img src={cert.image} alt="" loading="lazy" />
            </span>
            <span className="cert-card-body">
              <span className="cert-card-issuer">{cert.issuer}</span>
              <GoldText className="cert-card-title tilt-pop">{cert.title}</GoldText>
              <span className="cert-card-date">{cert.date}</span>
              <span className="cert-card-detail">{cert.detail}</span>
              <span className="cert-card-cta ornate-button">Ver certificado</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="cert-dialog"
        onClick={e => e.target === dialogRef.current && close()}
        onClose={() => setActive(null)}
      >
        {active && (
          <figure className="cert-dialog-figure ornate-frame">
            <img src={active.image} alt={`Certificado: ${active.title}`} />
            <figcaption>
              {active.title} · {active.issuer}
            </figcaption>
            <button type="button" className="cert-dialog-close ornate-button" onClick={close} aria-label="Cerrar">
              ×
            </button>
          </figure>
        )}
      </dialog>
    </>
  );
};

export default Certificates;
