'use client';
import { useEffect, useState } from "react";

export default function CsTimer() {
  // Target date
  const targetDate = new Date("2026-12-24T05:06:59");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  },);
  return (
    <ul className="countdown coming-soon-countdown">
        <li>
            <div className="box">
                <span className="days">{timeLeft.days}</span>
                <span className="timeRef">days</span>
            </div>
        </li>
        <li>
            <div className="box">
                <span className="hours">{timeLeft.hours}</span>
                <span className="timeRef clr-1">hrs</span>
            </div>
        </li>
        <li>
            <div className="box">
                <span className="minutes">{timeLeft.minutes}</span>
                <span className="timeRef clr-2">mins</span>
            </div>
        </li>
        <li>
            <div className="box">
                <span className="seconds">{timeLeft.seconds}</span>
                <span className="timeRef clr-3">secs</span>
            </div>
        </li>
    </ul>
  );
}
