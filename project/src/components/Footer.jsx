import { useApp } from '../context/AppContext';
import { PHONE_LINK, PHONE_NUMBER, LANGUAGES } from '../services/translations';

export default function Footer() {
  const { t, lang, changeLang } = useApp();

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'how', label: t.nav.howItWorks },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="nav-logo-icon">💧</span>
              <span className="nav-logo-text">Mobil Moyka</span>
            </div>
            <p className="footer-slogan">{t.footer.slogan}</p>
            <a href={PHONE_LINK} className="footer-phone">
              📞 {PHONE_NUMBER}
            </a>
          </div>

          <div className="footer-col">
            <h4>{t.footer.sections}</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.phone}</h4>
            <ul>
              <li><a href={PHONE_LINK}>{PHONE_NUMBER}</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t.footer.language}</h4>
            <ul className="footer-langs">
              {Object.values(LANGUAGES).map((l) => (
                <li key={l.code}>
                  <button
                    className={`footer-lang-btn ${lang === l.code ? 'active' : ''}`}
                    onClick={() => changeLang(l.code)}
                  >
                    {l.flag} {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
