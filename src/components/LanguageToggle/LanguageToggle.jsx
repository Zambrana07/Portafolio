import { useLanguage } from '../../i18n/LanguageContext';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const { lang, toggle, t } = useLanguage();

  return (
    <button
      type="button"
      className="language-toggle ornate-button"
      onClick={toggle}
      aria-label={t.toggle.aria}
      lang={lang === 'es' ? 'en' : 'es'}
    >
      {t.toggle.label}
    </button>
  );
};

export default LanguageToggle;
