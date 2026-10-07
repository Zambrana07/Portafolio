import CathedralFog from './components/CathedralFog/CathedralFog';
import SwordScene from './components/SwordScene/SwordScene';
import HeroName from './components/HeroName/HeroName';
import Chapter from './components/Chapter/Chapter';
import GithubBubble from './components/GithubBubble/GithubBubble';
import SkillsCarousel from './components/SkillsCarousel/SkillsCarousel';
import { featuredProject, projects, experience, skills } from './data/portfolio';

const GITHUB_URL = 'https://github.com/Zambrana07';
const NAME_LINES = ['Alexander Zambrana', 'Rodriguez'];
const SWORD_MODEL_URL = '/models/mea-culpa/mea-culpa.glb';

const App = () => {
  return (
    <>
      <CathedralFog />
      <SwordScene modelUrl={SWORD_MODEL_URL} />

      <main className="page">
        <section className="hero" id="inicio">
          <p className="hero-kicker">✠ Portafolio ✠</p>
          <HeroName lines={NAME_LINES} />
          <nav className="hero-menu" aria-label="Secciones">
            <a href="#proyectos">Proyectos</a>
            <a href="#experiencia">Experiencia</a>
            <a href="#habilidades">Habilidades</a>
          </nav>
          <a className="hero-scroll" href="#proyectos">
            Desliza para continuar
          </a>
        </section>

        <Chapter id="proyectos" numeral="I" title="Opera" subtitle="Proyectos" featured={featuredProject} items={projects} />
        <Chapter id="experiencia" numeral="II" title="Peregrinatio" subtitle="Experiencia" items={experience} />
        <Chapter id="habilidades" numeral="III" title="Artes" subtitle="Habilidades">
          <SkillsCarousel skills={skills} />
        </Chapter>
      </main>

      <footer className="site-footer">
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
        <p>Inspirado en Blasphemous de The Game Kitchen. Sitio personal sin afiliación oficial.</p>
      </footer>

      <GithubBubble href={GITHUB_URL} />
    </>
  );
};

export default App;
