import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getSectionById } from "../data/learnings";

export const SectionPage = () => {
  const { sectionId } = useParams();
  const section = getSectionById(sectionId || "");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  if (!section) return <Navigate to="/" />;

  const filteredLearnings = section.learnings.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{section.title}</span>
          </div>
          <div className="page-hero-icon">{section.icon}</div>
          <h1 className="page-hero-title">{section.title}</h1>
          <p className="page-hero-subtitle">{section.description}</p>
        </div>
      </section>

      <main className="section-content">
        <div className="container">
          <div className="filter-bar">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search learnings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="view-toggle">
              <button
                className={`view-btn ${view === "grid" ? "active" : ""}`}
                onClick={() => setView("grid")}
              >
                <i className="fas fa-th-large"></i>
              </button>
              <button
                className={`view-btn ${view === "list" ? "active" : ""}`}
                onClick={() => setView("list")}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div
            className={`learnings-grid ${view === "list" ? "list-view" : ""}`}
          >
            {filteredLearnings.map((learning, index) => (
              <Link
                key={learning.id}
                to={`/section/${section.id}/learning/${learning.id}`}
                className="learning-card visible"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="learning-card-header">
                  <div className="learning-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span
                    className={`learning-card-difficulty difficulty-${learning.difficulty}`}
                  >
                    {learning.difficulty}
                  </span>
                </div>
                <h3 className="learning-card-title">{learning.title}</h3>
                <div className="learning-card-tags">
                  {learning.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="learning-card-footer">
                  <div className="learning-card-lang">
                    <i className="fas fa-code"></i>
                    <span>{learning.language.toUpperCase()}</span>
                  </div>
                  <div className="learning-card-link">
                    <span>View Solution</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredLearnings.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>No learnings found</h3>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
