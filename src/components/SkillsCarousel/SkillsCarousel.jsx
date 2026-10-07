import CircularCarousel from '../CircularCarousel/CircularCarousel';
import './SkillsCarousel.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

const renderSkill = (skill, index) => (
  <div className="skill-card">
    <span className="skill-card-numeral">{ROMAN[index]}</span>
    <span className="skill-card-cross">✠</span>
    <p className="skill-card-title">{skill.title}</p>
    <p className="skill-card-category">{skill.subtitle}</p>
  </div>
);

const SkillsCarousel = ({ skills }) => {
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
      <ul className="skills-list-sr">
        {skills.map(skill => (
          <li key={skill.title}>
            {skill.title} ({skill.subtitle})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsCarousel;
