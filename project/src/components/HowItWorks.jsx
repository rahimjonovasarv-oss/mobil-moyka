import { useApp } from '../context/AppContext';

export default function HowItWorks() {
  const { t } = useApp();

  return (
    <section id="how" className="section how-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">{t.howItWorks.title}</span>
          <h2 className="section-title">{t.howItWorks.title}</h2>
          <p className="section-subtitle">{t.howItWorks.subtitle}</p>
        </div>

        <div className="steps-container">
          <div className="steps-line" />
          <div className="grid grid-4 steps-grid">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="step-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
