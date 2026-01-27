"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";


type AnimatedTitleProps = {
  children: React.ReactNode;
  animationStyle?: "style1" | "style2" | "style3";
  className?: string;
};

export default function AnimatedTitle({
  children,
  animationStyle = "style2",
}: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!titleRef.current) return;

    const quote = titleRef.current;

    // Create split
    const split = new SplitText(quote, { type: "lines,words,chars", linesClass: "split-line" });

    gsap.set(quote, { perspective: 400 });

    switch (animationStyle) {
      case "style1":
        gsap.set(split.chars, { opacity: 0, y: "90%", rotateX: "-40deg" });
        break;
      case "style2":
        gsap.set(split.chars, { opacity: 0, x: 50 });
        break;
      case "style3":
        gsap.set(split.chars, { opacity: 0 });
        break;
    }

    // Animate on scroll
    const animation = gsap.to(split.chars, {
      scrollTrigger: {
        trigger: quote,
        start: "top 90%",
      },
      x: 0,
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.02,
    });

    return () => {
      animation.kill();
      split.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animationStyle]);

  return (
    <div ref={titleRef}>
      {children}
    </div>
  );
}
