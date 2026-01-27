"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import VideoModal from "@/components/elements/VideoPopup";

// Countdown helper function
const useCountdown = (targetDate: Date) => {
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
  }, [targetDate]);

  return timeLeft;
};

export default function Event() {
  // Define different event target dates
  const countdown1 = useCountdown(new Date("2026-03-18T00:00:00"));
  const countdown2 = useCountdown(new Date("2027-03-25T00:00:00"));
  const countdown3 = useCountdown(new Date("2028-03-30T00:00:00"));

  return (
    <>
      <section className="event-one">
        <div className="event-one__shape-1 float-bob-y">
          <Image
            src="/assets/images/shapes/event-one-shape-1.png"
            alt="Image"
            width={519}
            height={587}
            priority
          />
        </div>
        <div className="event-one__shape-2 float-bob-x">
          <Image
            src="/assets/images/shapes/event-one-shape-2.png"
            alt="Image"
            width={638}
            height={656}
            priority
          />
        </div>
        <div className="container">
          <div className="event-one__top">
            <div className="section-title text-left sec-title-animation animation-style2">
              <div className="section-title__tagline-box">
                <div className="section-title__tagline-shape-1"></div>
                <span className="section-title__tagline">Upcoming Events</span>
                <div className="section-title__tagline-shape-2"></div>
              </div>
              <AnimatedTitle>
                <h2 className="section-title__title title-animation">
                  Exciting Events <span>on the</span> <span>Horizon</span>
                </h2>
              </AnimatedTitle>
            </div>
            <div className="event-one__top-btn-box">
              <Link href="/contact" className="thm-btn">
                Contact Us<span className="icon-right-arrow"></span>
              </Link>
            </div>
          </div>

          <div className="event-one__bottom">
            <div className="row">
              <div className="col-xl-5">
                <div
                  className="event-one__left wow slideInLeft"
                  data-wow-delay="100ms"
                  data-wow-duration="2500ms"
                >
                  <div className="event-one__img">
                    <Image
                      src="/assets/images/resources/event-one-img-1.jpg"
                      alt="Image"
                      width={520}
                      height={668}
                      priority
                    />
                    <div className="event-one__video-link">
                      <VideoModal />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-7">
                <div className="event-one__right">
                  {/* ========= Event 1 ========= */}
                  <EventCard
                    title="Innovation Meets"
                    description="It is a long established fact that a reader will"
                    address="1629 N. Dixie Avenue"
                    date="March 18, 2025"
                    countdown={countdown1}
                  />

                  {/* ========= Event 2 ========= */}
                  <EventCard
                    title="Unlock Your Potential"
                    description="It is a long established fact that a reader will"
                    address="1629 N. Dixie Avenue"
                    date="March 25, 2025"
                    countdown={countdown2}
                  />

                  {/* ========= Event 3 ========= */}
                  <EventCard
                    title="Tech Talks Live"
                    description="It is a long established fact that a reader will"
                    address="1629 N. Dixie Avenue"
                    date="March 30, 2025"
                    countdown={countdown3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ✅ Reusable Event Card Component
function EventCard({
  title,
  description,
  address,
  date,
  countdown,
}: {
  title: string;
  description: string;
  address: string;
  date: string;
  countdown: { days: string; hours: string; minutes: string; seconds: string };
}) {
  return (
    <div className="event-one__single wow fadeInRight" data-wow-delay="1000ms">
      <div className="event-one__title-and-countdown-box">
        <div className="event-one__title">
          <h5>
            <Link href="/contact">{title}</Link>
          </h5>
          <p>{description}</p>
        </div>
        <div className="event-one__countdown-box">
          <div className="timer-box clearfix">
            <div className="countdown-timer">
              <div className="default-coundown">
                  <div className="default-coundown-box">
                      <ul className="countdown event-one-countdown">
                        <li>
                          <div className="box">
                            <span className="days">{countdown.days}</span>
                            <br />
                            <span className="timeRef">days</span>
                          </div>
                        </li>
                        <li>
                          <div className="box">
                            <span className="hours">{countdown.hours}</span>
                            <br />
                            <span className="timeRef clr-1">hrs</span>
                          </div>
                        </li>
                        <li>
                          <div className="box">
                            <span className="minutes">{countdown.minutes}</span>
                            <br />
                            <span className="timeRef clr-2">mins</span>
                          </div>
                        </li>
                        <li>
                          <div className="box">
                            <span className="seconds">{countdown.seconds}</span>
                            <br />
                            <span className="timeRef clr-3">secs</span>
                          </div>
                        </li>
                      </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-one__meta-and-btn-box">
        <ul className="event-one__meta list-unstyled">
          <li>
            <Link href="#">
              <span className="icon-pin"></span>
              {address}
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className="icon-calendar"></span>
              {date}
            </Link>
          </li>
        </ul>
        <div className="event-one__btn-box">
          <Link href="/contact" className="event-one__btn">
            Book Seat<span className="icon-right-arrow"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
