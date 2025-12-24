import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  getLearningById,
  getAdjacentLearnings,
  getSectionById,
} from "../data/learnings";
import { marked } from "marked";
import katex from "katex";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

export const LearningPage = () => {
  const { sectionId, learningId } = useParams();
  const learning = getLearningById(sectionId || "", learningId || "");
  const section = getSectionById(sectionId || "");
  const { prev, next } = getAdjacentLearnings(
    sectionId || "",
    learningId || ""
  );
  const commentaryRef = useRef<HTMLDivElement>(null);

  if (!learning || !section) return <Navigate to={`/section/${sectionId}`} />;

  // Copy code handler
  const copyCode = () => {
    navigator.clipboard.writeText(learning.code);
    alert("Copied!"); // You can replace this with your Toast logic
  };

  // Render Markdown + Math + Highlight
  useEffect(() => {
    if (commentaryRef.current) {
      // 1. Configure marked
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      // 2. Parse Markdown to HTML
      let rawHtml = marked.parse(learning.commentary) as string;

      // 3. Render Math (KaTeX)
      // Display Mode $$...$$
      rawHtml = rawHtml.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) =>
        katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        })
      );
      // Inline Mode $...$
      rawHtml = rawHtml.replace(/\$([^\$\n]+?)\$/g, (_, math) =>
        katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        })
      );

      // 4. Sanitize
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      commentaryRef.current.innerHTML = cleanHtml;

      // 5. Highlight Code blocks inside markdown
      commentaryRef.current.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }

    // Highlight the main code block
    document.querySelectorAll(".code-block code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [learning]);

  return (
    <div className="learning-page">
      <div className="learning-article">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to={`/section/${section.id}`}>{section.title}</Link>
          <i className="fas fa-chevron-right"></i>
          <span>{learning.title}</span>
        </div>

        <div className="article-header">
          <div className="article-meta">
            <span
              className={`difficulty-badge difficulty-${learning.difficulty}`}
            >
              {learning.difficulty}
            </span>
            <span className="language-badge">{learning.language}</span>
          </div>
          <h1 className="article-title">{learning.title}</h1>
          <div className="article-tags">
            {learning.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={learning.url}
            target="_blank"
            rel="noreferrer"
            className="problem-link mt-2"
          >
            <i className="fas fa-external-link-alt"></i> View Problem
          </a>
        </div>

        {/* Code Section */}
        <div className="content-section">
          <h3 className="content-section-title">
            <i className="fas fa-code"></i> Solution
          </h3>
          <div className="code-container">
            <div className="code-header">
              <div className="code-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="code-lang">{learning.language}</span>
              <button className="copy-btn" onClick={copyCode}>
                <i className="fas fa-copy"></i> Copy
              </button>
            </div>
            <div className="code-block">
              <pre>
                <code className={`language-${learning.language}`}>
                  {learning.code}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Commentary Section */}
        <div className="content-section">
          <h3 className="content-section-title">
            <i className="fas fa-lightbulb"></i> Explanation
          </h3>
          <div className="commentary-content" ref={commentaryRef}></div>
        </div>

        {/* Navigation */}
        <div className="article-footer">
          <div className="nav-buttons">
            {prev ? (
              <Link
                to={`/section/${section.id}/learning/${prev.id}`}
                className="nav-btn prev-btn"
              >
                <i className="fas fa-arrow-left"></i>
                <div className="nav-btn-content">
                  <span className="nav-btn-label">Previous</span>
                  <span className="nav-btn-title">{prev.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                to={`/section/${section.id}/learning/${next.id}`}
                className="nav-btn next-btn"
              >
                <div className="nav-btn-content">
                  <span className="nav-btn-label">Next</span>
                  <span className="nav-btn-title">{next.title}</span>
                </div>
                <i className="fas fa-arrow-right"></i>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
