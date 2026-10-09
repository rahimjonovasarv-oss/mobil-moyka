import { useApp } from '../context/AppContext';
import { CAR_PRICES } from '../services/translations';

export default function Pricing({ onOrderClick }) {
  const { t } = useApp();

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">{t.pricing.title}</span>
          <h2 className="section-title">{t.pricing.title}</h2>
          <p className="section-subtitle">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-5 pricing-grid">
          {CAR_PRICES.map((car, i) => {
            const isPopular = car.model === 'Onix';
            return (
              <div
                key={car.model}
                className={`card pricing-card reveal ${isPopular ? 'pricing-popular' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {isPopular && <div className="pricing-badge">{t.pricing.popular}</div>}
                <div className="pricing-car-icon">🚗</div>
                <h3 className="pricing-model">{car.model}</h3>
                <div className="pricing-price">
                  <span className="price-amount">{car.price.toLocaleString('ru-RU')}</span>
                  <span className="price-currency">{t.pricing.currency}</span>
                </div>
                <button
                  className="btn btn-primary btn-sm pricing-order-btn"
                  onClick={() => onOrderClick(car.model)}
                >
                  {t.pricing.orderBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
