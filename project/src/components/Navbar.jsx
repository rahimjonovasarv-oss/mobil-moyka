import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../services/translations';
import { PHONE_LINK } from '../services/translations';

export default function Navbar({ onOrderClick }) {
  const { t, lang, changeLang, theme, toggleTheme } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'how', label: t.nav.howItWorks },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
          <span className="nav-logo-icon">💧</span>
          <span className="nav-logo-text">Mobil Moyka</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="lang-switcher" ref={langRef}>
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)} aria-label="Language">
              <span>{LANGUAGES[lang].flag}</span>
              <span className="lang-code">{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown animate-slide-down">
                {Object.values(LANGUAGES).map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option ${lang === l.code ? 'active' : ''}`}
                    onClick={() => { changeLang(l.code); setLangOpen(false); }}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="btn btn-primary btn-sm nav-order-btn" onClick={onOrderClick}>
            {t.nav.order}
          </button>

          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu animate-slide-down">
          <div className="container">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
                {link.label}
              </a>
            ))}
            <a href={PHONE_LINK} className="mobile-call">{t.hero.callBtn}</a>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={() => { onOrderClick(); setMobileOpen(false); }}>
              {t.nav.order}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
