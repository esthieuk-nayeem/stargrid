
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import FaqPage from "@/components/sections/InnerSection/FaqPage";
export default function Faq_Page() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="FAQ&apos;s">
            <FaqPage/>
            
            <section className="cta-two">
                <div className="cta-two__bg-color">
                    <div className="cta-two__shape-1 img-bounce">
                        <Image src="/assets/images/shapes/cta-two-shape-1.png" alt="Shape" width={174} height={392} priority />
                    </div>
                    <div className="cta-two__shape-2 float-bob-y">
                        <Image src="/assets/images/shapes/cta-two-shape-2.png" alt="Shape" width={207} height={393} priority />
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-7">
                            <div className="cta-two__left">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-1"></div>
                                        <span className="section-title__tagline">Get In Touch</span>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <h2 className="section-title__title title-animation">If you have any questions,<br /> please
                                        contact us.
                                    </h2>
                                </div>
                                <div className="cta-two__btn-box">
                                    <Link href="/contact" className="thm-btn">Get in Touch<span
                                            className="icon-right-arrow"></span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5">
                            <div className="cta-two__right wow slideInRight" data-wow-delay="100ms" data-wow-duration="2500ms">
                                <h3 className="cta-two__title">Quick Support </h3>
                                <p className="cta-two__text">Get Instant and Reliable Support Anytime, Anywhere with Ease</p>
                                <ul className="cta-two__list list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-mail"></span>
                                        </div>
                                        <div className="content">
                                            <h4>Email Us</h4>
                                            <p><Link href="mailto:info@domain.com">info@domain.com</Link></p>
                                            <p><Link href="mailto:support@domain.com">support@domain.com</Link></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-phone-call"></span>
                                        </div>
                                        <div className="content">
                                            <h4>Contact</h4>
                                            <p>Tel: <Link href="tel:1200456789000">+12 (00) 456 7890 00</Link></p>
                                            <p>Mob: <Link href="tel:9900567780">+99 (00) 567 780</Link></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
