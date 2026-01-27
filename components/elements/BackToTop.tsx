"use client";

import { useEffect, useState } from "react";

type BackToTopProps = {
  scroll: boolean;
};

export default function BackToTop({ scroll }: BackToTopProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      

      {/* Scroll To Top Button */}
      {scroll && scrollProgress > 10 && (
        <a
          href="#top"
          data-target="html"
          className="scroll-to-target scroll-to-top scroll-top scroll-to-target"
          onClick={handleClick}
        >
          <span className="scroll-to-top__wrapper">
            <span
              className="scroll-to-top__inner"
              style={{ width: `${scrollProgress}%` }}
            ></span>
          </span>
          <span className="scroll-to-top__text">Go Back Top</span>
        </a>
      )}
    </>
  );
}
