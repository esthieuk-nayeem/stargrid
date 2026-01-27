import Image from "next/image";
import Layout from "@/components/layout/Layout";
import About from "@/components/sections/InnerSection/About";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import Counter from "@/components/sections/home1/Counter";
import Team from "@/components/sections/InnerSection/Team";
import Process from "@/components/sections/home2/Process";
import Testimonial from "@/components/sections/home3/Testimonial";
import Newsletter from "@/components/sections/home1/Newsletter";
export default function About_Page() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="About Us">
            <About/>

            <section className="why-choose-three">
                <div className="why-choose-three__bg-shape float-bob-x"
                    style={{ backgroundImage: "url(/assets/images/shapes/why-choose-three-bg-shape.png)" }}></div>
                <div className="why-choose-three__shape-1"></div>
                <div className="why-choose-three__shape-2"></div>
                <div className="container">
                    <div className="section-title text-center sec-title-animation animation-style1">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-1"></div>
                            <span className="section-title__tagline">Why Choose Us</span>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <AnimatedTitle>
                        <h2 className="section-title__title title-animation">Your Business with <span>Reliable &
                            </span><br /><span>Future-Ready</span>
                            IT Solutions</h2>
                        </AnimatedTitle>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 wow fadeInLeft" data-wow-delay="100ms">
                            <div className="why-choose-three__single-left">
                                <div className="why-choose-three__single">
                                    <div className="why-choose-three__icon">
                                        <span className="icon-quality"></span>
                                    </div>
                                    <h3 className="why-choose-three__title"> Unmatched Quality</h3>
                                    <div className="why-choose-three__bdr"></div>
                                    <p className="why-choose-three__text">We deliver exceptional products and services that
                                        exceed
                                        expectations every time.</p>
                                </div>
                                <div className="why-choose-three__single">
                                    <div className="why-choose-three__icon">
                                        <span className="icon-team"></span>
                                    </div>
                                    <h3 className="why-choose-three__title">Trusted Expertise</h3>
                                    <div className="why-choose-three__bdr"></div>
                                    <p className="why-choose-three__text">Backed by years of experience and a proven track
                                        record,
                                        we
                                        are your reliable partner for success.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 wow fadeInUp" data-wow-delay="200ms">
                            <div className="why-choose-three__img">
                                <Image src="/assets/images/resources/why-choose-three-img.jpg" alt="Image" width={475} height={555} priority />
                            </div>
                        </div>
                        <div className="col-xl-3 wow fadeInRight" data-wow-delay="100ms">
                            <div className="why-choose-three__single-left">
                                <div className="why-choose-three__single">
                                    <div className="why-choose-three__icon">
                                        <span className="icon-customer-centricity"></span>
                                    </div>
                                    <h3 className="why-choose-three__title"> User-Centric Approach</h3>
                                    <div className="why-choose-three__bdr"></div>
                                    <p className="why-choose-three__text">Your satisfaction is our priority, and we tailor
                                        solutions to meet your unique needs. Your happiness comes first.</p>
                                </div>
                                <div className="why-choose-three__single">
                                    <div className="why-choose-three__icon">
                                        <span className="icon-support"></span>
                                    </div>
                                    <h3 className="why-choose-three__title">Trusted by Many</h3>
                                    <div className="why-choose-three__bdr"></div>
                                    <p className="why-choose-three__text">We have built a strong reputation over the years by
                                        consistently delivering excellent results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Counter/>
            <Team/>
            <Process/>
            <Testimonial/>
            <Newsletter/>
        </Layout>
    )
}
