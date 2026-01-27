"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function About() {

    const [activeTab, setActiveTab] = useState("monthly");

  return (
    <>
        <section className="pricing-two">
            <div className="pricing-two__sec-shape-1"></div>
            <div className="pricing-two__sec-shape-2"></div>
            <div className="pricing-two__sec-shape-3"></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-1"></div>
                        <span className="section-title__tagline">Pricing & Plan</span>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <AnimatedTitle>
                    <h2 className="section-title__title title-animation">Select the Perfect
                        <span>Plan for Your</span><br /><span>Needs That Fits You</span>
                    </h2>
                    </AnimatedTitle>
                </div>
                <div className="pricing-two__main-tab-box tabs-box">
                    <ul className="tab-buttons list-unstyled">
                        <li
                            className={`tab-btn ${
                                activeTab === "monthly" ? "active-btn" : ""
                            }`}
                            onClick={() => setActiveTab("monthly")}
                            ><span>Monthly</span>
                        </li>
                        <li
                            className={`tab-btn ${
                                activeTab === "yearly" ? "active-btn" : ""
                            }`}
                            onClick={() => setActiveTab("yearly")}
                            ><span>Yearly</span>
                        </li>
                        <li
                            className={`tab-btn ${
                                activeTab === "packges" ? "active-btn" : ""
                            }`}
                            onClick={() => setActiveTab("packges")}
                            ><span>Packges</span>
                        </li>
                    </ul>
                    <div className="tabs-content">
                        {activeTab === "monthly" && (
                        <div className="tab active-tab">
                            <div className="pricing-two__inner">
                                <div className="row">
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-1">
                                            <div className="pricing-two__single-shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-1.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">PERSONAL</span>
                                            <h2 className="pricing-two__price">$5.60</h2>
                                            <p className="pricing-two__text">Will get free 3 months solutions<br /> support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-2">
                                            <div className="pricing-two__single-shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-2.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">Premium</span>
                                            <h2 className="pricing-two__price">$25.60</h2>
                                            <p className="pricing-two__text">Will get free 5 months solutions support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Basic & Technical SEO </p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                            <p className="pricing-two__unlimited-offer"> ⚡ Unlimited Offer</p>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-3">
                                            <div className="pricing-two__single-shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-1.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">Business</span>
                                            <h2 className="pricing-two__price">$120.60</h2>
                                            <p className="pricing-two__text">Will get free lifetime solutions support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        )}
                        
                        {activeTab === "yearly" && (
                        <div className="tab active-tab">
                            <div className="pricing-two__inner">
                                <div className="row">
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-1">
                                            <div className="pricing-two__single-shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-1.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">PERSONAL</span>
                                            <h2 className="pricing-two__price">$15.60</h2>
                                            <p className="pricing-two__text">Will get free 3 months solutions<br /> support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-2">
                                            <div className="pricing-two__single-shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-2.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">Premium</span>
                                            <h2 className="pricing-two__price">$35.60</h2>
                                            <p className="pricing-two__text">Will get free 5 months solutions support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Basic & Technical SEO </p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                            <p className="pricing-two__unlimited-offer"> ⚡ Unlimited Offer</p>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-3">
                                            <div className="pricing-two__single-shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-1.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">Business</span>
                                            <h2 className="pricing-two__price">$150.60</h2>
                                            <p className="pricing-two__text">Will get free lifetime solutions support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        )}

                        {activeTab === "packges" && (
                        <div className="tab active-tab">
                            <div className="pricing-two__inner">
                                <div className="row">
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-1">
                                            <div className="pricing-two__single-shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-1.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">PERSONAL</span>
                                            <h2 className="pricing-two__price">$55.60</h2>
                                            <p className="pricing-two__text">Will get free 3 months solutions<br /> support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-2">
                                            <div className="pricing-two__single-shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-2.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">Premium</span>
                                            <h2 className="pricing-two__price">$125.60</h2>
                                            <p className="pricing-two__text">Will get free 5 months solutions support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Basic & Technical SEO </p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                            <p className="pricing-two__unlimited-offer"> ⚡ Unlimited Offer</p>
                                        </div>
                                    </div>
                                    
                                    <div className="col-xl-4 col-lg-6">
                                        <div className="pricing-two__single pricing-two__single-3">
                                            <div className="pricing-two__single-shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-single-shape-1.png" alt="Shape" width={335} height={336} priority />
                                            </div>
                                            <div className="pricing-two__shape-1">
                                                <Image src="/assets/images/shapes/pricing-two-shape-1.png" alt="Shape" width={138} height={20} priority />
                                            </div>
                                            <div className="pricing-two__shape-2">
                                                <Image src="/assets/images/shapes/pricing-two-shape-2.png" alt="Shape" width={97} height={65} priority />
                                            </div>
                                            <div className="pricing-two__shape-3">
                                                <Image src="/assets/images/shapes/pricing-two-shape-3.png" alt="Shape" width={60} height={109} priority />
                                            </div>
                                            <span className="pricing-two__sub-title">Business</span>
                                            <h2 className="pricing-two__price">$200.60</h2>
                                            <p className="pricing-two__text">Will get free lifetime solutions support
                                            </p>
                                            <div className="pricing-two__btn-box">
                                                <Link href="/pricing" className="pricing-two__btn">Choose Plan<span
                                                        className="far fa-plus-circle"></span></Link>
                                            </div>
                                            <h5 className="pricing-two__points-title">Feature Description</h5>
                                            <ul className="pricing-two__points list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Website Design</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>website Design & Development</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Social Media Graphics</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="far fa-plus-circle"></span>
                                                    </div>
                                                    <p>Brand Color Palette</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
