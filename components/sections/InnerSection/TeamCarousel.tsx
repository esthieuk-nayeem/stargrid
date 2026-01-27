'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image";
import Link from "next/link";

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,

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
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 1,
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

export default function TeamCarousel() {
  return (
    <>
        <section className="team-carousel-page">
            <div className="container">
                <Swiper {...swiperOptions} className="team-carousel-style">
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

                    <div className="carousel-dot-style">
                        <div className="swiper-pagination"></div>
                    </div>

                </Swiper>
            </div>
        </section>
    </>
  )
}