import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Particles } from "./Particles";
import { useCustomCursor, useScrollProgress } from "../hooks/useAnimations";
import { useEffect } from "react";

export const Layout = () => {
  const { cursorRef, followerRef } = useCustomCursor();
  const progressRef = useScrollProgress();
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={followerRef}></div>
      <Particles />
      <div className="scroll-progress" ref={progressRef}></div>
      <Header />
      <Outlet /> {/* This renders the current page */}
      <footer>
        <div className="footer-content">
          <p>
            Built with <span className="heart">❤️</span> for learning | © 2025
          </p>
          <div className="footer-links">
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
