"use client";

import { useEffect, useRef, useState } from "react";

export default function PriceFilter() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);
  const MAX = 5000;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // create main range track
    const rangeTrack = document.createElement("div");
    rangeTrack.className = "ui-slider-range";

    // create two handles
    const handleMin = document.createElement("span");
    const handleMax = document.createElement("span");
    handleMin.className = "ui-slider-handle";
    handleMax.className = "ui-slider-handle";

    slider.innerHTML = ""; // clear previous
    slider.classList.add("ui-widget-content", "ui-slider");
    slider.append(rangeTrack, handleMin, handleMax);

    const updateHandles = () => {
      const minPercent = (min / MAX) * 100;
      const maxPercent = (max / MAX) * 100;

      handleMin.style.left = `${minPercent}%`;
      handleMax.style.left = `${maxPercent}%`;
      rangeTrack.style.left = `${minPercent}%`;
      rangeTrack.style.width = `${maxPercent - minPercent}%`;
    };

    updateHandles();

    // drag logic for handles
    const startDrag = (e: MouseEvent, target: "min" | "max") => {
      e.preventDefault();
      const sliderRect = slider.getBoundingClientRect();

      const onMove = (ev: MouseEvent) => {
        const pos = Math.min(
          Math.max(0, ev.clientX - sliderRect.left),
          sliderRect.width
        );
        const value = Math.round((pos / sliderRect.width) * MAX);

        if (target === "min") {
          if (value < max) setMin(value);
        } else {
          if (value > min) setMax(value);
        }
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };

    handleMin.addEventListener("mousedown", (e) => startDrag(e, "min"));
    handleMax.addEventListener("mousedown", (e) => startDrag(e, "max"));

    return () => {
      handleMin.remove();
      handleMax.remove();
      rangeTrack.remove();
    };
  }, [min, max]);

  return (
    <div className="product__price-ranger price-ranger">
      <div id="slider-range" ref={sliderRef}></div>
      <div className="ranger-min-max-block">
        <input type="text" readOnly className="min" value={min} />
        <span>-</span>
        <input type="text" readOnly className="max" value={max} />
        <input
          type="submit"
          value="Filter"
          onClick={() => alert(`Filter: $${min} - $${max}`)}
        />
      </div>
    </div>
  );
}
