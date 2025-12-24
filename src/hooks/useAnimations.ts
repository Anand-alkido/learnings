import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    if (!window.matchMedia('(hover: hover)').matches) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;
      follower.style.left = `${posX}px`;
      follower.style.top = `${posY}px`;
      requestAnimationFrame(animateFollower);
    };

    const handleLinkHover = () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
    };
    
    const handleLinkLeave = () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
    };

    document.addEventListener('mousemove', moveCursor);
    const animId = requestAnimationFrame(animateFollower);

    // Attach hover effects to interactive elements
    const links = document.querySelectorAll('a, button, .clickable');
    links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animId);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []); // Run once on mount

  return { cursorRef, followerRef };
};

export const useScrollProgress = () => {
    const barRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleScroll = () => {
            if(!barRef.current) return;
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            barRef.current.style.width = `${progress}%`;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return barRef;
};
