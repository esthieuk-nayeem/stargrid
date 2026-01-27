
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Choose() {
  return (
    <>
        <section className="why-choose-one">
            <div className="why-choose-one__shape-3 float-bob-y">
                <Image src="/assets/images/shapes/why-choose-one-shape-3.png" alt="Shape" width={1022} height={751} priority />
            </div>
            <div className="why-choose-one__shape-4"></div>
            <div className="why-choose-one__shape-5"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="why-choose-one__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Why Chooses Us</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                    <h2 className="section-title__title title-animation">Elevate Growth <span>with
                                        Our</span><br /><span>Cutting-Edge IT</span>
                                    Solutions<br /> for Success
                                    </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="why-choose-one__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering </p>
                            <ul className="why-choose-one__progress-list list-unstyled">
                                <li>
                                    <div className="why-choose-one__progress">
                                        <h4 className="why-choose-one__progress-title">Camping Launches</h4>
                                        <div className="bar">
                                            <div className="bar-inner count-bar" style={{ width: '86%' }}>
                                                <div className="count-text">86%</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="why-choose-one__progress">
                                        <h4 className="why-choose-one__progress-title">Innovation Design</h4>
                                        <div className="bar">
                                            <div className="bar-inner count-bar" style={{ width: '76%' }}>
                                                <div className="count-text">76%</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="why-choose-one__btn-and-client-info">
                                <div className="why-choose-one__btn-box">
                                    <Link href="/about" className="thm-btn">About Us<span
                                            className="icon-right-arrow"></span></Link>
                                </div>
                                <div className="why-choose-one__client-box">
                                    <div className="why-choose-one__client-img">
                                        <Image src="/assets/images/resources/why-choose-one-client-img.jpg" alt="Image" width={42} height={42} priority />
                                    </div>
                                    <div className="why-choose-one__client-content">
                                        <h3>Thomas Alison</h3>
                                        <span>Founder & CEO</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="why-choose-one__right wow slideInRight" data-wow-duration="1.2s" data-wow-delay="0.4s">
                            <div className="why-choose-one__img">
                                <Image src="/assets/images/resources/why-choose-one-img-1.png" alt="Image" width={670} height={610} priority />
                            </div>
                            <div className="why-choose-one__shape-1 img-bounce">
                                <Image src="/assets/images/shapes/why-choose-one-shape-1.png" alt="Image" width={80} height={80} priority />
                            </div>
                            <div className="why-choose-one__shape-2 float-bob-x">
                                <Image src="/assets/images/shapes/why-choose-one-shape-2.png" alt="Image" width={142} height={46} priority />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
