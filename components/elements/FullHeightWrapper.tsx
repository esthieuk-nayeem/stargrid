"use client";

import { useEffect, useState } from "react";

export default function FullHeightWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    // Set initial height
    const updateHeight = () => setHeight(window.innerHeight);

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className={`full-height ${className}`}
      style={{ height: height ? `${height}px` : "100vh" }}
    >
      {children}
    </div>
  );
}
