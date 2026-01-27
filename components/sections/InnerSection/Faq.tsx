"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function ServiceFaq() {

    const [activeIndex, setActiveIndex] = useState<number | null>(1);
    
    const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-two">
            <div className="faq-two__shape-1">
                <Image src="/assets/images/shapes/faq-two-shape-1.png" alt="Shape" width={886} height={924} priority />
            </div>
            <div className="faq-two__shape-2">
                <Image src="/assets/images/shapes/faq-two-shape-2.png" alt="Shape" width={993} height={924} priority />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="faq-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">FAQS</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Frequently Asked <br />
                                    <span>Questions</span>
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="faq-two__text">Get answers to the most common questions <br />about our products,
                                services, and policies.</p>
                            <div className="faq-two__bdr"></div>
                            <div className="faq-two__contact">
                                <div className="icon">
                                    <span className="icon-customer-service-headset"></span>
                                </div>
                                <div className="content">
                                    <span>Get Support</span>
                                    <p><Link href="tel:9900567780">99 (00) 567 780</Link></p>
                                </div>
                            </div>
                            <div className="faq-two__btn-box">
                                <Link href="#" className="thm-btn">Get in Touch<span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="faq-two__right">
                            <div className="accrodion-grp faq-one-accrodion" data-grp-name="faq-one-accrodion">
                                <div
                                    className={`accrodion ${activeIndex === 0 ? "active" : ""}`}
                                    >
                                    <div
                                        className="accrodion-title"
                                        onClick={() => toggleAccordion(0)}
                                    >
                                        <h4>What services does your IT consultancy agency provide?</h4>
                                    </div>
                                    <div
                                        className="accrodion-content"
                                        style={{
                                        maxHeight: activeIndex === 0 ? "500px" : "0px",
                                        overflow: "hidden",
                                        opacity: activeIndex === 0 ? 1 : 0,
                                        }}
                                    >
                                        <div className="inner">
                                            <p className="accrodion-content__text-1">We offer a wide range of IT consulting
                                                services, including software
                                                development, cloud computing solutions, cybersecurity, IT infrastructure
                                                management, and digital transformation strategies tailored to your
                                                business needs.</p>
                                            <p className="accrodion-content__text-2">Our IT consulting services help
                                                businesses improve efficiency, enhance
                                                security, reduce operational costs, and stay ahead of technology trends.
                                                We provide expert guidance to optimize your IT infrastructure and
                                                implement innovative solutions.</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`accrodion ${activeIndex === 1 ? "active" : ""}`}
                                    >
                                    <div
                                        className="accrodion-title"
                                        onClick={() => toggleAccordion(1)}
                                    >
                                        <h4>How can IT consulting benefit my business?</h4>
                                    </div>
                                    <div
                                        className="accrodion-content"
                                        style={{
                                        maxHeight: activeIndex === 1 ? "500px" : "0px",
                                        overflow: "hidden",
                                        opacity: activeIndex === 1 ? 1 : 0,
                                        }}
                                    >
                                        <div className="inner">
                                            <p className="accrodion-content__text-1">We offer a wide range of IT consulting
                                                services, including software
                                                development, cloud computing solutions, cybersecurity, IT infrastructure
                                                management, and digital transformation strategies tailored to your
                                                business needs.</p>
                                            <p className="accrodion-content__text-2">Our IT consulting services help
                                                businesses improve efficiency, enhance
                                                security, reduce operational costs, and stay ahead of technology trends.
                                                We provide expert guidance to optimize your IT infrastructure and
                                                implement innovative solutions.</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`accrodion ${activeIndex === 2 ? "active" : ""}`}
                                    >
                                    <div
                                        className="accrodion-title"
                                        onClick={() => toggleAccordion(2)}
                                    >
                                        <h4>Do you offer customized IT solutions?</h4>
                                    </div>
                                    <div
                                        className="accrodion-content"
                                        style={{
                                        maxHeight: activeIndex === 2 ? "500px" : "0px",
                                        overflow: "hidden",
                                        opacity: activeIndex === 2 ? 1 : 0,
                                        }}
                                    >
                                        <div className="inner">
                                            <p className="accrodion-content__text-1">We offer a wide range of IT consulting
                                                services, including software
                                                development, cloud computing solutions, cybersecurity, IT infrastructure
                                                management, and digital transformation strategies tailored to your
                                                business needs.</p>
                                            <p className="accrodion-content__text-2">Our IT consulting services help
                                                businesses improve efficiency, enhance
                                                security, reduce operational costs, and stay ahead of technology trends.
                                                We provide expert guidance to optimize your IT infrastructure and
                                                implement innovative solutions.</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`accrodion ${activeIndex === 3 ? "active" : ""}`}
                                    >
                                    <div
                                        className="accrodion-title"
                                        onClick={() => toggleAccordion(3)}
                                    >
                                        <h4>How do you ensure data security and compliance?</h4>
                                    </div>
                                    <div
                                        className="accrodion-content"
                                        style={{
                                        maxHeight: activeIndex === 3 ? "500px" : "0px",
                                        overflow: "hidden",
                                        opacity: activeIndex === 3 ? 1 : 0,
                                        }}
                                    >
                                        <div className="inner">
                                            <p className="accrodion-content__text-1">We offer a wide range of IT consulting
                                                services, including software
                                                development, cloud computing solutions, cybersecurity, IT infrastructure
                                                management, and digital transformation strategies tailored to your
                                                business needs.</p>
                                            <p className="accrodion-content__text-2">Our IT consulting services help
                                                businesses improve efficiency, enhance
                                                security, reduce operational costs, and stay ahead of technology trends.
                                                We provide expert guidance to optimize your IT infrastructure and
                                                implement innovative solutions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
