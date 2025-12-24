import { Link } from "react-router-dom";
import { learningsData, getTotalLearnings } from "../data/learnings";

export const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span> Currently Learning
          </div>
          <h1 className="hero-title">
            <span className="title-line">My Learning</span>
            <span className="title-line gradient-text">Portfolio</span>
          </h1>
          <p className="hero-subtitle">Documenting my journey through code</p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{getTotalLearnings()}</span>
              <span className="stat-label">Learnings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {learningsData.sections.length}
              </span>
              <span className="stat-label">Categories</span>
            </div>
          </div>

          <a href="#sections" className="cta-button">
            <span>Explore Learnings</span>
            <i className="fas fa-arrow-down"></i>
          </a>
        </div>
      </section>

      <main id="sections">
        <div className="container">
          <div className="section-header-main">
            <h2 className="section-main-title">Learning Categories</h2>
          </div>
          <div className="sections-grid">
            {learningsData.sections.map((section, index) => (
              <Link
                key={section.id}
                to={`/section/${section.id}`}
                className="section-card visible" // Added visible class manually or use IntersectionObserver hook
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="section-card-content">
                  <div className="section-card-icon">{section.icon}</div>
                  <h3 className="section-card-title">{section.title}</h3>
                  <p className="section-card-description">
                    {section.description}
                  </p>
                  <div className="section-card-meta">
                    <div className="section-card-count">
                      <i className="fas fa-book-open"></i>
                      <span>{section.learnings.length} Learnings</span>
                    </div>
                    <div className="section-card-arrow">
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
