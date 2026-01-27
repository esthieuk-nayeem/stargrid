'use client'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image";
import Link from "next/link";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
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
            slidesPerView: 3,
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

export default function RelatedProducts() {
  return (
    <>
        <section className="related-products">
            <div className="container">
                <div className="related-products__title">
                    <h3>Related Products</h3>
                    <p>Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>
                <div className="row">
                    <Swiper {...swiperOptions} className="related-products__carousel">
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-1.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-1.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__overlay">
                                            <li>
                                                <p>New</p>
                                            </li>
                                        </ul>
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    rendering metallic ai
                                                </Link>
                                            </h4>
                                            <p>$33.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.9</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-2.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-2.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    3d render robot
                                                </Link>
                                            </h4>
                                            <p>$50.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>5.0</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-3.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-3.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__overlay">
                                            <li>
                                                <p>5% Off</p>
                                            </li>
                                        </ul>
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    motorcycle helmet
                                                </Link>
                                            </h4>
                                            <p><del>$33.00</del> $28.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-4.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-4.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    robot gesturing
                                                </Link>
                                            </h4>
                                            <p>$40.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.8</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-1.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-1.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__overlay">
                                            <li>
                                                <p>New</p>
                                            </li>
                                        </ul>
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    rendering metallic ai
                                                </Link>
                                            </h4>
                                            <p>$33.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.9</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-2.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-2.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    3d render robot
                                                </Link>
                                            </h4>
                                            <p>$50.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>5.0</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-3.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-3.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__overlay">
                                            <li>
                                                <p>5% Off</p>
                                            </li>
                                        </ul>
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    motorcycle helmet
                                                </Link>
                                            </h4>
                                            <p><del>$33.00</del> $28.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-4.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-4.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    robot gesturing
                                                </Link>
                                            </h4>
                                            <p>$40.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.8</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-1.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-1.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__overlay">
                                            <li>
                                                <p>New</p>
                                            </li>
                                        </ul>
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    rendering metallic ai
                                                </Link>
                                            </h4>
                                            <p>$33.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.9</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-2.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-2.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    3d render robot
                                                </Link>
                                            </h4>
                                            <p>$50.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>5.0</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-3.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-3.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__overlay">
                                            <li>
                                                <p>5% Off</p>
                                            </li>
                                        </ul>
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    motorcycle helmet
                                                </Link>
                                            </h4>
                                            <p><del>$33.00</del> $28.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="item">
                                <div className="single-product-style1">
                                    <div className="single-product-style1__img">
                                        <Image src="/assets/images/shop/shop-product-1-4.png" alt="Image" width={300} height={310} priority />
                                        <Image src="/assets/images/shop/shop-product-1-4.png" alt="Image" width={300} height={310} priority />
                                        <ul className="single-product-style1__info">
                                            <li>
                                                <Link href="#" title="Add to Wishlist">
                                                    <i className="fa fa-regular fa-heart"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Add to cart">
                                                    <i className="fa fa-solid fa-cart-plus"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Quick View">
                                                    <i className="fa fa-regular fa-eye"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" title="Compare">
                                                    <i className="fa fa-solid fa-repeat"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="single-product-style1__content">
                                        <div className="single-product-style1__content-left">
                                            <h4>
                                                <Link href="/product-details">
                                                    robot gesturing
                                                </Link>
                                            </h4>
                                            <p>$40.00</p>
                                        </div>
                                        <div className="single-product-style1__content-right">
                                            <div className="single-product-style1__review">
                                                <i className="fa fa-star"></i>
                                                <p>4.8</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    </>
  )
}