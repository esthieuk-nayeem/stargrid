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


export default function Testimonial() {
  return (
    <>
        <section className="testimonial-one">
            <div className="testimonial-one__bg"
                style={{ backgroundImage: "url(/assets/images/backgrounds/testimonial-one-bg-1.jpg)" }}></div>
            <div className="testimonial-one__shape-1"></div>
            <div className="testimonial-one__shape-2 float-bob-y">
                <Image src="/assets/images/shapes/testimonial-one-shape-2.png" alt="Image" width={291} height={754} priority />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-9">
                        <div className="testimonial-one__content-box">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Client Testimonial</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">What Our Clients
                                    <span>- Say<br /></span><span> About Us</span></h2>
                                </AnimatedTitle>
                            </div>
                            <Swiper {...swiperOptions} className="testimonial-one__carousel">
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="testimonial-one__single">
                                            <div className="testimonial-one__img-box">
                                                <div className="testimonial-one__img">
                                                    <Image src="/assets/images/testimonial/testimonial-1-1.jpg" alt="Image" width={260} height={292} priority />
                                                </div>
                                            </div>
                                            <div className="testimonial-one__content">
                                                <h4 className="testimonial-one__title">!Great Agency It Agency</h4>
                                                <p className="testimonial-one__text">“From the initial consultation to the final
                                                    product, every step was handled with professionalism and care. The final
                                                    result exceeded our expectations and has significantly improved our
                                                    operations&quot;</p>
                                                <div className="testimonial-one__bottom">
                                                    <div className="testimonial-one__quote-and-client-info">
                                                        <div className="testimonial-one__quote">
                                                            <span className="icon-left"></span>
                                                        </div>
                                                        <div className="testimonial-one__client-info">
                                                            <p className="testimonial-one__client-sub-title">Marketing Manager
                                                            </p>
                                                            <h3 className="testimonial-one__client-name"><Link
                                                                    href="/testimonials">Sarah Collins</Link></h3>
                                                        </div>
                                                    </div>
                                                    <div className="testimonial-one__trustpilot-box">
                                                        <div className="testimonial-one__trustpilot-logo">
                                                            <Image src="/assets/images/resources/trustpilot-logo.png" alt="Image" width={162} height={40} priority />
                                                        </div>
                                                        <div className="testimonial-one__trustpilot-text-and-star">
                                                            <p className="testimonial-one__trustpilot-text">5.0 Excellent </p>
                                                            <ul className="list-unstyled testimonial-one__trustpilot-star-list">
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="testimonial-one__single">
                                            <div className="testimonial-one__img-box">
                                                <div className="testimonial-one__img">
                                                    <Image src="/assets/images/testimonial/testimonial-1-2.jpg" alt="Image" width={260} height={292} priority />
                                                </div>
                                            </div>
                                            <div className="testimonial-one__content">
                                                <h4 className="testimonial-one__title">!Great Agency It Agency</h4>
                                                <p className="testimonial-one__text">“From the initial consultation to the final
                                                    product, every step was handled with professionalism and care. The final
                                                    result exceeded our expectations and has significantly improved our
                                                    operations&quot;</p>
                                                <div className="testimonial-one__bottom">
                                                    <div className="testimonial-one__quote-and-client-info">
                                                        <div className="testimonial-one__quote">
                                                            <span className="icon-left"></span>
                                                        </div>
                                                        <div className="testimonial-one__client-info">
                                                            <p className="testimonial-one__client-sub-title">Marketing Manager
                                                            </p>
                                                            <h3 className="testimonial-one__client-name"><Link
                                                                    href="/testimonials">Collins Munro</Link></h3>
                                                        </div>
                                                    </div>
                                                    <div className="testimonial-one__trustpilot-box">
                                                        <div className="testimonial-one__trustpilot-logo">
                                                            <Image src="/assets/images/resources/trustpilot-logo.png" alt="Image" width={162} height={40} priority />
                                                        </div>
                                                        <div className="testimonial-one__trustpilot-text-and-star">
                                                            <p className="testimonial-one__trustpilot-text">5.0 Excellent </p>
                                                            <ul className="list-unstyled testimonial-one__trustpilot-star-list">
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="testimonial-one__single">
                                            <div className="testimonial-one__img-box">
                                                <div className="testimonial-one__img">
                                                    <Image src="/assets/images/testimonial/testimonial-1-3.jpg" alt="Image" width={260} height={292} priority />
                                                </div>
                                            </div>
                                            <div className="testimonial-one__content">
                                                <h4 className="testimonial-one__title">!Great Agency It Agency</h4>
                                                <p className="testimonial-one__text">“From the initial consultation to the final
                                                    product, every step was handled with professionalism and care. The final
                                                    result exceeded our expectations and has significantly improved our
                                                    operations&quot;</p>
                                                <div className="testimonial-one__bottom">
                                                    <div className="testimonial-one__quote-and-client-info">
                                                        <div className="testimonial-one__quote">
                                                            <span className="icon-left"></span>
                                                        </div>
                                                        <div className="testimonial-one__client-info">
                                                            <p className="testimonial-one__client-sub-title">Marketing Manager
                                                            </p>
                                                            <h3 className="testimonial-one__client-name"><Link
                                                                    href="/testimonials">Sarah James</Link></h3>
                                                        </div>
                                                    </div>
                                                    <div className="testimonial-one__trustpilot-box">
                                                        <div className="testimonial-one__trustpilot-logo">
                                                            <Image src="/assets/images/resources/trustpilot-logo.png" alt="Image" width={162} height={40} priority />
                                                        </div>
                                                        <div className="testimonial-one__trustpilot-text-and-star">
                                                            <p className="testimonial-one__trustpilot-text">5.0 Excellent </p>
                                                            <ul className="list-unstyled testimonial-one__trustpilot-star-list">
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="testimonial-one__trustpilot-star-icon">
                                                                    <Image src="/assets/images/icon/star-icon.png" alt="Image" width={9} height={8} priority />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
                </div>
            </div>
            <Brand/>
        </section>
    </>
  )
}
