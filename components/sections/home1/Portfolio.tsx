'use client'

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

    // Navigation
    navigation: {
        nextEl: '.swiper-prev',
        prevEl: '.swiper-next',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

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
            slidesPerView: 1,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 1,
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
        { src: "/assets/images/project/portfolio-2-1.jpg" },
        { src: "/assets/images/project/portfolio-2-2.jpg" },
        { src: "/assets/images/project/portfolio-2-3.jpg" },
        { src: "/assets/images/project/portfolio-2-4.jpg" },
    ];

  return (
    <>
        <section className="portfolio-two" id="portfolio">
            <div className="portfolio-two__shape-1 float-bob-y">
                <Image src="/assets/images/shapes/portfolio-two-shape-1.png" alt="Image" width={783} height={1104} priority />
            </div>
            <div className="portfolio-two__shape-2"></div>
            <div className="portfolio-two__shape-3"></div>
            <div className="portfolio-two__shape-4"></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-1"></div>
                        <span className="section-title__tagline">Portfolio</span>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <AnimatedTitle>
                    <h2 className="section-title__title title-animation">Explore Our Creative <span>Journey</span><br />
                        <span> Crafting Success Through</span>
                    </h2>
                    </AnimatedTitle>
                </div>
                <div className="portfolio-two__carousel-container">
                    <Swiper {...swiperOptions} className="portfolio-two__carousel">
                        <SwiperSlide>
                            <div className="item">
                                <div className="portfolio-two__single-box">
                                    <ul className="portfolio-two__box list-unstyled">
                                        <li className={`${activeIndex === 12 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(12)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-1.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Innovative Solutions,<br /> Powerful
                                                            Results</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(0); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Innovative Solutions,<br />
                                                                Powerful
                                                                Results</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 13 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(13)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-2.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Transforming Ideas Into<br /> Digital
                                                            Excellence</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(1); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Transforming Ideas Into
                                                                Digital Excellence</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 14 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(14)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-3.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Driving Success Through<br />
                                                            Technology</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(2); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Driving Success Through
                                                                Technology</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 15 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(15)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-4.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Empowering Businesses<br /> with
                                                            Cutting-Edge IT</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(3); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Empowering Businesses with
                                                                Cutting-Edge IT</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="portfolio-two__single-box">
                                    <ul className="portfolio-two__box list-unstyled">
                                        <li className={`${activeIndex === 12 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(12)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-1.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Innovative Solutions,<br /> Powerful
                                                            Results</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(4); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Innovative Solutions,<br />
                                                                Powerful
                                                                Results</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 13 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(13)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-2.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Transforming Ideas Into<br /> Digital
                                                            Excellence</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(5); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Transforming Ideas Into
                                                                Digital Excellence</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 14 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(14)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-3.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Driving Success Through<br />
                                                            Technology</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(6); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Driving Success Through
                                                                Technology</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 15 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(15)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-4.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Empowering Businesses<br /> with
                                                            Cutting-Edge IT</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(7); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Empowering Businesses with
                                                                Cutting-Edge IT</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="portfolio-two__single-box">
                                    <ul className="portfolio-two__box list-unstyled">
                                        <li className={`${activeIndex === 12 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(12)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-1.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Innovative Solutions,<br /> Powerful
                                                            Results</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(8); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Innovative Solutions,<br />
                                                                Powerful
                                                                Results</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 13 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(13)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-2.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Transforming Ideas Into<br /> Digital
                                                            Excellence</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(9); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Transforming Ideas Into
                                                                Digital Excellence</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 14 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(14)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-3.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Driving Success Through<br />
                                                            Technology</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(10); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Driving Success Through
                                                                Technology</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className={`${activeIndex === 15 ? "active" : ""}`} onMouseEnter={() => setActiveIndex(15)}>
                                            <div className="portfolio-two__box-content">
                                                <div className="single-portfolio-two__bg"
                                                    style={{ backgroundImage: "url(assets/images/project/portfolio-2-4.jpg)" }}>
                                                </div>
                                                <div className="portfolio-two__title">
                                                    <h3><Link href="/portfolio-detailsl">Empowering Businesses<br /> with
                                                            Cutting-Edge IT</Link></h3>
                                                </div>
                                                <div className="portfolio-two__content-box">
                                                    <div onClick={() => { setIndex(11); setOpen(true); }} className="portfolio-two__icon">
                                                        <Link href="#"
                                                            className="img-popup"><span className="icon-right-arrow-1"></span></Link>
                                                    </div>
                                                    <div className="portfolio-two__title-box">
                                                        <h3 className="portfolio-two__title-2"><Link
                                                                href="/portfolio-detailsl">Empowering Businesses with
                                                                Cutting-Edge IT</Link></h3>
                                                        <p className="portfolio-two__text">Explore How We&apos;ve Empowered
                                                            Businesses with Innovative Tech Solutions</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </SwiperSlide>
                        <div className="swiper-pagination"></div>

                        <div className="swiper-nav">
                            <div className="swiper-prev"><span className="icon-right-up"></span></div>
                            <div className="swiper-next"><span className="icon-right-up"></span></div>
                        </div>
                    </Swiper>
                </div>
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