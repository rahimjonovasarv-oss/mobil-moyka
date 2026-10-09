import { useApp } from '../context/AppContext';
import { PHONE_LINK, PHONE_NUMBER, CAR_PRICES } from '../services/translations';

export default function Hero({ onOrderClick }) {
  const { t } = useApp();

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="container hero-content">
        <span className="section-badge animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          {t.hero.badge}
        </span>
        <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          {t.hero.title}
        </h1>
        <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          {t.hero.subtitle}
        </p>
        <div className="hero-buttons animate-fade-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <button className="btn btn-primary btn-lg" onClick={onOrderClick}>
            {t.hero.orderBtn}
          </button>
          <a href={PHONE_LINK} className="btn btn-outline btn-lg">
            {t.hero.callBtn}
          </a>
        </div>

        <div className="hero-stats animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <div className="hero-stat">
            <span className="hero-stat-num">500+</span>
            <span className="hero-stat-label">{t.hero.stats.clients}</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">1,200+</span>
            <span className="hero-stat-label">{t.hero.stats.cars}</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">3</span>
            <span className="hero-stat-label">{t.hero.stats.experience}</span>
          </div>
        </div>

        <div className="hero-prices-strip animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          {CAR_PRICES.map((car) => (
            <div key={car.model} className="hero-price-chip">
              <span className="chip-model">{car.model}</span>
              <span className="chip-price">{car.price.toLocaleString('ru-RU')} {t.pricing.currency}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
