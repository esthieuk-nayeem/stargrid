"use client";
import CountUp from "react-countup";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function About() {
  return (
    <>
        <section className="about-two" id="about">
            <div className="about-two__shape-2"></div>
            <div className="about-two__shape-3">
                <Image src="/assets/images/shapes/about-two-shape-3.png" alt="Shape" width={560} height={583} priority />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-two__left">
                            <div className="about-two__img-box">
                                <div className="about-two__img">
                                    <Image src="/assets/images/resources/about-two-img-1.jpg" alt="Image" width={495} height={474} priority />
                                </div>
                                <div className="about-two__img-2">
                                    <Image src="/assets/images/resources/about-two-img-2.jpg" alt="Image" width={336} height={344} priority />
                                </div>
                                <div className="about-two__shape-1"></div>
                            </div>
                            <div className="about-two__client-box">
                                <ul className="about-two__client-img-list list-unstyled">
                                    <li>
                                        <div className="about-two__client-img">
                                            <Image src="/assets/images/resources/about-two-client-img-1-1.jpg" alt="Image" width={36} height={35} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="about-two__client-img">
                                            <Image src="/assets/images/resources/about-two-client-img-1-2.jpg" alt="Image" width={36} height={35} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="about-two__client-img">
                                            <Image src="/assets/images/resources/about-two-client-img-1-3.jpg" alt="Image" width={36} height={35} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="#"><span className="icon-plus"></span></Link>
                                    </li>
                                </ul>
                                <p className="about-two__client-text"><span className="odometer"><CountUp end={25} duration={2} /></span><span>+</span> Satisfied Client</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-two__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">The StarGrid Advantage</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Unlock Global Operations  
                                    <span>with Zero-Downtime</span><br /><span>Connectivity</span> 
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="about-two__text">Our intelligent hybrid solution combines high-bandwidth cellular (4G/5G) with global satellite coverage into a single managed service. Intelligent edge devices automatically select the optimal network, ensuring zero-touch, always-on connectivity.</p>
                            <div className="about-two__points-box">
                                <ul className="about-two__points-list list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>Guaranteed 99.5% <br /> Line Availability</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>Zero-Second Failover <br /> (SF Hotfailover)</p>
                                    </li>
                                </ul>
                                <ul className="about-two__points-list list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>Global LEO/GEO Satellite Backup</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p>24/7<br /> monitoring and expert<br /> support</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="about-two__experience-contact-and-btn">
                                <div className="about-two__experience-box">
                                    <div className="about-two__experience-count-box">
                                        <h3 className="odometer">
                                            <CountUp end={5} duration={2} />
                                        </h3>
                                        <span>+</span>
                                    </div>
                                    <p className="about-two__experience-text">Years of
                                        <br /> Experience</p>
                                </div>
                                <div className="about-two__call-box">
                                    <div className="about-two__call-icon">
                                        <span className="icon-customer-service-headset"></span>
                                    </div>
                                    <div className="about-two__call-content">
                                        <span>call us for inquiry</span>
                                        <p><Link href="tel:00123456767">+00 (123) 456767</Link></p>
                                    </div>
                                </div>
                                <div className="about-two__btn-box">
                                    <Link href="/about" className="thm-btn">Learn More<span
                                            className="icon-right-arrow"></span></Link>
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
