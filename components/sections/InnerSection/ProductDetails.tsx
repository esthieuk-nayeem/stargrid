"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Link from "next/link";
import { Swiper as SwiperType } from "swiper";

export default function ProductDetails() {
  // Correctly typed thumbsSwiper
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // prevent going below 1
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  return (
    <section className="product-details">
      <div className="container">
        <div className="row">
          {/* Left side - images */}
          <div className="col-lg-6 col-xl-6">
            <div className="product-details__left">
              <div className="product-details__left-inner">
                <div className="product-details__content-box">
                  {/* Main carousel */}
                  <Swiper
                    modules={[Navigation, Thumbs, Autoplay]}
                    loop={true}
                    speed={1400}
                    autoplay={{ delay: 5000 }}
                    slidesPerView={1}
                    thumbs={{ swiper: thumbsSwiper }}
                    navigation={{
                      nextEl: "#product-details__swiper-button-next",
                      prevEl: "#product-details__swiper-button-prev",
                    }}
                    className="swiper-container"
                    id="shop-details-one__carousel"
                  >
                    <SwiperSlide>
                      <div className="product-details__img">
                        <Image
                          src="/assets/images/shop/product-details-img-1.png"
                          alt="Image"
                          width={550}
                          height={640}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__img">
                        <Image
                          src="/assets/images/shop/product-details-img-2.png"
                          alt="Image"
                          width={550}
                          height={640}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__img">
                        <Image
                          src="/assets/images/shop/product-details-img-3.png"
                          alt="Image"
                          width={550}
                          height={640}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__img">
                        <Image
                          src="/assets/images/shop/product-details-img-1.png"
                          alt="Image"
                          width={550}
                          height={640}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__img">
                        <Image
                          src="/assets/images/shop/product-details-img-2.png"
                          alt="Image"
                          width={550}
                          height={640}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__img">
                        <Image
                          src="/assets/images/shop/product-details-img-3.png"
                          alt="Image"
                          width={550}
                          height={640}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    {/* Repeat slides as in original */}
                  </Swiper>

                  {/* Navigation buttons */}
                  <div className="product-details__nav">
                    <div
                      className="swiper-button-prev"
                      id="product-details__swiper-button-prev"
                      aria-label="Previous slide"
                      role="button"
                    >
                      <i className="icon-left-arrow"></i>
                    </div>
                    <div
                      className="swiper-button-next"
                      id="product-details__swiper-button-next"
                      aria-label="Next slide"
                      role="button"
                    >
                      <i className="icon-right-arrow"></i>
                    </div>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="product-details__thumb-box">
                  <Swiper
                    modules={[Thumbs, Autoplay]}
                    onSwiper={setThumbsSwiper}
                    watchSlidesProgress
                    loop={true}
                    speed={1400}
                    slidesPerView={3}
                    spaceBetween={0}
                    autoplay={{ delay: 5000 }}
                    className="swiper-container"
                    id="shop-details-one__thumb"
                  >
                    <SwiperSlide>
                      <div className="product-details__thumb-img">
                        <Image
                          src="/assets/images/shop/product-details-thumb-img-1.png"
                          alt="Image"
                          width={125}
                          height={125}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__thumb-img">
                        <Image
                          src="/assets/images/shop/product-details-thumb-img-2.png"
                          alt="Image"
                          width={125}
                          height={125}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__thumb-img">
                        <Image
                          src="/assets/images/shop/product-details-thumb-img-3.png"
                          alt="Image"
                          width={125}
                          height={125}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__thumb-img">
                        <Image
                          src="/assets/images/shop/product-details-thumb-img-1.png"
                          alt="Image"
                          width={125}
                          height={125}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__thumb-img">
                        <Image
                          src="/assets/images/shop/product-details-thumb-img-2.png"
                          alt="Image"
                          width={125}
                          height={125}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="product-details__thumb-img">
                        <Image
                          src="/assets/images/shop/product-details-thumb-img-3.png"
                          alt="Image"
                          width={125}
                          height={125}
                          priority
                        />
                      </div>
                    </SwiperSlide>
                    {/* Repeat thumbs as needed */}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - details */}
          <div className="col-lg-6 col-xl-6">
            <div className="product-details__right">
              <div className="product-details__top">
                <h3 className="product-details__title">
                  3d rendering metallic ai <span>$86.00</span>
                </h3>
              </div>

              <div className="product-details__reveiw">
                <i className="icon-pointed-star"></i>
                <i className="icon-pointed-star"></i>
                <i className="icon-pointed-star"></i>
                <i className="icon-pointed-star"></i>
                <i className="icon-pointed-star"></i>
                <span>55 customer reviews</span>
              </div>

              <div className="product-details__content">
                <p className="product-details__content-text1">
                  The power to be found between the pages of a book is formidable, indeed. And these 80 inspiring quotes about books and importance of reading are here to remind you of that. From beloved bestsellers to iconic celebrities, these quotes exemplify the benefits of reading and of a good books to comfort, challenge, and inspire you.
                </p>
                <p className="product-details__content-text2">
                  REF. 4231/406 <br /> Available in store
                </p>
              </div>

              {/* Size selection */}
              <div className="product-details__select">
                <div className="product-details__select-size">
                  <h3>Size:</h3>
                  <ul className="list-unstyled">
                    {["XXL", "XL", "XS", "M", "L", "S"].map((size, idx) => (
                      <li key={size}>
                        <input type="radio" id={`size${idx + 1}`} name="rating" defaultChecked={idx === 0} />
                        <label htmlFor={`size${idx + 1}`}>
                          <i></i>
                          <span>{size}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quantity */}
              <div className="product-details__inner">
                <div className="product-details__quantity">
                  <h3 className="product-details__quantity-title">Quantity</h3>
                  <div className="quantity-box">
                    <button type="button" className="sub" onClick={handleDecrease}>
                      <i className="fa fa-minus"></i>
                    </button>

                    <input
                      type="number"
                      id="quantity-1"
                      value={quantity}
                      onChange={handleChange}
                      min={1}
                    />

                    <button type="button" className="add" onClick={handleIncrease}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="product-details__buttons-boxes">
                  <div className="product-details__buttons-1">
                    <Link href="/wishlist" className="thm-btn">
                      Add to Wishlist<span className="icon-right-arrow"></span>
                    </Link>
                  </div>
                  <div className="product-details__buttons-2">
                    <Link href="/cart" className="thm-btn">
                      Add to Cart<span className="icon-right-arrow"></span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="product-details__social">
                <div className="title">
                  <h3>Share with friends:</h3>
                </div>
                <div className="product-details__social-link">
                  <Link href="#"><span className="fab fa-twitter"></span></Link>
                  <Link href="#"><span className="fab fa-facebook"></span></Link>
                  <Link href="#"><span className="fab fa-pinterest-p"></span></Link>
                  <Link href="#"><span className="fab fa-instagram"></span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
