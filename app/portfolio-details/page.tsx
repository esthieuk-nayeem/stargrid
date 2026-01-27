
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Image from "next/image";
import Link from "next/link";
export default function Portfolio_Details() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Portfolios Details">
            <section className="portfolio-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="portfolio-details__top">
                                <div className="portfolio-details__title-and-social">
                                    <h3 className="portfolio-details__top-title">Future-Ready IT Solutions for<br /> Every
                                        Industry
                                    </h3>
                                    <div className="portfolio-details__social-box">
                                        <p>Share now</p>
                                        <div className="portfolio-details__social">
                                            <Link href="#"><span className="icon-facebook"></span></Link>
                                            <Link href="#"><span className="icon-dribble"></span></Link>

                                            <Link href="#"><span className="icon-linkedin"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-details__get-touch">
                                    <Link href="#">Get in touch<span className="icon-right-up"></span></Link>
                                    <div className="portfolio-details__get-touch-shape"></div>
                                </div>
                            </div>
                            <div className="portfolio-details__portfolio-list-inner">
                                <ul className="portfolio-details__portfolio-list list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-add-friend"></span>
                                        </div>
                                        <div className="content">
                                            <span>Clients</span>
                                            <p>Innovate Interiors<br /> group</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-earning"></span>
                                        </div>
                                        <div className="content">
                                            <span>Budget</span>
                                            <p>$10,000.00 USD </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-pin"></span>
                                        </div>
                                        <div className="content">
                                            <span>Locations</span>
                                            <p>1234 Innovation<br /> Street</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul
                                    className="portfolio-details__portfolio-list portfolio-details__portfolio-list-2 list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-real-estate-agency"></span>
                                        </div>
                                        <div className="content">
                                            <span>Industries</span>
                                            <p>real Estate Agency</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-calendar"></span>
                                        </div>
                                        <div className="content">
                                            <span>Projects End</span>
                                            <p>September 21, 2025 </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul className="portfolio-details__portfolio-page list-unstyled">
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <h4 className="portfolio-details__title-1">Project Overviews</h4>
                                        <p className="portfolio-details__text-1">In today&apos;s fast-evolving digital landscape,
                                            businesses need innovative and scalable IT solutions to stay ahead. Our project
                                            delivers cutting-edge technology tailored for various industries, ensuring
                                            seamless
                                            operations, enhanced security, and optimal performance. From cloud computing and
                                            AI-driven automation to cybersecurity and enterprise software, we provide
                                            future-proof solutions that empower businesses to thrive in a competitive world.
                                            Whether you&apos;re in healthcare, finance, retail, or manufacturing, our IT
                                            expertise
                                            helps you drive efficiency, innovation, and growth.</p>
                                        <div className="portfolio-details__img-1">
                                            <Image src="/assets/images/project/portfolio-details-img-1.jpg" alt="Image" width={1070} height={400} priority />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <h4 className="portfolio-details__title-2">Future-Ready IT Solutions for Every Industry
                                        </h4>
                                        <p className="portfolio-details__text-2">In an era where digital transformation is
                                            essential
                                            for business success, our project focuses on delivering scalable, secure, and
                                            cutting-edge IT solutions tailored to diverse industries. We help businesses
                                            harness
                                            the power of cloud computing, artificial intelligence (AI), automation,
                                            cybersecurity, and enterprise software to stay ahead of the competition. </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <div className="portfolio-details__points-box-two">
                                            <div className="portfolio-details__points-two">
                                                <div className="portfolio-details__points-two-single">
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Cloud Solu tions - Scalable and secure<br /> cloud infrastructures for
                                                        seamless<br />
                                                        operations.</p>
                                                </div>
                                                <div className="portfolio-details__points-two-single">
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Cybersecurity - Advanced security<br /> solutions to protect against
                                                        cyber
                                                        threats</p>
                                                </div>
                                                <div className="portfolio-details__points-two-single">
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>IT Consulting & Support - Expert guidance<br /> to optimize IT
                                                        infrastructure
                                                        and<br /> workflows.</p>
                                                </div>
                                            </div>
                                            <div className="portfolio-details__points-two">
                                                <div className="portfolio-details__points-two-single">
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>AI & Automation - Smart automation tools<br /> that enhance
                                                        productivity
                                                        and
                                                        decision-<br />making.</p>
                                                </div>
                                                <div className="portfolio-details__points-two-single">
                                                    <div className="icon">
                                                        <span className="icon-tick-inside-circle"></span>
                                                    </div>
                                                    <p>Custom Software Development - Tailor-<br />made software solutions for
                                                        industry-<br />specific needs.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <div className="portfolio-details__img-box">
                                            <div className="row">
                                                <div className="col-xl-6">
                                                    <div className="portfolio-details__img-box-img">
                                                        <Image src="/assets/images/project/portfolio-details-img-box-img-1.jpg" alt="Image" width={520} height={360} priority />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className="portfolio-details__img-box-img">
                                                        <Image src="/assets/images/project/portfolio-details-img-box-img-2.jpg" alt="Image" width={520} height={360} priority />
                                                    </div>
                                                </div>
                                                <div className="col-xl-12">
                                                    <div className="portfolio-details__img-box-img">
                                                        <Image src="/assets/images/project/portfolio-details-img-box-img-3.jpg" alt="Image" width={1070} height={360} priority />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <h4 className="portfolio-details__title-3">Case Study:</h4>
                                        <p className="portfolio-details__text-3">In an era where digital transformation is
                                            essential
                                            for business success, our project focuses on delivering scalable, secure, and
                                            cutting-edge IT solutions tailored to diverse industries. We help businesses
                                            harness
                                            the power of cloud computing, artificial intelligence (AI), automation,
                                            cybersecurity, and enterprise software to stay ahead of the competition. </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <div className="portfolio-details__portfolio-list-three">
                                            <div className="portfolio-details__portfolio-list-three-single">
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <div className="content">
                                                    <h5>Cloud-Based Inventory System </h5>
                                                    <p>Real-time stock updates across all stores and online platforms.</p>
                                                </div>
                                            </div>
                                            <div className="portfolio-details__portfolio-list-three-single">
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <div className="content">
                                                    <h5>Cloud-Based Inventory System </h5>
                                                    <p>Optimized stock replenishment based on purchasing trends.</p>
                                                </div>
                                            </div>
                                            <div className="portfolio-details__portfolio-list-three-single">
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <div className="content">
                                                    <h5>Personalized Customer Engagement</h5>
                                                    <p>AI-driven product recommendations and loyalty programs.</p>
                                                </div>
                                            </div>
                                            <div className="portfolio-details__portfolio-list-three-single">
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <div className="content">
                                                    <h5>Personalized Customer Engagement</h5>
                                                    <p>AI-driven product recommendations and loyalty programs.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <div className="portfolio-details__img-box-2">
                                            <Image src="/assets/images/project/portfolio-details-img-box-2-img.jpg" alt="Image" width={1070} height={450} priority />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="portfolio-details__count"></div>
                                    <div className="portfolio-details__portfolio-content">
                                        <p className="portfolio-details__text-4">By integrating future-ready technologies, we
                                            ensure
                                            businesses remain agile, efficient, and secure in an ever-changing digital
                                            world.
                                            Whether you&apos;re a startup, SME, or enterprise, our end-to-end IT solutions will
                                            help
                                            you achieve sustainable growth and innovation.</p>
                                        <p className="portfolio-details__text-5">By integrating AI and cloud computing, we
                                            helped
                                            the retailer streamline operations, reduce costs, and enhance customer
                                            experiences.
                                            This transformation positioned them for long-term growth in an increasingly
                                            digital
                                            market.</p>
                                        <p className="portfolio-details__text-6">🚀 Empower your business with the technology of
                                            tomorrow—today!</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
