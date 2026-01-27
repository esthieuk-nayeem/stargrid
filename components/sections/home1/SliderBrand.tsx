"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

export default function SliderBrand() {

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 5 },
    desktop: { breakpoint: { max: 1200, min: 992 }, items: 4 },
    tablet: { breakpoint: { max: 992, min: 576 }, items: 3 },
    mobile: { breakpoint: { max: 499, min: 0 }, items: 1 },
  };

  const brands = [
    "/assets/images/brand/brand-1-1.png",
    "/assets/images/brand/brand-1-2.png",
    "/assets/images/brand/brand-1-3.png",
    "/assets/images/brand/brand-1-4.png",
    "/assets/images/brand/brand-1-5.png",
  ];

  return (
    <>
        <div className="brand-two">
            <div className="brand-two__wrapper">
                <div className="brand-two__inner">
                    <div className="brand-two__left">
                        <div className="main-slider__trustpilot-box">
                            <ul className="list-unstyled main-slider__trustpilot-img-list">
                                <li>
                                    <div className="main-slider__trustpilot-img">
                                        <Image src="/assets/images/resources/main-slider-trustpilot-img-1.jpg" alt="Image" width={42} height={41} priority />
                                    </div>
                                </li>
                                <li>
                                    <div className="main-slider__trustpilot-img">
                                        <Image src="/assets/images/resources/main-slider-trustpilot-img-2.jpg" alt="Image" width={42} height={41} priority />
                                    </div>
                                </li>
                            </ul>
                            <div className="main-slider__trustpilot-content-box">
                                <div className="main-slider__trustpilot-logo">
                                    <Image src="/assets/images/resources/main-slider-trustpilot-logo.png" alt="Logo" width={195} height={26} priority />
                                </div>
                                <div className="main-slider__trustpilot-rating-review">
                                    <p className="main-slider__trustpilot-rating">5.0 Excellent</p>
                                    <p className="main-slider__trustpilot-review">Reviews <span
                                            className="odometer" data-count="4170"></span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="brand-two__right">
                        <div className="brand-two__carousel owl-theme">
                            <div className="brand-two__carousel owl-theme owl-carousel">
                                <Carousel
                                    responsive={responsive}
                                    infinite
                                    autoPlay
                                    autoPlaySpeed={2500}
                                    arrows={false}
                                    showDots={false}
                                    containerClass="owl-carousel"
                                    itemClass="item"
                                >
                                    {brands.map((src, i) => (
                                    <div key={i} className="brand-two__single">
                                        <div className="brand-two__img">
                                        <img src={src} alt={`Brand ${i + 1}`} />
                                        </div>
                                    </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
