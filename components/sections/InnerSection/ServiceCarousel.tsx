'use client'
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
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
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
}

export default function Service_Carousel() {
  return (
    <>
        <section className="services-carousel-page">
            <div className="container">
                <Swiper {...swiperOptions} className="services-carousel-style">
                    <SwiperSlide>
                        <div className="item">
                            <div className="services-three__single">
                                <div className="services-three__icon-and-title">
                                    <div className="services-three__icon">
                                        <span className="icon-technical-support"></span>
                                    </div>
                                    <h3 className="services-three__title"><Link href="/advanced-technology">All Kind Of <br /> IT
                                            Services</Link></h3>
                                </div>
                                <p className="services-three__text">Comprehensive IT management, including network
                                    monitoring, data backup</p>
                                <ul className="list-unstyled services-three__list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Web Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>App Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Graphics Design</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/advanced-technology" className="services-three__btn">Read More <span
                                        className="icon-right-arrow-1"></span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="services-three__single">
                                <div className="services-three__icon-and-title">
                                    <div className="services-three__icon">
                                        <span className="icon-idea"></span>
                                    </div>
                                    <h3 className="services-three__title"><Link href="/data-protection-privacy">Cybersecurity
                                            <br /> Solutions</Link></h3>
                                </div>
                                <p className="services-three__text">Comprehensive IT management, including network
                                    monitoring, data backup</p>
                                <ul className="list-unstyled services-three__list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Web Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>App Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Graphics Design</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/data-protection-privacy" className="services-three__btn">Read More <span
                                        className="icon-right-arrow-1"></span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="services-three__single">
                                <div className="services-three__icon-and-title">
                                    <div className="services-three__icon">
                                        <span className="icon-strategy"></span>
                                    </div>
                                    <h3 className="services-three__title"><Link href="/threat-detection-prevention">Software
                                            Development <br /> &
                                            Integration</Link></h3>
                                </div>
                                <p className="services-three__text">Comprehensive IT management, including network
                                    monitoring, data backup</p>
                                <ul className="list-unstyled services-three__list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Web Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>App Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Graphics Design</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/threat-detection-prevention" className="services-three__btn">Read More <span
                                        className="icon-right-arrow-1"></span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="services-three__single">
                                <div className="services-three__icon-and-title">
                                    <div className="services-three__icon">
                                        <span className="icon-technical-support"></span>
                                    </div>
                                    <h3 className="services-three__title"><Link href="/advanced-technology">All Kind Of <br /> IT
                                            Services</Link></h3>
                                </div>
                                <p className="services-three__text">Comprehensive IT management, including network
                                    monitoring, data backup</p>
                                <ul className="list-unstyled services-three__list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Web Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>App Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Graphics Design</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/advanced-technology" className="services-three__btn">Read More <span
                                        className="icon-right-arrow-1"></span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="services-three__single">
                                <div className="services-three__icon-and-title">
                                    <div className="services-three__icon">
                                        <span className="icon-idea"></span>
                                    </div>
                                    <h3 className="services-three__title"><Link href="/data-protection-privacy">Cybersecurity
                                            <br /> Solutions</Link></h3>
                                </div>
                                <p className="services-three__text">Comprehensive IT management, including network
                                    monitoring, data backup</p>
                                <ul className="list-unstyled services-three__list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Web Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>App Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Graphics Design</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/data-protection-privacy" className="services-three__btn">Read More <span
                                        className="icon-right-arrow-1"></span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="services-three__single">
                                <div className="services-three__icon-and-title">
                                    <div className="services-three__icon">
                                        <span className="icon-strategy"></span>
                                    </div>
                                    <h3 className="services-three__title"><Link href="/threat-detection-prevention">Software
                                            Development <br /> &
                                            Integration</Link></h3>
                                </div>
                                <p className="services-three__text">Comprehensive IT management, including network
                                    monitoring, data backup</p>
                                <ul className="list-unstyled services-three__list">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Web Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>App Development</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <div className="text">
                                            <p>Graphics Design</p>
                                        </div>
                                    </li>
                                </ul>
                                <Link href="/threat-detection-prevention" className="services-three__btn">Read More <span
                                        className="icon-right-arrow-1"></span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <div className="carousel-dot-style">
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>
        </section>
    </>
  )
}
