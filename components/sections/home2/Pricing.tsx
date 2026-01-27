
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Pricing() {
  return (
    <>
        <section className="pricing-one">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <div className="section-title__tagline-box">
                        <div className="section-title__tagline-shape-1"></div>
                        <span className="section-title__tagline">Pricing & Plan</span>
                        <div className="section-title__tagline-shape-2"></div>
                    </div>
                    <AnimatedTitle>
                    <h2 className="section-title__title title-animation">How We&apos;ve
                        <span> Empowered Businesses</span><br /><span>with Innovative</span> Tech Solutions
                    </h2>
                    </AnimatedTitle>
                </div>
                <div className="row">
                    
                    <div className="col-xl-4 col-lg-6 wow fadeInLeft" data-wow-delay="100ms">
                        <div className="pricing-one__single">
                            <div className="pricing-one__icon">
                                <Image src="/assets/images/icon/pricing-icon-1.png" alt="Image" width={51} height={51} priority />
                            </div>
                            <span className="pricing-one__sub-title">PERSONAL</span>
                            <h2 className="pricing-one__price">$5.60</h2>
                            <p className="pricing-one__text">*free 3 months solutions<br /> support*</p>
                            <div className="pricing-one__bdr"></div>
                            <h5 className="pricing-one__points-title">Feature Description</h5>
                            <ul className="pricing-one__points list-unstyled">
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
                                    <p>Priority Bug Fixes & Updates</p>
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
                                    <p>System Integration Support</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="far fa-plus-circle"></span>
                                    </div>
                                    <p>24/7 Dedicated IT Assistance</p>
                                </li>
                            </ul>
                            <div className="pricing-one__btn-box">
                                <Link href="/pricing" className="pricing-one__btn">Choose Plan<span
                                        className="far fa-plus-circle"></span></Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-4 col-lg-6 wow fadeInUp" data-wow-delay="200ms">
                        <div className="pricing-one__single active">
                            <div className="pricing-one__icon">
                                <Image src="/assets/images/icon/pricing-icon-1.png" alt="Image" width={51} height={51} priority />
                            </div>
                            <span className="pricing-one__sub-title">ENTERPRISE</span>
                            <h2 className="pricing-one__price">$25.60</h2>
                            <p className="pricing-one__text">*free 6 months solutions<br /> support*</p>
                            <div className="pricing-one__bdr"></div>
                            <h5 className="pricing-one__points-title">Feature Description</h5>
                            <ul className="pricing-one__points list-unstyled">
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
                                    <p>Priority Bug Fixes & Updates</p>
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
                                    <p>System Integration Support</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="far fa-plus-circle"></span>
                                    </div>
                                    <p>24/7 Dedicated IT Assistance</p>
                                </li>
                            </ul>
                            <div className="pricing-one__btn-box">
                                <Link href="/pricing" className="pricing-one__btn">Choose Plan<span
                                        className="far fa-plus-circle"></span></Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-4 col-lg-6 wow fadeInRight" data-wow-delay="300ms">
                        <div className="pricing-one__single">
                            <div className="pricing-one__icon">
                                <Image src="/assets/images/icon/pricing-icon-1.png" alt="Image" width={51} height={51} priority />
                            </div>
                            <span className="pricing-one__sub-title">Premium</span>
                            <h2 className="pricing-one__price">$120.60</h2>
                            <p className="pricing-one__text">*free 12 months solutions<br /> support*</p>
                            <div className="pricing-one__bdr"></div>
                            <h5 className="pricing-one__points-title">Feature Description</h5>
                            <ul className="pricing-one__points list-unstyled">
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
                                    <p>Priority Bug Fixes & Updates</p>
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
                                    <p>System Integration Support</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="far fa-plus-circle"></span>
                                    </div>
                                    <p>24/7 Dedicated IT Assistance</p>
                                </li>
                            </ul>
                            <div className="pricing-one__btn-box">
                                <Link href="/pricing" className="pricing-one__btn">Choose Plan<span
                                        className="far fa-plus-circle"></span></Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}
