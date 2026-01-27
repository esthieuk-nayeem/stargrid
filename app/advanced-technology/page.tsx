import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import ServiceFaq from "@/components/sections/InnerSection/Faq";
import Testimonial from "@/components/sections/home1/Testimonial";
;
export default function AdvancedTechnology() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Advanced Technology">
            <section className="services-details">
                <div className="services-details__shape-1"></div>
                <div className="services-details__shape-2">
                    <Image src="/assets/images/shapes/services-details-shape-2.png" alt="Image" width={1920} height={1332} priority />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="services-details__left">
                                <div className="services-details__services-list-box">
                                    <h3 className="services-details__services-list-title">More Services</h3>
                                    <ul className="services-details__services-list list-unstyled">
                                        <li>
                                            <Link href="/threat-detection-prevention">Threat Detection & Prevention<span
                                                    className="icon-right-arrow-2"></span></Link>
                                        </li>
                                        <li>
                                            <Link href="/endpoint-device-security">Endpoint & Device Security<span
                                                    className="icon-right-arrow-2"></span></Link>
                                        </li>
                                        <li>
                                            <Link href="/data-protection-privacy">Data Protection & Privacy<span
                                                    className="icon-right-arrow-2"></span></Link>
                                        </li>
                                        <li>
                                            <Link href="/backup-recovery">Backup & Recovery<span
                                                    className="icon-right-arrow-2"></span></Link>
                                        </li>
                                        <li className="active">
                                            <Link href="/advanced-technology">Advanced Technology<span
                                                    className="icon-right-arrow-2"></span></Link>
                                        </li>
                                        <li>
                                            <Link href="/cloud-managed-services">Cloud managed services<span
                                                    className="icon-right-arrow-2"></span></Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="services-details__need-help">
                                    <div className="services-details__need-help-img">
                                        <Image src="/assets/images/services/services-details-need-help-img.jpg" alt="Image" width={356} height={450} priority />
                                        <div className="services-details__need-help-content">
                                            <div className="services-details__need-help-bdr"></div>
                                            <h3 className="services-details__need-help-title">Need Help?</h3>
                                            <p className="services-details__need-help-number"><Link href="tel:1200345789034">+12
                                                    00 345 789034</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="services-details__right">
                                <h3 className="services-details__title-1">Innovative Strategies for Online Branding and Content
                                    Marketing</h3>
                                <div className="services-details__bdr"></div>
                                <p className="services-details__text-1">This approach encompasses online branding, content
                                    marketing, and SEO, offering customized solutions to drive impactful results and
                                    long-term success in the digital landscape.</p>
                                <p className="services-details__text-2"> A full suite of services designed to enhance online
                                    campaigns, boost audience engagement, and implement creative strategies tailored to meet
                                    the unique needs of your brand.</p>
                                <div className="services-details__img-1">
                                    <Image src="/assets/images/services/services-details-img-6.jpg" alt="Image" width={850} height={400} priority />
                                </div>
                                <h4 className="services-details__title-2">Services Core Features</h4>
                                <p className="services-details__text-3">Tailored marketing strategies aligned with your business
                                    goals. Competitor analysis and market research for actionable insights. Roadmaps for
                                    short-term campaigns and long-term growth. content creation and scheduling for maximum
                                    engagement. Community management to interact with your audience.</p>
                                <div className="services-details__points-box">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <ul className="services-details__points-list list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>On-page and off-page optimization for better search rankings.</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Targeted ad campaigns on platforms like Google Ads, Facebook, and
                                                        Instagram</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Development of a unique tone of voice for your brand. Brand Identity
                                                        Creation</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-6">
                                            <ul
                                                className="services-details__points-list services-details__points-list--two list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Regular performance audits to stay ahead of competitors.</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Detailed reports on campaign performance and user engagement.</p>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Insights-driven recommendations for continuous improvement.</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="services-details__img-box">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="services-details__img-box-img">
                                                <Image src="/assets/images/services/services-details-img-box-img-1.jpg" alt="Image" width={409} height={340} priority />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="services-details__img-box-img">
                                                <Image src="/assets/images/services/services-details-img-box-img-2.jpg" alt="Image" width={409} height={340} priority />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="services-details__title-3">Your Partner in Digital Success</h4>
                                <p className="services-details__text-4">Our services go beyond traditional marketing—offering
                                    innovative, data-driven, and tailored strategies to help your business thrive in the
                                    digital landscape. With a team of experts committed to creativity, precision, and
                                    measurable results, we deliver solutions that elevate your brand, engage your audience
                                </p>
                                <div className="services-details__points-box-2">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <ul className="services-details__points-two list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-idea"></span>
                                                    </div>
                                                    <div className="content">
                                                        <h5>Tailored Strategies</h5>
                                                        <p>Customized marketing plans designed specifically for your
                                                            business goals and target audience.</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-strategy"></span>
                                                    </div>
                                                    <div className="content">
                                                        <h5>End-to-End Solutions</h5>
                                                        <p>From brand identity to advertising and content creation, we cover
                                                            all aspects of digital marketing.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-xl-6">
                                            <ul
                                                className="services-details__points-two services-details__points-two--two list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-target"></span>
                                                    </div>
                                                    <div className="content">
                                                        <h5>Data-Driven Decisions</h5>
                                                        <p>Comprehensive analytics and insights to optimize campaigns and
                                                            ensure measurable results.</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-transparency"></span>
                                                    </div>
                                                    <div className="content">
                                                        <h5>Transparent Reporting</h5>
                                                        <p>Regular performance updates and easy-to-understand reports to
                                                            keep you informed every step of the way.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="services-details__bottom-img">
                                    <Image src="/assets/images/services/services-details-bottom-img.jpg" alt="Image" width={165} height={175} priority />
                                </div>
                                <h4 className="services-details__title-4">Get Started</h4>
                                <p className="services-details__text-5">Bring your vision to life with our tailored solutions,
                                    creative strategies, and professional support. Whether you&apos;re launching a new brand,
                                    enhancing your online presence, or driving growth, we provide the tools, expertise, and
                                    guidance you need to achieve success. Let&apos;s turn your ideas into reality today!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ServiceFaq/>
            <Testimonial/>
            <Newsletter/>
        </Layout>
    )
}
