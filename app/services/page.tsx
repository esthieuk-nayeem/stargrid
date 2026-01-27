import Image from "next/image";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Services from "@/components/sections/home1/Services";
import Contact from "@/components/sections/home2/Contact";
import Process from "@/components/sections/home2/Process";
import Pricing from "@/components/sections/home1/Pricing";
;
export default function ServicePage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Services">
            <Services/>
            <section className="services-four">
                <div className="services-four__bg-shape float-bob-y"
                    style={{ backgroundImage: "url(/assets/images/shapes/services-four-bg-shape.png)" }}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="services-four__left wow slideInLeft" data-wow-delay="100ms"
                                data-wow-duration="2500ms">
                                <div className="services-four__img-box">
                                    <div className="services-four__img">
                                        <Image src="/assets/images/services/services-four-img-1.jpg" alt="Image" width={254} height={432} priority />
                                    </div>
                                    <div className="services-four__img-2">
                                        <Image src="/assets/images/services/services-four-img-2.jpg" alt="Image" width={254} height={432} priority />
                                        <div className="services-four__qualified-box">
                                            <div className="services-four__qualified-icon">
                                                 <Image src="/assets/images/icon/services-four-qualified-icon.png" alt="Image" width={50} height={51} priority />
                                            </div>
                                            <h3 className="services-four__qualified-title">Qualified services</h3>
                                            <p className="services-four__qualified-text">Transform your <br />business with
                                                our<br />
                                                innovative</p>
                                        </div>
                                    </div>
                                    <div className="services-four__shape-1">
                                        <Image src="/assets/images/shapes/services-four-shape-1.png" alt="Image" width={524} height={447} priority />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="services-four__right">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-1"></div>
                                        <span className="section-title__tagline">Services Features</span>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <h2 className="section-title__title title-animation">Supercharge<span>Your Business
                                        </span><br /><span>Growth with Our </span>Cutting-Edge IT Solutions
                                    </h2>
                                </div>
                                <p className="services-four__text">Transform your business with our innovative IT solutions,
                                    tailored to address your unique challenges and drive growth in today&apos;s digital
                                    landscape.</p>
                                <ul className="services-four__points-box list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-technical-support"></span>
                                        </div>
                                        <div className="content">
                                            <h4>Innovative IT Solutions</h4>
                                            <p>Stay ahead with cutting-edge technology tailored to your business needs.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-real-estate-agency"></span>
                                        </div>
                                        <div className="content">
                                            <h4>Innovative IT Solutions</h4>
                                            <p>Stay ahead with cutting-edge technology tailored to your business needs.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Contact/>
            <Process/>
            <Pricing/>
            <Newsletter/>
        </Layout>
    )
}
