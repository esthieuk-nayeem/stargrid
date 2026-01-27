import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";

export default function BlogListPage_Two() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog List Two">
            <section className="blog-list">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-5">
                            <div className="sidebar">
                                
                                <div className="sidebar__single sidebar__search">
                                    <div className="sidebar__title-box">
                                        <div className="sidebar__title-shape"></div>
                                        <h3 className="sidebar__title">Search </h3>
                                    </div>
                                    <p className="sidebar__search-text">Search blogs to discover a vast world of online content
                                        on countless topics.</p>
                                    <form action="#" className="sidebar__search-form">
                                        <input type="search" placeholder="Search Blogs" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                                
                                <div className="sidebar__single sidebar__category">
                                    <div className="sidebar__title-box">
                                        <div className="sidebar__title-shape"></div>
                                        <h3 className="sidebar__title">Category </h3>
                                    </div>
                                    <ul className="sidebar__category-list list-unstyled">
                                        <li><Link href="#">Web Design & Development <span>(15)</span></Link></li>
                                        <li className="active"><Link href="#">Products Design
                                                <span>(20)</span></Link></li>
                                        <li><Link href="#">Artificial Intelligence <span>(42)</span></Link></li>
                                        <li><Link href="#">Technology <span>(89)</span></Link></li>
                                    </ul>
                                </div>
                                
                                <div className="sidebar__single sidebar__post">
                                    <div className="sidebar__title-box">
                                        <div className="sidebar__title-shape"></div>
                                        <h3 className="sidebar__title">Recent Post </h3>
                                    </div>
                                    <ul className="sidebar__post-list list-unstyled">
                                        <li>
                                            <div className="sidebar__post-image">
                                                <Image src="/assets/images/blog/blog-lp-1.jpg" alt="Image" width={80} height={80} priority />
                                            </div>
                                            <div className="sidebar__post-content">
                                                <p className="sidebar__post-date"><span className="icon-calendar"></span>March 18,
                                                    2025</p>
                                                <h3 className="sidebar__post-title"><Link href="/blog-details">Adapting to
                                                        Digital Marketing Trends: Staying Ahead</Link></h3>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar__post-image">
                                                <Image src="/assets/images/blog/blog-lp-2.jpg" alt="Image" width={80} height={80} priority />
                                            </div>
                                            <div className="sidebar__post-content">
                                                <p className="sidebar__post-date"><span className="icon-calendar"></span>April 18,
                                                    2025</p>
                                                <h3 className="sidebar__post-title"><Link href="/blog-details">Standing Out in
                                                        a Competitive Market: </Link></h3>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="sidebar__post-image">
                                                <Image src="/assets/images/blog/blog-lp-3.jpg" alt="Image" width={80} height={80} priority />
                                            </div>
                                            <div className="sidebar__post-content">
                                                <p className="sidebar__post-date"><span className="icon-calendar"></span>Jun 18,
                                                    2025</p>
                                                <h3 className="sidebar__post-title"><Link href="/blog-details">The Importance
                                                        of Accurate Performance Reporting </Link></h3>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="sidebar__single sidebar__tags">
                                    <div className="sidebar__title-box">
                                        <div className="sidebar__title-shape"></div>
                                        <h3 className="sidebar__title">Keywords </h3>
                                    </div>
                                    <ul className="sidebar__tags-list clearfix list-unstyled">
                                        <li><Link href="#">Development</Link></li>
                                        <li><Link href="#">Innovation</Link></li>
                                        <li><Link href="#">Analytics</Link></li>
                                        <li><Link href="#">Marketing</Link></li>
                                        <li><Link href="#">Innovation</Link></li>
                                        <li><Link href="#">Technology</Link></li>
                                        <li><Link href="#">Ui Design</Link></li>
                                    </ul>
                                </div>
                                
                                <div className="sidebar__single sidebar__newsletter">
                                    <div className="sidebar__title-box">
                                        <div className="sidebar__title-shape"></div>
                                        <h3 className="sidebar__title">Subscribe </h3>
                                    </div>
                                    <p className="sidebar__newsletter-text">Subscribe our newsletter to get everyday update
                                        about our blogs</p>
                                    <form action="#" className="sidebar__newsletter-form">
                                        <div className="sidebar__newsletter-input">
                                            <div className="sidebar__newsletter-input-icon">
                                                <span className="icon-email"></span>
                                            </div>
                                            <input type="search" placeholder="Email" />
                                        </div>
                                        <button type="submit" className="thm-btn">Subcribe Now<i
                                                className="icon-right-arrow-1"></i></button>
                                    </form>
                                </div>
                                
                                <div className="sidebar__single sidebar__client-info-box">
                                    <div className="sidebar__client-img-box">
                                        <div className="sidebar__client-img">
                                                <Image src="/assets/images/blog/sidebar-client-img-1.jpg" alt="Image" width={72} height={72} priority />
                                        </div>
                                    </div>
                                    <h3 className="sidebar__client-title">Jordan M. Walk</h3>
                                    <p className="sidebar__client-sub-title">Digital Marketer</p>
                                    <p className="sidebar__client-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                    <div className="sidebar__client-social-box">
                                        <p className="sidebar__client-social-title">Follow Me</p>
                                        <div className="sidebar__client-social">
                                            <Link href="#"><span className="icon-facebook"></span></Link>
                                            <Link href="#"><span className="icon-dribble"></span></Link>

                                            <Link href="#"><span className="icon-linkedin"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-7">
                            <div className="blog-list__left blog-list__left--two">
                                
                                <div className="blog-list__single">
                                    <div className="blog-list__img">
                                        <Image src="/assets/images/blog/blog-list-1-1.jpg" alt="Image" width={784} height={350} priority />
                                        <div className="blog-list__tags">
                                            <span>Digital</span>
                                            <span>Technology</span>
                                        </div>
                                    </div>
                                    <div className="blog-list__content">
                                        <div className="blog-list__user">
                                            <div className="blog-list__user-img">
                                                <Image src="/assets/images/blog/blog-list-user-1.jpg" alt="Image" width={32} height={32} priority />
                                            </div>
                                            <p className="blog-list__user-title">Thomas Alison</p>
                                        </div>
                                        <ul className="blog-list__meta list-unstyled">
                                            <li>
                                                <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March
                                                    18, 2025</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-details"><span className="fal fa-comments"></span>89
                                                    Comments</Link>
                                            </li>
                                        </ul>
                                        <h3 className="blog-list__title"><Link href="/blog-details">Top IT Trends in 2025: What
                                                Businesses Need to Know</Link></h3>
                                        <p className="blog-list__text">Understand the key differences between cloud-based and
                                            on-premise IT solutions to make the best choice for your business needs.</p>
                                        <div className="blog-list__btn-box">
                                            <Link href="/blog-details" className="thm-btn">Reed More<span
                                                    className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="blog-list__single blog-list__single-2">
                                    <div className="blog-list__content">
                                        <div className="blog-list__user">
                                            <div className="blog-list__user-img">
                                                <Image src="/assets/images/blog/blog-list-user-2.jpg" alt="Image" width={32} height={32} priority />
                                            </div>
                                            <p className="blog-list__user-title">Mitchel Stack</p>
                                        </div>
                                        <ul className="blog-list__meta list-unstyled">
                                            <li>
                                                <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March
                                                    18, 2025</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-details"><span className="fal fa-comments"></span>89
                                                    Comments</Link>
                                            </li>
                                        </ul>
                                        <h3 className="blog-list__title"><Link href="/blog-details">Why Cybersecurity Should Be
                                                Your Top Priority in 2025</Link></h3>
                                        <p className="blog-list__text">Learn how to protect your business from cyber threats
                                            with the latest security solutions, best practices, and expert insights. </p>
                                        <div className="blog-list__btn-box">
                                            <Link href="/blog-details" className="thm-btn">Reed More<span
                                                    className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="blog-list__single">
                                    <div className="blog-list__img">
                                        <Image src="/assets/images/blog/blog-list-1-2.jpg" alt="Image" width={784} height={350} priority />
                                        <div className="blog-list__tags">
                                            <span>Digital</span>
                                            <span>Technology</span>
                                        </div>
                                    </div>
                                    <div className="blog-list__content">
                                        <div className="blog-list__user">
                                            <div className="blog-list__user-img">
                                                <Image src="/assets/images/blog/blog-list-user-3.jpg" alt="Image" width={32} height={32} priority />
                                            </div>
                                            <p className="blog-list__user-title">David Watson</p>
                                        </div>
                                        <ul className="blog-list__meta list-unstyled">
                                            <li>
                                                <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March
                                                    15, 2025</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-details"><span className="fal fa-comments"></span>60
                                                    Comments</Link>
                                            </li>
                                        </ul>
                                        <h3 className="blog-list__title"><Link href="/blog-details">Cloud vs. On-Premise: Which
                                                IT Infrastructure Is Right for You?</Link></h3>
                                        <p className="blog-list__text">A detailed comparison of cloud and on-premise solutions
                                            to help businesses choose the best IT infrastructure for their needs.</p>
                                        <div className="blog-list__btn-box">
                                            <Link href="/blog-details" className="thm-btn">Reed More<span
                                                    className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="blog-list__single">
                                    <div className="blog-list__img">
                                        <Image src="/assets/images/blog/blog-list-1-3.jpg" alt="Image" width={784} height={350} priority />
                                        <div className="blog-list__tags">
                                            <span>Digital</span>
                                            <span>Technology</span>
                                        </div>
                                    </div>
                                    <div className="blog-list__content">
                                        <div className="blog-list__user">
                                            <div className="blog-list__user-img">
                                                <Image src="/assets/images/blog/blog-list-user-4.jpg" alt="Image" width={32} height={32} priority />
                                            </div>
                                            <p className="blog-list__user-title">Thomas Alison</p>
                                        </div>
                                        <ul className="blog-list__meta list-unstyled">
                                            <li>
                                                <Link href="/blog-details"><span className="far fa-calendar-alt"></span>April
                                                    1, 2025</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-details"><span className="fal fa-comments"></span>45
                                                    Comments</Link>
                                            </li>
                                        </ul>
                                        <h3 className="blog-list__title"><Link href="/blog-details">The Role of AI in IT
                                                Support: Enhancing Efficiency and Security</Link></h3>
                                        <p className="blog-list__text">Discover how artificial intelligence is transforming IT
                                            support by automating processes, improving security, and reducing downtime.</p>
                                        <div className="blog-list__btn-box">
                                            <Link href="/blog-details" className="thm-btn">Reed More<span
                                                    className="icon-right-arrow"></span></Link>
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
