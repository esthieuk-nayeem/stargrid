'use client'
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

export default function Testimonial() {
  return (
    <>
        <section className="testimonial-two" id="testimonial">
            <div className="testimonial-two__shape-1"></div>
            <div className="testimonial-two__shape-2"></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-1"></div>
                        <span className="section-title__tagline">Testimonials</span>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <AnimatedTitle>
                    <h2 className="section-title__title title-animation">Customer Experiences <br /> That <span>Speak
                            Volumes</span></h2>
                    </AnimatedTitle>
                </div>
                <Swiper {...swiperOptions} className="testimonial-two__carousel">
                    <SwiperSlide>
                        <div className="item">
                            <div className="testimonial-two__single">
                                <div className="testimonial-two__single-inner">
                                    <div className="testimonial-two__star">
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-star"></span>
                                        <span className="icon-star"></span>
                                    </div>
                                    <p className="testimonial-two__text">Absolutely fantastic experience! The team exceeded our
                                        expectations and delivered a solution that perfectly met our needs. Their attention
                                        to
                                        detail and commitment to quality is unmatched.</p>
                                </div>
                                <div className="testimonial-two__client-info">
                                    <div className="testimonial-two__client-img">
                                        <Image src="/assets/images/testimonial/testimonial-2-1.jpg" alt="Image" width={60} height={60} priority />
                                    </div>
                                    <div className="testimonial-two__client-content">
                                        <h4 className="testimonial-two__client-name"><Link href="/testimonials">Thomas
                                                Alison</Link></h4>
                                        <p className="testimonial-two__sub-title">UI/UX Designer</p>
                                    </div>
                                </div>
                                <div className="testimonial-two__quote">
                                    <span className="icon-right-quote"></span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="testimonial-two__single">
                                <div className="testimonial-two__single-inner">
                                    <div className="testimonial-two__star">
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-star"></span>
                                        <span className="icon-star"></span>
                                    </div>
                                    <p className="testimonial-two__text">Absolutely fantastic experience! The team exceeded our
                                        expectations and delivered a solution that perfectly met our needs. Their attention
                                        to
                                        detail and commitment to quality is unmatched.</p>
                                </div>
                                <div className="testimonial-two__client-info">
                                    <div className="testimonial-two__client-img">
                                        <Image src="/assets/images/testimonial/testimonial-2-2.jpg" alt="Image" width={60} height={60} priority />
                                    </div>
                                    <div className="testimonial-two__client-content">
                                        <h4 className="testimonial-two__client-name"><Link href="/testimonials">Sarah
                                                Williams</Link></h4>
                                        <p className="testimonial-two__sub-title">Marketing Manger</p>
                                    </div>
                                </div>
                                <div className="testimonial-two__quote">
                                    <span className="icon-right-quote"></span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="testimonial-two__single">
                                <div className="testimonial-two__single-inner">
                                    <div className="testimonial-two__star">
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-star"></span>
                                        <span className="icon-star"></span>
                                    </div>
                                    <p className="testimonial-two__text">Absolutely fantastic experience! The team exceeded our
                                        expectations and delivered a solution that perfectly met our needs. Their attention
                                        to
                                        detail and commitment to quality is unmatched.</p>
                                </div>
                                <div className="testimonial-two__client-info">
                                    <div className="testimonial-two__client-img">
                                        <Image src="/assets/images/testimonial/testimonial-2-3.jpg" alt="Image" width={60} height={60} priority />
                                    </div>
                                    <div className="testimonial-two__client-content">
                                        <h4 className="testimonial-two__client-name"><Link href="/testimonials">James
                                                Anderson</Link></h4>
                                        <p className="testimonial-two__sub-title">Product Designer</p>
                                    </div>
                                </div>
                                <div className="testimonial-two__quote">
                                    <span className="icon-right-quote"></span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="item">
                            <div className="testimonial-two__single">
                                <div className="testimonial-two__single-inner">
                                    <div className="testimonial-two__star">
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-pointed-star"></span>
                                        <span className="icon-star"></span>
                                        <span className="icon-star"></span>
                                    </div>
                                    <p className="testimonial-two__text">Absolutely fantastic experience! The team exceeded our
                                        expectations and delivered a solution that perfectly met our needs. Their attention
                                        to
                                        detail and commitment to quality is unmatched.</p>
                                </div>
                                <div className="testimonial-two__client-info">
                                    <div className="testimonial-two__client-img">
                                        <Image src="/assets/images/testimonial/testimonial-2-2.jpg" alt="Image" width={60} height={60} priority />
                                    </div>
                                    <div className="testimonial-two__client-content">
                                        <h4 className="testimonial-two__client-name"><Link href="/testimonials">Sarah
                                                Williams</Link></h4>
                                        <p className="testimonial-two__sub-title">Marketing Manger</p>
                                    </div>
                                </div>
                                <div className="testimonial-two__quote">
                                    <span className="icon-right-quote"></span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>
        </section>
    </>
  )
}
