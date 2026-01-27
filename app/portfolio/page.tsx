
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Image from "next/image";
import Link from "next/link";
export default function Portfolio_Page() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Portfolio">
            <section className="portfolio-page">
                <h2 className="portfolio-one__big-text">portfolio</h2>
                <div className="container">
                    <div className="section-title text-center sec-title-animation animation-style1">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-1"></div>
                            <span className="section-title__tagline">See Our Works</span>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <AnimatedTitle>
                        <h2 className="section-title__title title-animation">How We&apos;ve
                            <span>Empowered Businesses with</span> <br /> <span>Innovative</span> Tech Solutions</h2>
                        </AnimatedTitle>
                    </div>
                    <div className="portfolio-one__bottom">
                        <div className="container">
                            <div className="row">
                                
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="portfolio-one__single">
                                        <div className="portfolio-one__img-box">
                                            <div className="portfolio-one__img">
                                                <Image src="/assets/images/project/portfolio-1-1.jpg" alt="Image" width={460} height={350} priority />
                                                <div className="portfolio-one__tag">
                                                    <span>Web Development</span>
                                                    <span>Branding</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-one__content">
                                            <div className="portfolio-one__title-box">
                                                <h3 className="portfolio-one__title"><Link href="/portfolio-details">Innovative
                                                        Digital
                                                        Solutions for a Smarter Future</Link></h3>
                                                <p className="portfolio-one__text">Pioneering next-gen IT solutions that enhance
                                                    efficiency and innovation.</p>
                                            </div>
                                            <div className="portfolio-one__arrow">
                                                <Link href="assets/images/project/portfolio-1-1.jpg" className="img-popup"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="portfolio-one__year">
                                                <span>2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="portfolio-one__single">
                                        <div className="portfolio-one__img-box">
                                            <div className="portfolio-one__img">
                                                <Image src="/assets/images/project/portfolio-1-2.jpg" alt="Image" width={460} height={350} priority />
                                                <div className="portfolio-one__tag">
                                                    <span>UI/UX Design</span>
                                                    <span>Product Design</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-one__content">
                                            <div className="portfolio-one__title-box">
                                                <h3 className="portfolio-one__title"><Link href="/portfolio-details">Empowering
                                                        Businesses with Cutting-Edge Technology</Link></h3>
                                                <p className="portfolio-one__text">Delivering smart, scalable, and future-proof
                                                    tech
                                                    solutions for growth.</p>
                                            </div>
                                            <div className="portfolio-one__arrow">
                                                <Link href="assets/images/project/portfolio-1-2.jpg" className="img-popup"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="portfolio-one__year">
                                                <span>2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="portfolio-one__single">
                                        <div className="portfolio-one__img-box">
                                            <div className="portfolio-one__img">
                                                <Image src="/assets/images/project/portfolio-1-3.jpg" alt="Image" width={460} height={350} priority />
                                                <div className="portfolio-one__tag">
                                                    <span>UI/UX Design</span>
                                                    <span>Cyber Security</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-one__content">
                                            <div className="portfolio-one__title-box">
                                                <h3 className="portfolio-one__title"><Link
                                                        href="/portfolio-details">Transforming
                                                        Ideas
                                                        into Scalable IT Solutions</Link></h3>
                                                <p className="portfolio-one__text">Turning complex challenges into streamlined,
                                                    high-performance systems.</p>
                                            </div>
                                            <div className="portfolio-one__arrow">
                                                <Link href="assets/images/project/portfolio-1-3.jpg" className="img-popup"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="portfolio-one__year">
                                                <span>2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="portfolio-one__single">
                                        <div className="portfolio-one__img-box">
                                            <div className="portfolio-one__img">
                                                <Image src="/assets/images/project/portfolio-1-4.jpg" alt="Image" width={460} height={350} priority />
                                                <div className="portfolio-one__tag">
                                                    <span>Branding</span>
                                                    <span>Product Design</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-one__content">
                                            <div className="portfolio-one__title-box">
                                                <h3 className="portfolio-one__title"><Link href="/portfolio-details">Driving
                                                        Digital
                                                        Excellence with Custom IT Services</Link></h3>
                                                <p className="portfolio-one__text">Tailor-made IT solutions designed to optimize
                                                    and
                                                    elevate your business.</p>
                                            </div>
                                            <div className="portfolio-one__arrow">
                                                <Link href="assets/images/project/portfolio-1-4.jpg" className="img-popup"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="portfolio-one__year">
                                                <span>2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="portfolio-one__single">
                                        <div className="portfolio-one__img-box">
                                            <div className="portfolio-one__img">
                                                <Image src="/assets/images/project/portfolio-1-5.jpg" alt="Image" width={460} height={350} priority />
                                                <div className="portfolio-one__tag">
                                                    <span>UI/UX Design</span>
                                                    <span>Product Design</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-one__content">
                                            <div className="portfolio-one__title-box">
                                                <h3 className="portfolio-one__title"><Link href="/portfolio-details">Seamless
                                                        Tech
                                                        Innovations for Business Growth</Link></h3>
                                                <p className="portfolio-one__text">Bridging the gap between technology and
                                                    success
                                                    with
                                                    seamless integration.</p>
                                            </div>
                                            <div className="portfolio-one__arrow">
                                                <Link href="assets/images/project/portfolio-1-5.jpg" className="img-popup"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="portfolio-one__year">
                                                <span>2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4 col-lg-6 col-md-6">
                                    <div className="portfolio-one__single">
                                        <div className="portfolio-one__img-box">
                                            <div className="portfolio-one__img">
                                                <Image src="/assets/images/project/portfolio-1-6.jpg" alt="Image" width={460} height={350} priority />
                                                <div className="portfolio-one__tag">
                                                    <span>UI/UX Design</span>
                                                    <span>Product Design</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="portfolio-one__content">
                                            <div className="portfolio-one__title-box">
                                                <h3 className="portfolio-one__title"><Link
                                                        href="/portfolio-details">Future-Ready
                                                        IT
                                                        Solutions for Every Industry</Link></h3>
                                                <p className="portfolio-one__text">Adaptive and robust IT services built to
                                                    thrive
                                                    in a
                                                    dynamic landscape.</p>
                                            </div>
                                            <div className="portfolio-one__arrow">
                                                <Link href="assets/images/project/portfolio-1-6.jpg" className="img-popup"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                            <div className="portfolio-one__year">
                                                <span>2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="blog-page__pagination">
                                    <ul className="pg-pagination list-unstyled">
                                        <li className="prev">
                                            <Link href="#" aria-label="prev"><span className="icon-left-arrow-1"></span></Link>
                                        </li>
                                        <li className="count active"><Link href="#">01</Link></li>
                                        <li className="count"><Link href="#">02</Link></li>
                                        <li className="count"><Link href="#">...</Link></li>
                                        <li className="count"><Link href="#">10</Link></li>
                                        <li className="next">
                                            <Link href="#" aria-label="Next"><span className="icon-left-arrow-1"></span></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
