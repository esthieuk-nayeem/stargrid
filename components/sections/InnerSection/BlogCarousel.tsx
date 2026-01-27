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

export default function BlogCarousel() {
  return (
    <>
        <div className="container">
            <Swiper {...swiperOptions} className="blog-carousel-style">
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-1.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-1.jpg" alt="Image" width={32} height={32} priority />
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
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-2.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-2.jpg" alt="Image" width={32} height={32} priority />
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
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-3.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-3.jpg" alt="Image" width={32} height={32} priority />
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
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-4.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-4.jpg" alt="Image" width={32} height={32} priority />
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
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-5.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-5.jpg" alt="Image" width={32} height={32} priority />
                                </div>
                                <p className="blog-one__user-title">Emily Roberts</p>
                            </div>
                            <ul className="blog-one__meta list-unstyled">
                                <li>
                                    <Link href="/blog-details"><span className="far fa-calendar-alt"></span>February
                                        20, 2025</Link>
                                </li>
                                <li>
                                    <Link href="/blog-details"><span className="fal fa-comments"></span>80 Comments</Link>
                                </li>
                            </ul>
                            <h3 className="blog-one__title"><Link href="/blog-details">Top IT Trends in 2025: What
                                    Businesses Need to Know</Link></h3>
                            <p className="blog-one__text">Explore the latest innovations in IT, including AI,
                                cybersecurity, and cloud computing, and how they can benefit your business.</p>
                            <div className="blog-one__btn-box">
                                <Link href="/blog-details" className="thm-btn">Reed More<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-6.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-6.jpg" alt="Image" width={32} height={32} priority />
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
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-7.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-7.jpg" alt="Image" width={32} height={32} priority />
                                </div>
                                <p className="blog-one__user-title">David Johnson</p>
                            </div>
                            <ul className="blog-one__meta list-unstyled">
                                <li>
                                    <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March 5,
                                        2025</Link>
                                </li>
                                <li>
                                    <Link href="/blog-details"><span className="fal fa-comments"></span>45 Comments</Link>
                                </li>
                            </ul>
                            <h3 className="blog-one__title"><Link href="/blog-details">Why Cybersecurity Should Be Your
                                    Top Priority in 2025</Link></h3>
                            <p className="blog-one__text">Learn how to protect your business from cyber threats with the
                                latest security solutions, best practices..</p>
                            <div className="blog-one__btn-box">
                                <Link href="/blog-details" className="thm-btn">Reed More<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-8.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-8.jpg" alt="Image" width={32} height={32} priority />
                                </div>
                                <p className="blog-one__user-title">Jessica Martinez </p>
                            </div>
                            <ul className="blog-one__meta list-unstyled">
                                <li>
                                    <Link href="/blog-details"><span className="far fa-calendar-alt"></span>April 1,
                                        2025</Link>
                                </li>
                                <li>
                                    <Link href="/blog-details"><span className="fal fa-comments"></span>45 Comments</Link>
                                </li>
                            </ul>
                            <h3 className="blog-one__title"><Link href="/blog-details">Cloud vs. On-Premise: Which IT
                                    Infrastructure Is Right for You?</Link></h3>
                            <p className="blog-one__text"> A detailed comparison of cloud and on-premise solutions to
                                help businesses choose the best IT infrastructure.</p>
                            <div className="blog-one__btn-box">
                                <Link href="/blog-details" className="thm-btn">Reed More<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="blog-one__single">
                        <div className="blog-one__img">
                            <Image src="/assets/images/blog/blog-page-1-9.jpg" alt="Image" width={410} height={248} priority />
                            <div className="blog-one__tags">
                                <span>Digital</span>
                                <span>Technology</span>
                            </div>
                        </div>
                        <div className="blog-one__content">
                            <div className="blog-one__user">
                                <div className="blog-one__user-img">
                                    <Image src="/assets/images/blog/blog-page-user-9.jpg" alt="Image" width={32} height={32} priority />
                                </div>
                                <p className="blog-one__user-title">David Johnson</p>
                            </div>
                            <ul className="blog-one__meta list-unstyled">
                                <li>
                                    <Link href="/blog-details"><span className="far fa-calendar-alt"></span>February
                                        15, 2025</Link>
                                </li>
                                <li>
                                    <Link href="/blog-details"><span className="fal fa-comments"></span>45 Comments</Link>
                                </li>
                            </ul>
                            <h3 className="blog-one__title"><Link href="/blog-details">How Managed IT Services Can
                                    Reduce Costs</Link></h3>
                            <p className="blog-one__text">Find out how outsourcing IT services can help businesses cut
                                costs, improve efficiency, and focus on core.</p>
                            <div className="blog-one__btn-box">
                                <Link href="/blog-details" className="thm-btn">Reed More<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <div className="carousel-dot-style">
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    </>
  )
}
