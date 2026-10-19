import { lazy, Suspense, useEffect, useMemo } from 'react';
import CathedralFog from './components/CathedralFog/CathedralFog';
import HeroName from './components/HeroName/HeroName';
import Chapter from './components/Chapter/Chapter';
import SkillsCarousel from './components/SkillsCarousel/SkillsCarousel';
import Certificates from './components/Certificates/Certificates';
import Footer from './components/Footer/Footer';
import ScrollRelic from './components/ScrollRelic/ScrollRelic';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';
import { GoldText } from './components/Icons/Icons';
import { localize, useLanguage } from './i18n/LanguageContext';
import * as portfolio from './data/portfolio';

const GITHUB_URL = 'https://github.com/Zambrana07';
const CURRICULUM_URL = 'https://curriculum-seven-kappa.vercel.app';
const NAME_LINES = ['Alexander Zambrana', 'Rodriguez'];
const ROLE = 'Software Engineer';
const SOCIALS = [
  { id: 'mail', value: 'zambrana046@gmail.com', href: 'mailto:zambrana046@gmail.com' },
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
const SECTION_IDS = ['proyectos', 'experiencia', 'habilidades', 'certificados'];
const SWORD_MODEL_URL = '/models/mea-culpa/mea-culpa.glb';

const SwordScene = lazy(() => import('./components/SwordScene/SwordScene'));
const connection = navigator.connection;
const LOW_DATA = Boolean(connection?.saveData || /2g/.test(connection?.effectiveType ?? ''));

const releaseFocus = () => {
  const active = document.activeElement;
  if (active?.matches?.('a[target="_blank"]')) active.blur();
};

const App = () => {
  const { lang, t } = useLanguage();
  const { featuredProjects, projects, experience, skills, certificates } = useMemo(() => localize(portfolio, lang), [lang]);
  const socials = useMemo(
    () => SOCIALS.map(social => (social.id === 'mail' ? { ...social, label: t.footer.email } : social)),
    [t]
  );

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
      {!LOW_DATA && (
        <Suspense fallback={null}>
          <SwordScene modelUrl={SWORD_MODEL_URL} />
        </Suspense>
      )}
      <LanguageToggle />

      <main className="page">
        <section className="hero" id="inicio">
          <GoldText as="p" className="hero-kicker">
            {t.hero.kicker}
          </GoldText>
          <HeroName lines={NAME_LINES} />
          <GoldText as="p" className="hero-role">
            {ROLE}
          </GoldText>
          <a className="hero-cv ornate-button" href={CURRICULUM_URL} target="_blank" rel="noopener noreferrer">
            {t.hero.curriculum}
          </a>
          <nav className="hero-menu" aria-label={t.hero.menuLabel}>
            {SECTION_IDS.map(id => (
              <a key={id} href={`#${id}`}>
                {t.sections[id]}
              </a>
            ))}
          </nav>
          <a className="hero-scroll" href="#proyectos">
            {t.hero.scroll}
          </a>
        </section>

        <Chapter
          id="proyectos"
          numeral="I"
          title={t.sections.proyectos}
          subtitle="Opera"
          featured={featuredProjects}
          items={projects}
        />
        <Chapter id="experiencia" numeral="II" title="Experientia" subtitle={t.sections.experiencia} items={experience} />
        <Chapter id="habilidades" numeral="III" title="Artes" subtitle={t.sections.habilidades}>
          <SkillsCarousel skills={skills} />
        </Chapter>
        <Chapter id="certificados" numeral="IV" title="Diplomata" subtitle={t.sections.certificados}>
          <Certificates items={certificates} />
        </Chapter>
      </main>

      <Footer name={NAME_LINES.join(' ')} role={ROLE} socials={socials} />
      <ScrollRelic />
    </>
  );
};

export default App;
