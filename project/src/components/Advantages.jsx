import { useApp } from '../context/AppContext';

export default function Advantages() {
  const { t } = useApp();

  return (
    <section className="section advantages-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">{t.advantages.title}</span>
          <h2 className="section-title">{t.advantages.title}</h2>
          <p className="section-subtitle">{t.advantages.subtitle}</p>
        </div>

        <div className="advantages-grid">
          {t.advantages.items.map((item, i) => (
            <div key={i} className="card advantage-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="advantage-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
