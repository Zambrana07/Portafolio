import { GoldText } from '../Icons/Icons';
import './Footer.css';

const ICONS = {
  mail: 'M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1.6 2L12 12.2 20.4 6H3.6ZM21 7.6l-8.4 6.2a1 1 0 0 1-1.2 0L3 7.6V18h18V7.6Z',
  whatsapp:
    'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm8.41-18.3A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  github:
    'M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'
};

const SECTIONS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#certificados', label: 'Certificados' }
];

const Footer = ({ name, role, socials }) => {
  return (
    <footer className="site-footer">
      <div className="footer-panel ornate-frame">
        <blockquote className="footer-quote">
          <p>«Si no vives para servir, no sirves para vivir.»</p>
        </blockquote>

        <div className="footer-grid">
          <div className="footer-brand">
            <GoldText as="p" className="footer-name">
              {name}
            </GoldText>
            <p className="footer-role">{role}</p>
            <p className="footer-text">
              Disponible para proyectos, colaboraciones y oportunidades laborales. Escríbeme y te respondo pronto.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Secciones del sitio">
            <GoldText as="h2" className="footer-heading">
              Indice
            </GoldText>
            <ul>
              {SECTIONS.map(section => (
                <li key={section.href}>
                  <a href={section.href}>{section.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact">
            <GoldText as="h2" className="footer-heading">
              Contacto
            </GoldText>
            <ul>
              {socials.map(social => (
                <li key={social.id}>
                  <a
                    className="footer-social"
                    href={social.href}
                    {...(social.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span className="footer-social-icon ornate-button" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d={ICONS[social.id]} />
                      </svg>
                    </span>
                    <span className="footer-social-text">
                      <span className="footer-social-label">{social.label}</span>
                      <span className="footer-social-value">{social.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {name}.
          </p>
          <a className="footer-top ornate-button" href="#inicio">
            Volver arriba
          </a>
        </div>

        <div className="footer-credits">
          <p>
            Modelo 3D{' '}
            <a href="https://sketchfab.com/3d-models/mea-culpa-sword-5c2a7df62ee040d39687f873631c5830" target="_blank" rel="noopener noreferrer">
              “Mea Culpa-Sword”
            </a>{' '}
            por{' '}
            <a href="https://sketchfab.com/Dalopera3D" target="_blank" rel="noopener noreferrer">
              Dalopera3D
            </a>
            , bajo licencia{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
              CC BY 4.0
            </a>
            .
          </p>
          <p>
            Tipografía{' '}
            <a href="https://fontstruct.com/fontstructions/show/2138043" target="_blank" rel="noopener noreferrer">
              “Blasphemous”
            </a>{' '}
            por Patrick H. Lauke, bajo licencia{' '}
            <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">
              CC BY 3.0
            </a>
            .
          </p>
          <p>Inspirado en Blasphemous de The Game Kitchen. Sitio personal sin afiliación oficial.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
