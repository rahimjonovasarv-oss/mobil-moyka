import { useApp } from '../context/AppContext';

export default function ProblemSolution() {
  const { t } = useApp();

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-badge">{t.problem.title}</span>
          <h2 className="section-title">{t.problem.title}</h2>
          <p className="section-subtitle">{t.problem.subtitle}</p>
        </div>

        <div className="grid grid-3">
          {t.problem.items.map((item, i) => (
            <div key={i} className="card problem-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="problem-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="solution-section reveal" style={{ transitionDelay: '0.3s' }}>
          <div className="solution-header">
            <span className="section-badge">{t.problem.solutionTitle}</span>
            <h2 className="section-title">{t.problem.solutionTitle}</h2>
            <p className="section-subtitle">{t.problem.solutionSubtitle}</p>
          </div>

          <div className="grid grid-3">
            {t.problem.advantages.map((adv, i) => (
              <div key={i} className="card solution-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="solution-icon">{adv.icon}</div>
                <h3>{adv.title}</h3>
                <p>{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
