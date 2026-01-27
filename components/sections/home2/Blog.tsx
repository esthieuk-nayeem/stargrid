'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import Brand from "./Brand";

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


export default function Blog() {
  return (
    <>
        <section className="blog-one" id="blog">
            <div className="blog-one__shape-1"></div>
            <div className="blog-one__shape-2"></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-1"></div>
                        <span className="section-title__tagline">News & Blog</span>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <AnimatedTitle>
                    <h2 className="section-title__title title-animation">How We&apos;ve <span>Empowered
                            Businesses</span><br /><span> with Innovative</span>Tech Solutions</h2>
                    </AnimatedTitle>
                </div>
                <Swiper {...swiperOptions} className="blog-one__carousel">
                    <SwiperSlide>
                        <div className="item">
                            <div className="blog-one__single">
                                <div className="blog-one__img">
                                    <Image src="/assets/images/blog/blog-1-1.jpg" alt="Image" width={410} height={248} priority />
                                    <div className="blog-one__tags">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <div className="blog-one__user">
                                        <div className="blog-one__user-img">
                                        <Image src="/assets/images/blog/blog-one-user-1.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-one__user-title">Alisa Olivia</p>
                                    </div>
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>April 5,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>80 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title"><Link href="/blog-details">Top IT Trends Shaping the Future
                                            of Business in 2025</Link></h3>
                                    <p className="blog-one__text">Explore essential cybersecurity strategies to safeguard
                                        sensitive information and defend against evolving cyber threats.</p>
                                    <div className="blog-one__btn-box">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="blog-one__single">
                                <div className="blog-one__img">
                                    <Image src="/assets/images/blog/blog-1-2.jpg" alt="Image" width={410} height={248} priority />
                                    <div className="blog-one__tags">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <div className="blog-one__user">
                                        <div className="blog-one__user-img">
                                            <Image src="/assets/images/blog/blog-one-user-2.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-one__user-title">Alisa Olivia</p>
                                    </div>
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>April 5,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>80 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title"><Link href="/blog-details">Cybersecurity Best Practices
                                            Protecting Your Data </Link></h3>
                                    <p className="blog-one__text">Explore essential cybersecurity strategies to safeguard
                                        sensitive information and defend against evolving cyber threats.</p>
                                    <div className="blog-one__btn-box">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="blog-one__single">
                                <div className="blog-one__img">
                                    <Image src="/assets/images/blog/blog-1-3.jpg" alt="Image" width={410} height={248} priority />
                                    <div className="blog-one__tags">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <div className="blog-one__user">
                                        <div className="blog-one__user-img">
                                            <Image src="/assets/images/blog/blog-one-user-3.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-one__user-title">Thomas Alison</p>
                                    </div>
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March 15,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>88 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title"><Link href="/blog-details">Cloud Computing vs. On-Premise
                                            Solutions Which is Right for You?</Link></h3>
                                    <p className="blog-one__text">Explore essential cybersecurity strategies to safeguard
                                        sensitive information and defend against evolving cyber threats.</p>
                                    <div className="blog-one__btn-box">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="blog-one__single">
                                <div className="blog-one__img">
                                    <Image src="/assets/images/blog/blog-1-4.jpg" alt="Image" width={410} height={248} priority />
                                    <div className="blog-one__tags">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <div className="blog-one__user">
                                        <div className="blog-one__user-img">
                                            <Image src="/assets/images/blog/blog-one-user-4.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-one__user-title">Olivia Emma.</p>
                                    </div>
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March 3,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>20 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title"><Link href="/blog-details">The Role of AI in Modern
                                            Solutions Transforming Industries</Link></h3>
                                    <p className="blog-one__text">Explore essential cybersecurity strategies to safeguard
                                        sensitive information and defend against evolving cyber threats.</p>
                                    <div className="blog-one__btn-box">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="blog-one__single">
                                <div className="blog-one__img">
                                    <Image src="/assets/images/blog/blog-1-5.jpg" alt="Image" width={410} height={248} priority />
                                    <div className="blog-one__tags">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <div className="blog-one__user">
                                        <div className="blog-one__user-img">
                                            <Image src="/assets/images/blog/blog-one-user-4.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-one__user-title">Thomas Alison</p>
                                    </div>
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>April 5,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>80 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title"><Link href="/blog-details">Why IT Support is Essential for
                                            Business Success in 2025</Link></h3>
                                    <p className="blog-one__text">Explore essential cybersecurity strategies to safeguard
                                        sensitive information and defend against evolving cyber threats.</p>
                                    <div className="blog-one__btn-box">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                     <SwiperSlide>
                        <div className="item">
                            <div className="blog-one__single">
                                <div className="blog-one__img">
                                    <Image src="/assets/images/blog/blog-1-4.jpg" alt="Image" width={410} height={248} priority />
                                    <div className="blog-one__tags">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                </div>
                                <div className="blog-one__content">
                                    <div className="blog-one__user">
                                        <div className="blog-one__user-img">
                                            <Image src="/assets/images/blog/blog-one-user-4.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-one__user-title">Olivia Emma.</p>
                                    </div>
                                    <ul className="blog-one__meta list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March 3,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>20 Comments</Link>
                                        </li>
                                    </ul>
                                    <h3 className="blog-one__title"><Link href="/blog-details">The Role of AI in Modern
                                            Solutions Transforming Industries</Link></h3>
                                    <p className="blog-one__text">Explore essential cybersecurity strategies to safeguard
                                        sensitive information and defend against evolving cyber threats.</p>
                                    <div className="blog-one__btn-box">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <div className="swiper-nav">
                        <div className="swiper-prev"><span className="icon-right-up"></span></div>
                        <div className="swiper-next"><span className="icon-right-up"></span></div>
                    </div>
                    <div className="swiper-pagination"></div>

                </Swiper>
            </div>
        </section>
    </>
  )
}
