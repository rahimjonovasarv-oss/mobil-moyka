import { useApp } from '../context/AppContext';
import { PHONE_LINK } from '../services/translations';

export default function CTA({ onOrderClick }) {
  const { t } = useApp();

  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner reveal">
          <div className="cta-bg" />
          <div className="cta-content">
            <h2 className="cta-title">{t.cta.title}</h2>
            <p className="cta-subtitle">{t.cta.subtitle}</p>
            <div className="cta-buttons">
              <button className="btn btn-lg cta-order-btn" onClick={onOrderClick}>
                {t.cta.orderBtn}
              </button>
              <a href={PHONE_LINK} className="btn btn-lg cta-call-btn">
                {t.cta.callBtn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
