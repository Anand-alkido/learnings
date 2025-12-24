import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">Learning Journey</span>
        </Link>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas ${theme === "dark" ? "fa-moon" : "fa-sun"}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};
