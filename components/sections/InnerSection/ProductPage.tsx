"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomSelect from "@/components/elements/CustomSelect";
import PriceFilter from "@/components/elements/PriceFilter";
;
export default function ProductPage() {

    const [activeTab, setActiveTab] = useState("grid");

    const options = [
        { value: "0", label: "Sort by popular" },
        { value: "1", label: "Sort by Price" },
        { value: "2", label: "Sort by Ratings" },
    ];

    const [selectedValue, setSelectedValue] = useState("");

    return (
        <>
            <section className="product">
                <div className="container">
                    <div className="row">


                        <div className="col-xl-9 col-lg-12">
                            <div className="product__items">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="product__showing-result">
                                            <div className="product__showing-text-box">
                                                <p className="product__showing-text">Showing 1-12/14 of 14 results</p>
                                            </div>
                                            <div className="product__showing-sort">
                                                <div className="select-box">
                                                    <CustomSelect
                                                        options={options}
                                                        placeholder="Sort by popular"
                                                        onChange={setSelectedValue}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="product__all">
                                    <div className="product__all-tab">
                                        <div className="product__all-tab-button">
                                            <ul className="tabs-button-box clearfix">
                                                <li id="grid"
                                                    className={`tab-btn-item ${
                                                        activeTab === "grid" ? "active-btn" : ""
                                                    }`}
                                                    onClick={() => setActiveTab("grid")}
                                                    >
                                                        <div className="product__all-tab-button-icon one">
                                                            <i className="fa fa-solid fa-bars"></i>
                                                        </div>
                                                </li>
                                                <li id="list"
                                                    className={`tab-btn-item ${
                                                        activeTab === "list" ? "active-btn" : ""
                                                    }`}
                                                    onClick={() => setActiveTab("list")}
                                                    >
                                                        <div className="product__all-tab-button-icon">
                                                            <i className="fa fa-solid fa-list-ul"></i>
                                                        </div>
                                                </li>

                                            </ul>
                                        </div>

                                        
                                        <div className="tabs-content-box">
                                            {activeTab === "grid" && (
                                            <div className="tab-content-box-item tab-content-box-item-active" id="grid">
                                                <div className="product__all-tab-content-box-item">
                                                    <div className="product__all-tab-single">
                                                        <div className="row">
                                                            

                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
                                                                <div className="single-product-style1">
                                                                    <div className="single-product-style1__img">
                                                                        <Image src="/assets/images/shop/shop-product-1-5.png" alt="Image" width={300} height={310} priority />
                                                                        <Image src="/assets/images/shop/shop-product-1-5.png" alt="Image" width={300} height={310} priority />
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
                                                                                    ski helmet with visor
                                                                                </Link>
                                                                            </h4>
                                                                            <p><del>$25.00</del>$20.00</p>
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
                                                                <div className="single-product-style1">
                                                                    <div className="single-product-style1__img">
                                                                        <Image src="/assets/images/shop/shop-product-1-6.png" alt="Image" width={300} height={310} priority />
                                                                        <Image src="/assets/images/shop/shop-product-1-6.png" alt="Image" width={300} height={310} priority />
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
                                                                                    snowboard boot
                                                                                </Link>
                                                                            </h4>
                                                                            <p>$35.00</p>
                                                                        </div>
                                                                        <div className="single-product-style1__content-right">
                                                                            <div className="single-product-style1__review">
                                                                                <i className="fa fa-star"></i>
                                                                                <p>4.7</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
                                                                <div className="single-product-style1">
                                                                    <div className="single-product-style1__img">
                                                                        <Image src="/assets/images/shop/shop-product-1-5.png" alt="Image" width={300} height={310} priority />
                                                                        <Image src="/assets/images/shop/shop-product-1-5.png" alt="Image" width={300} height={310} priority />
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
                                                                                    ski helmet with visor
                                                                                </Link>
                                                                            </h4>
                                                                            <p><del>$25.00</del>$20.00</p>
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
                                                            
                                                            <div className="col-xl-4 col-lg-6 col-md-6">
                                                                <div className="single-product-style1">
                                                                    <div className="single-product-style1__img">
                                                                        <Image src="/assets/images/shop/shop-product-1-6.png" alt="Image" width={300} height={310} priority />
                                                                        <Image src="/assets/images/shop/shop-product-1-6.png" alt="Image" width={300} height={310} priority />
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
                                                                                    snowboard boot
                                                                                </Link>
                                                                            </h4>
                                                                            <p>$35.00</p>
                                                                        </div>
                                                                        <div className="single-product-style1__content-right">
                                                                            <div className="single-product-style1__review">
                                                                                <i className="fa fa-star"></i>
                                                                                <p>4.7</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                            
                                            {activeTab === "list" && (
                                            <div className="tab-content-box-item" id="list">
                                                <div className="product__all-tab-content-box-item">
                                                    <div className="product__all-tab-single">
                                                        <div className="row">


                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-1.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-1.png" alt="Image" width={225} height={230} priority />
                                                                                <ul className="single-product-style1__overlay">
                                                                                    <li>
                                                                                        <p>New</p>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            rendering metallic ai
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$33.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-2.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-2.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            3d render robot
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$50.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-3.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-3.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            motorcycle helmet
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$40.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-4.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-4.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                            <ul className="single-product-style1__overlay">
                                                                                <li>
                                                                                    <p>5% Off</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            robot gesturing
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p><del>$33.00</del>$28.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-5.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-5.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                            <ul className="single-product-style1__overlay">
                                                                                <li>
                                                                                    <p>5% Off</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            ski helmet with visor
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p><del>$25.00</del>$20.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-6.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-6.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            snowboard boot
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$35.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-1.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-1.png" alt="Image" width={225} height={230} priority />
                                                                                <ul className="single-product-style1__overlay">
                                                                                    <li>
                                                                                        <p>New</p>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            rendering metallic ai
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$33.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-2.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-2.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            3d render robot
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$50.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-3.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-3.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            motorcycle helmet
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$40.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-4.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-4.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                            <ul className="single-product-style1__overlay">
                                                                                <li>
                                                                                    <p>5% Off</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            robot gesturing
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p><del>$33.00</del>$28.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-5.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-5.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                            <ul className="single-product-style1__overlay">
                                                                                <li>
                                                                                    <p>5% Off</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            ski helmet with visor
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p><del>$25.00</del>$20.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-6.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-6.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            snowboard boot
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$35.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-1.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-1.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                            <ul className="single-product-style1__overlay">
                                                                                <li>
                                                                                    <p>5% Off</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            rendering metallic ai
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p><del>$25.00</del>$20.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-xl-6 col-lg-6">
                                                                <div className="single-product-style2">
                                                                    <div className="row">
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__img">
                                                                                <Image src="/assets/images/shop/shop-product-2-2.png" alt="Image" width={225} height={230} priority />
                                                                                <Image src="/assets/images/shop/shop-product-2-2.png" alt="Image" width={225} height={230} priority />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                                                            <div className="single-product-style2__content">
                                                                                <div className="single-product-style2__review">
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                    <i className="fa fa-star"></i>
                                                                                </div>
                                                                                <div className="single-product-style2__text">
                                                                                    <h4>
                                                                                        <Link href="/product-details">
                                                                                            3d render robot
                                                                                        </Link>
                                                                                    </h4>
                                                                                    <p>$35.00</p>
                                                                                </div>
                                                                                <ul className="single-product-style2__info">
                                                                                    <li>
                                                                                        <Link href="#" title="Add to Wishlist">
                                                                                            <i
                                                                                                className="fa fa-regular fa-heart">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Add to cart">
                                                                                            <i
                                                                                                className="fa fa-solid fa-cart-plus">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Quick View">
                                                                                            <i className="fa fa-regular fa-eye">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                    <li>
                                                                                        <Link href="#" title="Compare">
                                                                                            <i
                                                                                                className="fa fa-solid fa-repeat">
                                                                                            </i>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                            
                                        </div>
                                        
                                    </div>
                                    <ul className="styled-pagination text-center clearfix list-unstyled">
                                        <li className="arrow prev active">
                                            <Link href="#">
                                                <span className="icon-left-arrow"></span>
                                            </Link>
                                        </li>
                                        <li><Link href="#">1</Link></li>
                                        <li><Link href="#">2</Link></li>
                                        <li><Link href="#">3</Link></li>
                                        <li className="arrow next">
                                            <Link href="#">
                                                <span className="icon-right-arrow"></span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-12">
                            <div className="product__sidebar">
                                <div className="shop-search product__sidebar-single">
                                    <form action="#">
                                        <input type="text" placeholder="Search" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                                <div className="product__price-ranger product__sidebar-single">
                                    <h3 className="product__sidebar-title">Price</h3>
                                    <PriceFilter/>
                                </div>

                                <div className="shop-category product__sidebar-single">
                                    <h3 className="product__sidebar-title">Categories</h3>
                                    <ul className="list-unstyled">
                                        <li><Link href="#">A Tradition of Healing</Link></li>
                                        <li className="active"><Link href="#">Compassionate Care</Link></li>
                                        <li><Link href="#">Caring for You, Always</Link></li>
                                        <li><Link href="#">Where Health Matters</Link></li>
                                        <li><Link href="#">Environtment Recyle</Link></li>
                                    </ul>
                                </div>

                                <div className="shop-product-recent-products product__sidebar-single">
                                    <h3 className="product__sidebar-title">Recent Products</h3>
                                    <ul className="clearfix list-unstyled">
                                        <li>
                                            <div className="img">
                                                <Image src="/assets/images/shop/product-thumb-1.png" alt="Image" width={70} height={70} priority />
                                                <Link href="#"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                            </div>
                                            <div className="content">
                                                <div className="title">
                                                    <h5><Link href="#">metallic ai</Link></h5>
                                                </div>
                                                <div className="price">
                                                    <p>$33.00</p>
                                                </div>
                                                <div className="review">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star color"></i>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="img">
                                                <Image src="/assets/images/shop/product-thumb-2.png" alt="Image" width={70} height={70} priority />
                                                <Link href="#"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                            </div>
                                            <div className="content">
                                                <div className="title">
                                                    <h5><Link href="#">3d render robot</Link></h5>
                                                </div>
                                                <div className="price">
                                                    <p>$39.00</p>
                                                </div>
                                                <div className="review">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star color"></i>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="img">
                                                <Image src="/assets/images/shop/product-thumb-3.png" alt="Image" width={70} height={70} priority />
                                                <Link href="#"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                            </div>
                                            <div className="content">
                                                <div className="title">
                                                    <h5><Link href="#">motorcycle helmet</Link></h5>
                                                </div>
                                                <div className="price">
                                                    <p>$54.00</p>
                                                </div>
                                                <div className="review">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star color"></i>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="img">
                                                <Image src="/assets/images/shop/product-thumb-4.png" alt="Image" width={70} height={70} priority />
                                                <Link href="#"><i className="fa fa-link" aria-hidden="true"></i></Link>
                                            </div>
                                            <div className="content">
                                                <div className="title">
                                                    <h5><Link href="#">robot gesturing</Link></h5>
                                                </div>
                                                <div className="price">
                                                    <p>$44.00</p>
                                                </div>
                                                <div className="review">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star color"></i>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="shop-product-tags product__sidebar-single">
                                    <h3 className="product__sidebar-title">Product Tags</h3>
                                    <div className="shop-product__tags-list">
                                        <Link href="#">Development</Link>
                                        <Link href="#">Innovation</Link>
                                        <Link href="#">Analytics</Link>
                                        <Link href="#">Marketing</Link>
                                        <Link href="#">Innovation</Link>
                                        <Link href="#">Technology</Link>
                                    </div>
                                </div>

                                
                                <div className="shop-product-rating product__sidebar-single style">
                                    <h3 className="product__sidebar-title">Reviews</h3>
                                    <div className="sidebar-rating-box sidebar-rating-box--style2">
                                        <ul className="list-unstyled">
                                            <li>
                                                <input type="radio" id="fivestar" name="rating" defaultChecked />
                                                <label htmlFor="fivestar">
                                                    <i></i>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="fourstar" name="rating" />
                                                <label htmlFor="fourstar">
                                                    <i></i>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star gray"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="threestar" name="rating" />
                                                <label htmlFor="threestar">
                                                    <i></i>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star gray"></span>
                                                    <span className="icon-star gray"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="twostar" name="rating" />
                                                <label htmlFor="twostar">
                                                    <i></i>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star gray"></span>
                                                    <span className="icon-star gray"></span>
                                                    <span className="icon-star gray"></span>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" id="onestar" name="rating" />
                                                <label htmlFor="onestar">
                                                    <i></i>
                                                    <span className="icon-star"></span>
                                                    <span className="icon-star gray"></span>
                                                    <span className="icon-star gray"></span>
                                                    <span className="icon-star gray"></span>
                                                    <span className="icon-star gray"></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                





                            </div>
                        </div>



                    </div>
                </div>
            </section>
        </>
    )
}
