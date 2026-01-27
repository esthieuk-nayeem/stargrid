"use client";
import CountUp from "react-countup";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function About() {
  return (
    <>
        <section className="about-four">
            <div className="about-four__bg-shape"
                style={{ backgroundImage: "url(/assets/images/shapes/about-four-bg-shape.png)" }}></div>
            <div className="about-four__bg-shape-2"
                style={{ backgroundImage: "url(/assets/images/shapes/about-four-bg-shape-2.png)" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-four__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                            <div className="about-four__img-box">
                                <div className="about-four__img">
                                    <Image src="/assets/images/resources/about-four-img-1.jpg" alt="Image" width={480} height={550} priority />
                                </div>
                                <div className="about-four__img-2">
                                    <Image src="/assets/images/resources/about-four-img-2.jpg" alt="Image" width={308} height={335} priority />
                                </div>
                                <div className="about-four__experience">
                                    <div className="about-four__experience-inner">
                                        <div className="about-four__experience-count-box">
                                            <h3 className="odometer"><CountUp end={25} duration={2} /></h3>
                                        </div>
                                        <p className="about-four__experience-count-text">Years of
                                            <br /> Experience</p>
                                    </div>
                                </div>
                            </div>
                            <div className="about-four__client-box">
                                <ul className="about-four__client-img-list list-unstyled">
                                    <li>
                                        <div className="about-four__client-img">
                                            <Image src="/assets/images/resources/about-four-client-img-1-1.jpg" alt="Image" width={41} height={40} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="about-four__client-img">
                                            <Image src="/assets/images/resources/about-four-client-img-1-2.jpg" alt="Image" width={41} height={40} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="about-four__client-img">
                                            <Image src="/assets/images/resources/about-four-client-img-1-3.jpg" alt="Image" width={41} height={40} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="#"><span className="icon-plus"></span></Link>
                                    </li>
                                </ul>
                                <p className="about-four__client-text"><span className="odometer"><CountUp end={120} duration={3} /></span><span>K</span> Satisfied Client</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-four__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">About Us</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Supercharge <span>Your
                                        Business</span><br /><span>Growth with Our</span>
                                    Cutting-Edge IT<br /> Solutions</h2>
                                </AnimatedTitle>
                            </div>
                            <p className="about-four__text">Transform your business with our innovative IT solutions,
                                tailored to address your unique challenges and drive growth in today&apos;s digital
                                landscape.</p>
                            <div className="about-four__points-box">
                                <ul className="about-four__points-list list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>Innovative IT Solutions Expert<br /> Support & Consulting</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>Cloud Solutions for Modern<br /> Enterprises</p>
                                    </li>
                                </ul>
                                <ul className="about-four__points-list about-four__points-list-2 list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>Seamless Digital<br /> Transformation AI-Driven <br />Business Automation</p>
                                    </li>
                                    <li>
                                        <div className="about-four__points-list-img">
                                            <Image src="/assets/images/resources/about-four-points-list-img.jpg" alt="Image" width={60} height={60} priority />
                                        </div>
                                        <div className="about-four__points-list-content">
                                            <h5>Thomas Alison</h5>
                                            <p>Founder & SEO</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul className="about-four__points-2 list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-technical-support"></span>
                                    </div>
                                    <div className="content">
                                        <h5>Innovative IT Solutions</h5>
                                        <p>Stay ahead with cutting-edge technology tailored to <br />your business needs.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-real-estate-agency"></span>
                                    </div>
                                    <div className="content">
                                        <h5>Cloud Solutions </h5>
                                        <p>Secure, scalable, and efficient cloud services to power<br /> your growth.
                                            Cloud Solutions for Modern Enterprises</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
