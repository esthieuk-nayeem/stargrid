
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import Image from "next/image";

export default function Choose() {
  return (
    <>
        <section className="why-choose-two">
            <div className="why-choose-two__shape-1 float-bob-y">
                <Image src="/assets/images/shapes/why-choose-two-shape-1.png" alt="Image" width={1022} height={751} priority />
            </div>
            <div className="why-choose-two__shape-2"></div>
            <div className="why-choose-two__shape-3"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="why-choose-two__left wow slideInLeft" data-wow-delay="100ms"
                            data-wow-duration="2500ms">
                            <div className="why-choose-two__img">
                                <Image src="/assets/images/resources/why-choose-two-img-1.png" alt="Image" width={570} height={596} priority />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="why-choose-two__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Why Chooses Us</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Elevate Growth with Our IT Solutions
                                    <span>for Success</span>
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="why-choose-one__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                            <ul className="list-unstyled why-choose-two__points">
                                <li>
                                    <div className="icon">
                                        <span className="icon-earning"></span>
                                    </div>
                                    <div className="content">
                                        <h4>Industry Experience</h4>
                                        <p>Innovating and empowering businesses with tailored solutions
                                            for success and growth. Innovating and empowering</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-customer-service-headset"></span>
                                    </div>
                                    <div className="content">
                                        <h4>24/7 Customer Support</h4>
                                        <p>Innovating and empowering businesses with tailored solutions
                                            for success and growth. Innovating and empowering</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-quality"></span>
                                    </div>
                                    <div className="content">
                                        <h4>Trust & Reliability</h4>
                                        <p>Innovating and empowering businesses with tailored solutions
                                            for success and growth. Innovating and empowering</p>
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
