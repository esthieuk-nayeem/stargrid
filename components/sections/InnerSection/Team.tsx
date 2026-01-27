'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link";
import Image from "next/image";
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
        nextEl: '.owl-prev',
        prevEl: '.owl-next',
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

export default function Team() {
  return (
    <>
        <section className="team-two">
            <div className="team-two__bg-shape float-bob-y"
                style={{ backgroundImage: "url(/assets/images/shapes/team-two-bg-shape.png)" }}>
            </div>
            <div className="team-two__shape-1"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="team-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Our Members</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Meet Our Team. <span>Get to 
                                    </span><br /><span>Know the Talented </span>
                                    Minds <br />Behind Our Team</h2>
                                </AnimatedTitle>
                            </div>
                            <p className="team-two__text">Our dedicated team combines expertise, <br />creativity, and passion
                                to
                                deliver exceptional<br /> results and ensure your satisfaction every step<br /> of the way.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="team-two__right team-two__carousel">
                            <Swiper {...swiperOptions} className="team-two__carousel">
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="team-two__single">
                                            <div className="team-two__img-box">
                                                <div className="team-two__img">
                                                    <Image src="/assets/images/team/team-2-1.jpg" alt="Image" width={410} height={450} priority />
                                                </div>
                                                <div className="team-two__social">
                                                    <Link href="#"><span className="icon-facebook"></span></Link>
                                                    <Link href="#"><span className="icon-dribble"></span></Link>

                                                    <Link href="#"><span className="icon-linkedin"></span></Link>
                                                </div>
                                                <div className="team-two__title-box">
                                                    <h3><Link href="/team-details">Sophia Bennett</Link></h3>
                                                    <p>CEO & Founder</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="team-two__single">
                                            <div className="team-two__img-box">
                                                <div className="team-two__img">
                                                    <Image src="/assets/images/team/team-2-2.jpg" alt="Image" width={410} height={450} priority />
                                                </div>
                                                <div className="team-two__social">
                                                    <Link href="#"><span className="icon-facebook"></span></Link>
                                                    <Link href="#"><span className="icon-dribble"></span></Link>

                                                    <Link href="#"><span className="icon-linkedin"></span></Link>
                                                </div>
                                                <div className="team-two__title-box">
                                                    <h3><Link href="/team-details">Liam Johnson</Link></h3>
                                                    <p>Operations Manager</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="team-two__single">
                                            <div className="team-two__img-box">
                                                <div className="team-two__img">
                                                    <Image src="/assets/images/team/team-2-3.jpg" alt="Image" width={410} height={450} priority />
                                                </div>
                                                <div className="team-two__social">
                                                    <Link href="#"><span className="icon-facebook"></span></Link>
                                                    <Link href="#"><span className="icon-dribble"></span></Link>

                                                    <Link href="#"><span className="icon-linkedin"></span></Link>
                                                </div>
                                                <div className="team-two__title-box">
                                                    <h3><Link href="/team-details">Ethan Miller</Link></h3>
                                                    <p>Lead Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="team-two__single">
                                            <div className="team-two__img-box">
                                                <div className="team-two__img">
                                                    <Image src="/assets/images/team/team-2-1.jpg" alt="Image" width={410} height={450} priority />
                                                </div>
                                                <div className="team-two__social">
                                                    <Link href="#"><span className="icon-facebook"></span></Link>
                                                    <Link href="#"><span className="icon-dribble"></span></Link>

                                                    <Link href="#"><span className="icon-linkedin"></span></Link>
                                                </div>
                                                <div className="team-two__title-box">
                                                    <h3><Link href="/team-details">Sophia Bennett</Link></h3>
                                                    <p>CEO & Founder</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="team-two__single">
                                            <div className="team-two__img-box">
                                                <div className="team-two__img">
                                                    <Image src="/assets/images/team/team-2-2.jpg" alt="Image" width={410} height={450} priority />
                                                </div>
                                                <div className="team-two__social">
                                                    <Link href="#"><span className="icon-facebook"></span></Link>
                                                    <Link href="#"><span className="icon-dribble"></span></Link>

                                                    <Link href="#"><span className="icon-linkedin"></span></Link>
                                                </div>
                                                <div className="team-two__title-box">
                                                    <h3><Link href="/team-details">Liam Johnson</Link></h3>
                                                    <p>Operations Manager</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="team-two__single">
                                            <div className="team-two__img-box">
                                                <div className="team-two__img">
                                                    <Image src="/assets/images/team/team-2-3.jpg" alt="Image" width={410} height={450} priority />
                                                </div>
                                                <div className="team-two__social">
                                                    <Link href="#"><span className="icon-facebook"></span></Link>
                                                    <Link href="#"><span className="icon-dribble"></span></Link>

                                                    <Link href="#"><span className="icon-linkedin"></span></Link>
                                                </div>
                                                <div className="team-two__title-box">
                                                    <h3><Link href="/team-details">Ethan Miller</Link></h3>
                                                    <p>Lead Designer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div className="owl-nav">
                                <div className="owl-prev"><span className="icon-right-up"></span></div>
                                <div className="owl-next"><span className="icon-right-up"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
