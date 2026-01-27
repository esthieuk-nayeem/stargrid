'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link";
import Image from "next/image";
import TeamSliderText from "./TeamSliderText";
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

export default function Team() {
  return (
    <>
        <section className="team-one" id="team">
            <div className="team-one__shape-1 float-bob-x">
                <Image src="/assets/images/shapes/team-one-shape-1.png" alt="shape" width={142} height={46} priority />
            </div>
            <div className="team-one__shape-2"></div>
            <div className="team-one__shape-3 float-bob-y">
                <Image src="/assets/images/shapes/team-one-shape-3.png" alt="shape" width={314} height={511} priority />
            </div>
            <div className="team-one__shape-4"></div>
            <div className="team-one__shape-5 img-bounce">
                <Image src="/assets/images/shapes/team-one-shape-5.png" alt="shape" width={661} height={751} priority />
            </div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-1"></div>
                        <span className="section-title__tagline">Our Team Member</span>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <AnimatedTitle>
                    <h2 className="section-title__title title-animation">How We&apos;ve
                        <span>Empowered Businesses</span><br /><span>with Innovative</span> Tech Solutions
                    </h2>
                    </AnimatedTitle>
                </div>
                <Swiper {...swiperOptions} className="team-one__carousel">
                    <SwiperSlide>
                        <div className="item">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-1.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>CEO & Founder</p>
                                        <h3 className="team-one__title"><Link href="/team-details">James Carter</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-2.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Chief Technology Officer </p>
                                        <h3 className="team-one__title"><Link href="/team-details">Sophia Reynolds</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-3.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Lead Software Engineer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Michael Hayes</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-4.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>UI/UX Designer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Emma Brooks </Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-3.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Lead Software Engineer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Michael Hayes</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-4.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>UI/UX Designer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Emma Brooks </Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <div className="swiper-pagination"></div>

                </Swiper>
            </div>

            <TeamSliderText/>
        </section>
    </>
  )
}
