
'use client'
import Image from "next/image";
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
            slidesPerView: 4,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    }
}

export default function Brand() {
  return (
    <>
        <div className="brand-one">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <div className="brand-one__left">
                            <ul className="list-unstyled brand-one__img-list">
                                <li>
                                    <div className="brand-one__img-box">
                                        <Image src="/assets/images/brand/brand-one-img-1-1.jpg" alt="Image" width={48} height={48} priority />
                                    </div>
                                </li>
                                <li>
                                    <div className="brand-one__img-box">
                                        <Image src="/assets/images/brand/brand-one-img-1-2.jpg" alt="Image" width={48} height={48} priority />
                                    </div>
                                </li>
                            </ul>
                            <p className="brand-one__text">12K Trusted by clients <br />
                                worldwide
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7">
                        <div className="brand-one__right">
                            <Swiper {...swiperOptions} className="theme_carousel testimonial-carousel">
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-1.png" alt="Image" width={153} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-2.png" alt="Image" width={123} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-3.png" alt="Image" width={147} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-4.png" alt="Image" width={103} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-5.png" alt="Image" width={124} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-1.png" alt="Image" width={153} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-2.png" alt="Image" width={123} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-3.png" alt="Image" width={147} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-4.png" alt="Image" width={103} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="item">
                                        <div className="brand-one__single">
                                            <div className="brand-one__img">
                                                <Image src="/assets/images/brand/brand-1-5.png" alt="Image" width={124} height={28} priority />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
