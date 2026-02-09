'use client';

import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "swiper/css/effect-fade";
// import SliderBrand from "./SliderBrand";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation, EffectFade],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: '#main-slider__swiper-button-next',
    prevEl: '#main-slider__swiper-button-prev',
  },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 30 },
    575: { slidesPerView: 1, spaceBetween: 30 },
    767: { slidesPerView: 1, spaceBetween: 30 },
    991: { slidesPerView: 1, spaceBetween: 30 },
    1199: { slidesPerView: 1, spaceBetween: 30 },
    1350: { slidesPerView: 1, spaceBetween: 30 },
  }
};

export default function Banner() {
  const router = useRouter();

  const handleStartNew = () => {
    // Clear all questionnaire data - inline implementation to avoid import issues
    if (typeof window !== 'undefined') {
      try {
        // Clear multiSiteStorage keys
        localStorage.removeItem('stargrid_sites');
        localStorage.removeItem('stargrid_current_site_id');
        
        // Clear legacy storage keys
        localStorage.removeItem('sg_sites');
        localStorage.removeItem('sg_project_answers');
        localStorage.removeItem('sg_hidden_sites');
        localStorage.removeItem('sg_current_question');
        localStorage.removeItem('sg_active_site');
        
        console.log('✓ Cleared all questionnaire data');
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }

    router.push('/questionnaire');
  };

  return (
    <section className="main-slider-two">
      <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
        <SwiperSlide>
          <div className="swiper-slide">
            <div
              className="main-slider-two__bg"
              style={{ backgroundImage: "url(/assets/images/resources/bg.jpg)" }}
            ></div>

            <ul className="list-unstyled main-slider-two__menu">
              <li><Link href="/about">Help</Link></li>
              <li><Link href="/contact">Support</Link></li>
              <li><Link href="/faq">Faqs</Link></li>
            </ul>

            <div className="main-slider-two__social-box">
              <h4 className="main-slider-two__social-title">Follow Us:</h4>
              <div className="main-slider-two__social-box-inner">
                <Link href="#"><span className="icon-facebook"></span></Link>
                <Link href="#"><span className="icon-dribble"></span></Link>
                <Link href="#"><span className="icon-linkedin"></span></Link>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="main-slider-two__content">
                    <p className="main-slider-two__sub-title">
                      🛡️ Operational Continuity. Guaranteed.
                    </p>

                    <h2 className="main-slider-two__title">
                      StarGrid - <br />
                      Zero-Touch Resilience for a <br />
                      <span>Connected world</span>
                    </h2>

                    <p className="main-slider-two__text">
                      In a world where operational continuity depends on constant connectivity,
                      <br />
                      StarGrid provides a fully integrated cellular and satellite solution,
                      <br />
                      ensuring seamless, reliable, and global coverage for your operations—anywhere, anytime.
                    </p>

                    <div className="main-slider-two__btns-box">
                      <div className="main-slider-two__btn-box-1">
                        <button
                          type="button"
                          className="thm-btn"
                          onClick={handleStartNew}
                        >
                          Get Started
                          <span className="icon-right-arrow"></span>
                        </button>
                      </div>
                    </div>

                    <div className="main-slider-two__shield-check-icon">
                      <Image
                        src="/assets/images/icon/main-slider-shield-check-icon.png"
                        alt="shield"
                        width={28}
                        height={32}
                        priority
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <div className="main-slider-two__nav">
          <div className="swiper-button-prev" id="main-slider__swiper-button-prev">
            <i className="icon-right-up"></i>
          </div>
          <div className="swiper-button-next" id="main-slider__swiper-button-next">
            <i className="icon-right-up"></i>
          </div>
        </div>
      </Swiper>
    </section>
  );
}