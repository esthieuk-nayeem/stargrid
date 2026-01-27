
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function About() {
  return (
    <>
        <section className="about-three" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="about-three__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                            <div className="about-three__img-box">
                                <div className="about-three__img">
                                    <Image src="/assets/images/resources/about-three-img-1.png" alt="Image" width={570} height={570} priority />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="about-three__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">About Us</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Any IT Problem Solutions And
                                    <span>Grow Your Business</span>
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="about-three__text">Transform your business with our innovative IT solutions,
                                tailored
                                to address your unique challenges and drive growth.</p>
                            <div className="about-three__progress-box">
                                <div className="progress-box">
                                    <div className="bar-title">Business Problem Solving</div>
                                    <div className="bar">
                                        <div className="bar-inner count-bar" style={{ width: '70%' }}>
                                            <div className="count-box">
                                                <span className="count-text" data-stop="70" data-speed="1500">70</span>%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress-box">
                                    <div className="bar-title">Camping Launches</div>
                                    <div className="bar">
                                        <div className="bar-inner count-bar" style={{ width: '80%' }}>
                                            <div className="count-box">
                                                <span className="count-text" data-stop="80" data-speed="1500">80</span>%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="about-three__points list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-tick-inside-circle"></span>
                                    </div>
                                    <div className="content">
                                        <h3>Shaping Tomorrow, Transforming Today</h3>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-tick-inside-circle"></span>
                                    </div>
                                    <div className="content">
                                        <h3>Innovating Today, Empowering Tomorrow</h3>
                                    </div>
                                </li>
                            </ul>
                            <div className="about-three__btn-and-call-box">
                                <div className="about-three__btn-box">
                                    <Link href="/about" className="thm-btn">Get in Touch<span
                                            className="icon-right-arrow"></span></Link>
                                </div>
                                <div className="about-three__call-box">
                                    <div className="icon">
                                        <span className="icon-customer-service-headset"></span>
                                    </div>
                                    <div className="content">
                                        <span>Call Any Time</span>
                                        <p><Link href="tel:12345678900">(123) 4567 8900</Link></p>
                                    </div>
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
