import { useEffect } from 'react';
import CathedralFog from './components/CathedralFog/CathedralFog';
import SwordScene from './components/SwordScene/SwordScene';
import HeroName from './components/HeroName/HeroName';
import Chapter from './components/Chapter/Chapter';
import SkillsCarousel from './components/SkillsCarousel/SkillsCarousel';
import Certificates from './components/Certificates/Certificates';
import Footer from './components/Footer/Footer';
import ScrollRelic from './components/ScrollRelic/ScrollRelic';
import { CrossIcon, GoldText } from './components/Icons/Icons';
import { featuredProject, projects, experience, skills, certificates } from './data/portfolio';

const GITHUB_URL = 'https://github.com/Zambrana07';
const NAME_LINES = ['Alexander Zambrana', 'Rodriguez'];
const ROLE = 'Software Engineer';
const SOCIALS = [
  { id: 'mail', label: 'Correo', value: 'zambrana046@gmail.com', href: 'mailto:zambrana046@gmail.com' },
  { id: 'whatsapp', label: 'WhatsApp', value: '+506 6006 1848', href: 'https://wa.me/50660061848', external: true },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Alexander Zambrana',
    href: 'https://www.linkedin.com/in/alexander-zambrana-191773367/',
    external: true
  },
  { id: 'github', label: 'GitHub', value: 'Zambrana07', href: GITHUB_URL, external: true }
];
const SWORD_MODEL_URL = '/models/mea-culpa/mea-culpa.glb';

const releaseFocus = () => {
  const active = document.activeElement;
  if (active?.matches?.('a[target="_blank"]')) active.blur();
};

const App = () => {
  useEffect(() => {
    const onClick = event => {
      if (event.target.closest?.('a[target="_blank"]')) setTimeout(releaseFocus, 0);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', releaseFocus);
    window.addEventListener('focus', releaseFocus);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', releaseFocus);
      window.removeEventListener('focus', releaseFocus);
    };
  }, []);

  return (
    <>
      <CathedralFog />
      <SwordScene modelUrl={SWORD_MODEL_URL} />

      <main className="page">
        <section className="hero" id="inicio">
          <p className="hero-kicker">
            <CrossIcon />
            Portafolio
            <CrossIcon />
          </p>
          <HeroName lines={NAME_LINES} />
          <GoldText as="p" className="hero-role">
            {ROLE}
          </GoldText>
          <nav className="hero-menu" aria-label="Secciones">
            <a href="#proyectos">Proyectos</a>
            <a href="#experiencia">Experiencia</a>
            <a href="#habilidades">Habilidades</a>
            <a href="#certificados">Certificados</a>
          </nav>
          <a className="hero-scroll" href="#proyectos">
            Desliza para continuar
          </a>
        </section>

        <Chapter id="proyectos" numeral="I" title="Proyectos" subtitle="Opera" featured={featuredProject} items={projects} />
        <Chapter id="experiencia" numeral="II" title="Experientia" subtitle="Experiencia" items={experience} />
        <Chapter id="habilidades" numeral="III" title="Artes" subtitle="Habilidades">
          <SkillsCarousel skills={skills} />
        </Chapter>
        <Chapter id="certificados" numeral="IV" title="Diplomata" subtitle="Certificados">
          <Certificates items={certificates} />
        </Chapter>
      </main>

      <Footer name={NAME_LINES.join(' ')} role={ROLE} socials={SOCIALS} />
      <ScrollRelic />
    </>
  );
};

export default App;
