
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function About() {
  return (
    <>
        <section className="about-one" id="about">
            <div className="about-one__shape-1"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="about-one__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">About Us</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Boost Business
                                    <span>with Our<br /></span><span> Innovative IT
                                        Solutions</span> for<br /> Success story</h2>
                                </AnimatedTitle>
                            </div>
                            <p className="about-one__text">Innovating and empowering businesses with tailored solutions for
                                success and growth. </p>
                            <ul className="about-one__points list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-tick-inside-circle"></span>
                                    </div>
                                    <div className="content">
                                        <h3>Shaping Tomorrow, Transforming Today</h3>
                                        <p>Empowering businesses to create meaningful change, driving innovation </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-tick-inside-circle"></span>
                                    </div>
                                    <div className="content">
                                        <h3>Innovating Today, Empowering Tomorrow</h3>
                                        <p>Partner with us to unlock new possibilities, drive progress, and shape a
                                            future filled with success</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="about-one__btn-and-call-box">
                                <div className="about-one__btn-box">
                                    <Link href="/about" className="thm-btn">Get in Touch<span
                                            className="icon-right-arrow"></span></Link>
                                </div>
                                <div className="about-one__call-box">
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
                    <div className="col-xl-7">
                        <div className="about-one__right">
                            <div className="about-one__left-img-box">
                                <div className="about-one__left-img">
                                    <Image src="/assets/images/resources/about-one-img-1.jpg" alt="Image" width={670} height={600} priority />
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
