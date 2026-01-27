"use client";

import { useState } from "react";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
export default function FaqPage() {

    const [activeIndex, setActiveIndex] = useState<number | null>(1);
    
    const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <section className="faq-two faq-page">
                <div className="container">
                    <div className="section-title text-center sec-title-animation animation-style1">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-1"></div>
                            <span className="section-title__tagline">FAQS</span>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <AnimatedTitle>
                        <h2 className="section-title__title title-animation">Get answers to the most common<br /> questions about
                            our products, services,<br /> and policies.
                        </h2>
                        </AnimatedTitle>
                    </div>
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

                            <div
                                className={`accrodion ${activeIndex === 4 ? "active" : ""}`}
                                >
                                <div
                                    className="accrodion-title"
                                    onClick={() => toggleAccordion(4)}
                                >
                                    <h4>What IT services do you provide?</h4>
                                </div>
                                <div
                                    className="accrodion-content"
                                    style={{
                                    maxHeight: activeIndex === 4 ? "500px" : "0px",
                                    overflow: "hidden",
                                    opacity: activeIndex === 4 ? 1 : 0,
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
                                className={`accrodion ${activeIndex === 5 ? "active" : ""}`}
                                >
                                <div
                                    className="accrodion-title"
                                    onClick={() => toggleAccordion(5)}
                                >
                                    <h4>How do I get started with your IT solutions?</h4>
                                </div>
                                <div
                                    className="accrodion-content"
                                    style={{
                                    maxHeight: activeIndex === 5 ? "500px" : "0px",
                                    overflow: "hidden",
                                    opacity: activeIndex === 5 ? 1 : 0,
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
            </section>
        </>
    )
}
