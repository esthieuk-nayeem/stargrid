"use client";
import { useMemo } from "react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    }
}

export default function Portfolio() {

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const [activeIndex, setActiveIndex] = useState(12)

    // Collect all lightbox images in one array
    const slides = [
        { src: "/assets/images/project/portfolio-1-1.jpg" },
        { src: "/assets/images/project/portfolio-1-2.jpg" },
        { src: "/assets/images/project/portfolio-1-3.jpg" },
        { src: "/assets/images/project/portfolio-1-4.jpg" },
        { src: "/assets/images/project/portfolio-1-5.jpg" },
        { src: "/assets/images/project/portfolio-1-6.jpg" },
    ];


    const circleText = "&nbsp;View All Project View All Project";
    
      // Create React-friendly rotated letters
      const rotatedChars = useMemo(() => {
        const cleanText = circleText.replace(/&nbsp;/g, " ");
        const chars = cleanText.split("");
        const radius = 73.6;
        const total = chars.length;
        const deg = 360 / total;
    
        return chars.map((char, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: "0%",
              top: "0%",
              transformOrigin: `0 ${radius}px`,
              transform: `rotate(${i * deg}deg)`,
            }}
          >
            {char}
          </span>
        ));
    }, [circleText]);

  return (
    <>
        <section className="portfolio-one" id="portfolio">
            <h2 className="portfolio-one__big-text">portfolio</h2>
            <div className="portfolio-one__shape-1">
                <Image src="/assets/images/shapes/portfolio-one-shape-1.png" alt="Image" width={923} height={1948} priority />
            </div>
            <div className="portfolio-one__shape-2">
                <Image src="/assets/images/shapes/portfolio-one-shape-2.png" alt="Image" width={1358} height={1948} priority />
            </div>
            <div className="container">
                <div className="portfolio-one__top">
                    <div className="section-title text-left sec-title-animation animation-style2">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-1"></div>
                            <span className="section-title__tagline">See Our Works</span>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <AnimatedTitle>
                        <h2 className="section-title__title title-animation">How We&apos;ve
                            <span>Empowered</span><br /><span>Businesses with Innovative</span><br />Tech Solutions</h2>
                        </AnimatedTitle>
                    </div>
                    <Link href="/portfolio" className="portfolio-one__round-text-box">
                        <div className="portfolio-one__round-text-box-outer">
                            <div className="portfolio-one__round-text-box-inner">
                                <div className="portfolio-one__curved-circle">
                                    {rotatedChars}
                                </div>
                                <div className="portfolio-one__round-icon">
                                    <Image src="/assets/images/icon/portfolio-one-round-icon.png" alt="Image" width={40} height={40} priority />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="portfolio-one__bottom">
                <Swiper {...swiperOptions} className="portfolio-one__carousel">
                    <SwiperSlide>
                        <div className="item">
                            <div className="portfolio-one__single">
                                <div className="portfolio-one__img-box">
                                    <div className="portfolio-one__img">
                                        <Image src="/assets/images/project/portfolio-1-1.jpg" alt="Image" width={460} height={350} priority />
                                        <div className="portfolio-one__tag">
                                            <span>Web Development</span>
                                            <span>Branding</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-one__content">
                                    <div className="portfolio-one__title-box">
                                        <h3 className="portfolio-one__title"><Link href="/portfolio-details">Innovative Digital
                                                Solutions for a Smarter Future</Link></h3>
                                        <p className="portfolio-one__text">Pioneering next-gen IT solutions that enhance
                                            efficiency and innovation.</p>
                                    </div>
                                    <div onClick={() => { setIndex(0); setOpen(true); }} className="portfolio-one__arrow">
                                        <Link href="#"
                                            className="img-popup"><span className="icon-right-arrow"></span></Link>
                                    </div>
                                    <div className="portfolio-one__year">
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="portfolio-one__single">
                                <div className="portfolio-one__img-box">
                                    <div className="portfolio-one__img">
                                        <Image src="/assets/images/project/portfolio-1-2.jpg" alt="Image" width={460} height={350} priority />
                                        <div className="portfolio-one__tag">
                                            <span>UI/UX Design</span>
                                            <span>Product Design</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-one__content">
                                    <div className="portfolio-one__title-box">
                                        <h3 className="portfolio-one__title"><Link href="/portfolio-details">Empowering
                                                Businesses with Cutting-Edge Technology</Link></h3>
                                        <p className="portfolio-one__text">Delivering smart, scalable, and future-proof tech
                                            solutions for growth.</p>
                                    </div>
                                    <div onClick={() => { setIndex(1); setOpen(true); }} className="portfolio-one__arrow">
                                        <Link href="#"
                                            className="img-popup"><span className="icon-right-arrow"></span></Link>
                                    </div>
                                    <div className="portfolio-one__year">
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="portfolio-one__single">
                                <div className="portfolio-one__img-box">
                                    <div className="portfolio-one__img">
                                        <Image src="/assets/images/project/portfolio-1-3.jpg" alt="Image" width={460} height={350} priority />
                                        <div className="portfolio-one__tag">
                                            <span>UI/UX Design</span>
                                            <span>Cyber Security</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-one__content">
                                    <div className="portfolio-one__title-box">
                                        <h3 className="portfolio-one__title"><Link href="/portfolio-details">Transforming Ideas
                                                into Scalable IT Solutions</Link></h3>
                                        <p className="portfolio-one__text">Turning complex challenges into streamlined,
                                            high-performance systems.</p>
                                    </div>
                                    <div onClick={() => { setIndex(2); setOpen(true); }} className="portfolio-one__arrow">
                                        <Link href="#"
                                            className="img-popup"><span className="icon-right-arrow"></span></Link>
                                    </div>
                                    <div className="portfolio-one__year">
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="portfolio-one__single">
                                <div className="portfolio-one__img-box">
                                    <div className="portfolio-one__img">
                                        <Image src="/assets/images/project/portfolio-1-4.jpg" alt="Image" width={460} height={350} priority />
                                        <div className="portfolio-one__tag">
                                            <span>Branding</span>
                                            <span>Product Design</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-one__content">
                                    <div className="portfolio-one__title-box">
                                        <h3 className="portfolio-one__title"><Link href="/portfolio-details">Driving Digital
                                                Excellence with Custom IT Services</Link></h3>
                                        <p className="portfolio-one__text">Tailor-made IT solutions designed to optimize and
                                            elevate your business.</p>
                                    </div>
                                    <div onClick={() => { setIndex(3); setOpen(true); }} className="portfolio-one__arrow">
                                        <Link href="#"
                                            className="img-popup"><span className="icon-right-arrow"></span></Link>
                                    </div>
                                    <div className="portfolio-one__year">
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="portfolio-one__single">
                                <div className="portfolio-one__img-box">
                                    <div className="portfolio-one__img">
                                        <Image src="/assets/images/project/portfolio-1-5.jpg" alt="Image" width={460} height={350} priority />
                                        <div className="portfolio-one__tag">
                                            <span>UI/UX Design</span>
                                            <span>Product Design</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-one__content">
                                    <div className="portfolio-one__title-box">
                                        <h3 className="portfolio-one__title"><Link href="/portfolio-details">Seamless Tech
                                                Innovations for Business Growth</Link></h3>
                                        <p className="portfolio-one__text">Bridging the gap between technology and success with
                                            seamless integration.</p>
                                    </div>
                                    <div onClick={() => { setIndex(4); setOpen(true); }} className="portfolio-one__arrow">
                                        <Link href="#"
                                            className="img-popup"><span className="icon-right-arrow"></span></Link>
                                    </div>
                                    <div className="portfolio-one__year">
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="portfolio-one__single">
                                <div className="portfolio-one__img-box">
                                    <div className="portfolio-one__img">
                                        <Image src="/assets/images/project/portfolio-1-6.jpg" alt="Image" width={460} height={350} priority />
                                        <div className="portfolio-one__tag">
                                            <span>UI/UX Design</span>
                                            <span>Product Design</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-one__content">
                                    <div className="portfolio-one__title-box">
                                        <h3 className="portfolio-one__title"><Link href="/portfolio-details">Future-Ready IT
                                                Solutions for Every Industry</Link></h3>
                                        <p className="portfolio-one__text">Adaptive and robust IT services built to thrive in a
                                            dynamic landscape.</p>
                                    </div>
                                    <div onClick={() => { setIndex(5); setOpen(true); }} className="portfolio-one__arrow">
                                        <Link href="#"
                                            className="img-popup"><span className="icon-right-arrow"></span></Link>
                                    </div>
                                    <div className="portfolio-one__year">
                                        <span>2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <Lightbox
            open={open}
            index={index}
            close={() => setOpen(false)}
            slides={slides}
            />
        </section>
    </>
  )
}