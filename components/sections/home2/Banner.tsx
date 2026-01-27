'use client'
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link";
import Image from "next/image";
import "swiper/css/effect-fade";
import VideoModal from "@/components/elements/VideoPopup";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation, EffectFade],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    effect: "fade", // 👈 enables fade transition
    fadeEffect: {
        crossFade: true, // smooth fade between slides
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

export default function Banner() {
  return (
    <>
        <section className="main-slider">
            <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="main-slider__shape-1 img-bounce">
                            <Image src="/assets/images/shapes/main-slider-shape-1.png" alt="shape" width={603} height={783} priority />
                        </div>
                        <div className="main-slider__shape-2"></div>
                        <div className="main-slider__shape-3">
                            <Image src="/assets/images/shapes/main-slider-shape-3.png" alt="shape" width={947} height={784} priority />
                        </div>
                        <div className="main-slider__shape-4">
                            <Image src="/assets/images/shapes/main-slider-shape-4.png" alt="shape" width={892} height={859} priority />
                        </div>
                        <div className="main-slider__shape-5">
                            <Image src="/assets/images/shapes/main-slider-shape-5.png" alt="shape" width={658} height={846} priority />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider__content">
                                        <div className="main-slider__sub-title-box">
                                            <div className="main-slider__sub-title-icon">
                                                <Image src="/assets/images/icon/main-slider-sub-title-icon.png" alt="icom" width={16} height={16} priority />
                                            </div>
                                            <p className="main-slider__sub-title">IT Solutions That Work for You</p>
                                        </div>
                                        <h2 className="main-slider__title">Expert <span>IT Solutions</span> <br /> <span>to
                                                Elevate</span> Your <br /> Enterprise
                                        </h2>
                                        <p className="main-slider__text">From strategic IT consulting to seamless <br />
                                            implementation, we deliver tailored solutions <br /> that drive efficiency</p>
                                        <div className="main-slider__btn-and-trustpilot-box">
                                            <div className="main-slider__btn-box">
                                                <Link href="/contact" className="thm-btn">Get Started<span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="main-slider__trustpilot-box">
                                                <ul className="list-unstyled main-slider__trustpilot-img-list">
                                                    <li>
                                                        <div className="main-slider__trustpilot-img">
                                                            <Image src="/assets/images/resources/main-slider-trustpilot-img-1.jpg" alt="image" width={45} height={44} priority />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="main-slider__trustpilot-img">
                                                            <Image src="/assets/images/resources/main-slider-trustpilot-img-2.jpg" alt="image" width={45} height={44} priority />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="main-slider__trustpilot-content-box">
                                                    <div className="main-slider__trustpilot-logo">
                                                        <Image src="/assets/images/resources/main-slider-trustpilot-logo.png" alt="image" width={195} height={26} priority />
                                                    </div>
                                                    <div className="main-slider__trustpilot-rating-review">
                                                        <p className="main-slider__trustpilot-rating">5.0 Excellent</p>
                                                        <p className="main-slider__trustpilot-review">Reviews <span
                                                                className="odometer" data-count="4170"></span> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-slider__img">
                                            <Image src="/assets/images/resources/main-slider-img-1.png" alt="image" width={520} height={610} priority />
                                        </div>
                                        <div className="main-slider__video-link">
                                            <VideoModal/>
                                        </div>
                                        <div className="main-slider__shield-check-icon">
                                            <Image src="/assets/images/icon/main-slider-shield-check-icon.png" alt="icon" width={28} height={32} priority />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="main-slider__shape-1 img-bounce">
                            <Image src="/assets/images/shapes/main-slider-shape-1.png" alt="shape" width={603} height={783} priority />
                        </div>
                        <div className="main-slider__shape-2"></div>
                        <div className="main-slider__shape-3">
                            <Image src="/assets/images/shapes/main-slider-shape-3.png" alt="shape" width={947} height={784} priority />
                        </div>
                        <div className="main-slider__shape-4">
                            <Image src="/assets/images/shapes/main-slider-shape-4.png" alt="shape" width={892} height={859} priority />
                        </div>
                        <div className="main-slider__shape-5">
                            <Image src="/assets/images/shapes/main-slider-shape-5.png" alt="shape" width={658} height={846} priority />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider__content">
                                        <div className="main-slider__sub-title-box">
                                            <div className="main-slider__sub-title-icon">
                                                <Image src="/assets/images/icon/main-slider-sub-title-icon.png" alt="icon" width={16} height={16} priority />
                                            </div>
                                            <p className="main-slider__sub-title">IT Solutions That Work for You</p>
                                        </div>
                                        <h2 className="main-slider__title">Expert <span>IT Solutions</span> <br /> <span>to
                                                Elevate</span> Your <br /> Enterprise
                                        </h2>
                                        <p className="main-slider__text">From strategic IT consulting to seamless <br />
                                            implementation, we deliver tailored solutions <br /> that drive efficiency</p>
                                        <div className="main-slider__btn-and-trustpilot-box">
                                            <div className="main-slider__btn-box">
                                                <Link href="/contact" className="thm-btn">Get Started<span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="main-slider__trustpilot-box">
                                                <ul className="list-unstyled main-slider__trustpilot-img-list">
                                                    <li>
                                                        <div className="main-slider__trustpilot-img">
                                                            <Image src="/assets/images/resources/main-slider-trustpilot-img-1.jpg" alt="image" width={45} height={44} priority />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="main-slider__trustpilot-img">
                                                            <Image src="/assets/images/resources/main-slider-trustpilot-img-2.jpg" alt="image" width={45} height={44} priority />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="main-slider__trustpilot-content-box">
                                                    <div className="main-slider__trustpilot-logo">
                                                        <Image src="/assets/images/resources/main-slider-trustpilot-logo.png" alt="image" width={195} height={26} priority />
                                                    </div>
                                                    <div className="main-slider__trustpilot-rating-review">
                                                        <p className="main-slider__trustpilot-rating">5.0 Excellent</p>
                                                        <p className="main-slider__trustpilot-review">Reviews <span
                                                                className="odometer" data-count="4170"></span> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-slider__img">
                                            <Image src="/assets/images/resources/main-slider-img-2.png" alt="image" width={520} height={610} priority />
                                        </div>
                                        <div className="main-slider__video-link">
                                            <VideoModal/>
                                        </div>
                                        <div className="main-slider__shield-check-icon">
                                            <Image src="/assets/images/icon/main-slider-shield-check-icon.png" alt="icon" width={28} height={32} priority />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="main-slider__shape-1 img-bounce">
                            <Image src="/assets/images/shapes/main-slider-shape-1.png" alt="shape" width={603} height={783} priority />
                        </div>
                        <div className="main-slider__shape-2"></div>
                        <div className="main-slider__shape-3">
                            <Image src="/assets/images/shapes/main-slider-shape-3.png" alt="shape" width={947} height={784} priority />
                        </div>
                        <div className="main-slider__shape-4">
                            <Image src="/assets/images/shapes/main-slider-shape-4.png" alt="shape" width={892} height={859} priority />
                        </div>
                        <div className="main-slider__shape-5">
                            <Image src="/assets/images/shapes/main-slider-shape-5.png" alt="shape" width={658} height={846} priority />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="main-slider__content">
                                        <div className="main-slider__sub-title-box">
                                            <div className="main-slider__sub-title-icon">
                                                <Image src="/assets/images/icon/main-slider-sub-title-icon.png" alt="icon" width={16} height={16} priority />
                                            </div>
                                            <p className="main-slider__sub-title">IT Solutions That Work for You</p>
                                        </div>
                                        <h2 className="main-slider__title">Expert <span>IT Solutions</span> <br /> <span>to
                                                Elevate</span> Your <br /> Enterprise
                                        </h2>
                                        <p className="main-slider__text">From strategic IT consulting to seamless <br />
                                            implementation, we deliver tailored solutions <br /> that drive efficiency</p>
                                        <div className="main-slider__btn-and-trustpilot-box">
                                            <div className="main-slider__btn-box">
                                                <Link href="/contact" className="thm-btn">Get Started<span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="main-slider__trustpilot-box">
                                                <ul className="list-unstyled main-slider__trustpilot-img-list">
                                                    <li>
                                                        <div className="main-slider__trustpilot-img">
                                                            <Image src="/assets/images/resources/main-slider-trustpilot-img-1.jpg" alt="image" width={45} height={44} priority />
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="main-slider__trustpilot-img">
                                                            <Image src="/assets/images/resources/main-slider-trustpilot-img-2.jpg" alt="image" width={45} height={44} priority />
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div className="main-slider__trustpilot-content-box">
                                                    <div className="main-slider__trustpilot-logo">
                                                        <Image src="/assets/images/resources/main-slider-trustpilot-logo.png" alt="image" width={195} height={26} priority />
                                                    </div>
                                                    <div className="main-slider__trustpilot-rating-review">
                                                        <p className="main-slider__trustpilot-rating">5.0 Excellent</p>
                                                        <p className="main-slider__trustpilot-review">Reviews <span
                                                                className="odometer" data-count="4170"></span> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-slider__img">
                                            <Image src="/assets/images/resources/main-slider-img-1.png" alt="image" width={520} height={610} priority />
                                        </div>
                                        <div className="main-slider__video-link">
                                            <VideoModal/>
                                        </div>
                                        <div className="main-slider__shield-check-icon">
                                            <Image src="/assets/images/icon/main-slider-shield-check-icon.png" alt="icon" width={28} height={32} priority />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <div className="swiper-pagination" id="main-slider-pagination"></div>
            </Swiper>

        </section>
    </>
  )
}
