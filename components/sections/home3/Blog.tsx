
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Blog() {
  return (
    <>
        <section className="blog-two blog-three" id="blog">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="blog-two__left wow fadeInLeft" data-wow-delay="100ms">
                            <div className="section-title text-left sec-title-animation animation-style1">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Our Blogs</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Explore Our Latest
                                    <span>Blogs for Expert Insights</span></h2>
                                </AnimatedTitle>
                            </div>
                            <p className="blog-two-text">Dive into our collection of blogs where we share expert insights,
                                helpful tips, and the latest trends in the industry</p>
                            <div className="blog-two__top-btn-box">
                                <Link href="/blog-details" className="thm-btn">View All Blogs<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                            <div className="blog-two__left-content-box">
                                <div className="blog-two__single">
                                    <div className="blog-two__img">
                                        <Image src="/assets/images/blog/blog-2-1.jpg" alt="Image" width={531} height={257} priority />
                                        <div className="blog-two__tags">
                                            <span>Digital</span>
                                            <span>Technology</span>
                                        </div>
                                    </div>
                                    <div className="blog-two__content">
                                        <div className="blog-two__user">
                                            <div className="blog-two__user-img">
                                                <Image src="/assets/images/blog/blog-two-user-1.jpg" alt="Image" width={32} height={32} priority />
                                            </div>
                                            <p className="blog-two__user-title">Jordan Walk</p>
                                        </div>
                                        <ul className="blog-two__meta list-unstyled">
                                            <li>
                                                <Link href="/blog-details"><span
                                                        className="far fa-calendar-alt"></span>April 5,
                                                    2025</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-details"><span className="fal fa-comments"></span>80
                                                    Comments</Link>
                                            </li>
                                        </ul>
                                        <h3 className="blog-two__title"><Link href="/blog-details">The Future is Now: A
                                                2025 Guide to Digital Transformation</Link></h3>
                                        <p className="blog-two__text">Winning the Digital Race: The 2025 Transformation
                                            Roadmap. Next-Gen Digital Transformation</p>
                                        <div className="blog-two__btn-box">
                                            <Link href="/blog-details" className="thm-btn">Reed More<span
                                                    className="icon-right-arrow"></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="blog-two__right">
                            
                            <div className="blog-two__single-two wow fadeInRight" data-wow-delay="100ms">
                                <div className="blog-two__img-two">
                                    <Image src="/assets/images/blog/blog-2-2.jpg" alt="Image" width={250} height={250} priority />
                                </div>
                                <div className="blog-two__content-two">
                                    <div className="blog-two__user-two">
                                        <div className="blog-two__user-two-img">
                                            <Image src="/assets/images/blog/blog-two-user-2.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-two__user-two-title">John Smith</p>
                                    </div>
                                    <div className="blog-two__tags-two">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                    <h3 className="blog-two__title-two"><Link href="/blog-details">5 Key Trends Shaping the
                                            Future of Technology</Link></h3>
                                    <ul className="blog-two__meta-two list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>Jan 13,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>12
                                                Comments</Link>
                                        </li>
                                    </ul>
                                    <div className="blog-two__btn-box-two">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="blog-two__single-two wow fadeInRight" data-wow-delay="200ms">
                                <div className="blog-two__img-two">
                                    <Image src="/assets/images/blog/blog-2-3.jpg" alt="Image" width={250} height={250} priority />
                                </div>
                                <div className="blog-two__content-two">
                                    <div className="blog-two__user-two">
                                        <div className="blog-two__user-two-img">
                                            <Image src="/assets/images/blog/blog-two-user-3.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-two__user-two-title">Alisa Olivia</p>
                                    </div>
                                    <div className="blog-two__tags-two">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                    <h3 className="blog-two__title-two"><Link href="/blog-details">How to Maximize
                                            Efficiency with Smart Business</Link></h3>
                                    <ul className="blog-two__meta-two list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>Jan 13,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>12
                                                Comments</Link>
                                        </li>
                                    </ul>
                                    <div className="blog-two__btn-box-two">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="blog-two__single-two wow fadeInRight" data-wow-delay="300ms">
                                <div className="blog-two__img-two">
                                    <Image src="/assets/images/blog/blog-2-4.jpg" alt="Image" width={250} height={250} priority />
                                </div>
                                <div className="blog-two__content-two">
                                    <div className="blog-two__user-two">
                                        <div className="blog-two__user-two-img">
                                            <Image src="/assets/images/blog/blog-two-user-4.jpg" alt="Image" width={32} height={32} priority />
                                        </div>
                                        <p className="blog-two__user-two-title">Jordan Walk</p>
                                    </div>
                                    <div className="blog-two__tags-two">
                                        <span>Digital</span>
                                        <span>Technology</span>
                                    </div>
                                    <h3 className="blog-two__title-two"><Link href="/blog-details">The Ultimate Guide to
                                            Digital Transformation in 2025</Link></h3>
                                    <ul className="blog-two__meta-two list-unstyled">
                                        <li>
                                            <Link href="/blog-details"><span className="far fa-calendar-alt"></span>Jan 13,
                                                2025</Link>
                                        </li>
                                        <li>
                                            <Link href="/blog-details"><span className="fal fa-comments"></span>12
                                                Comments</Link>
                                        </li>
                                    </ul>
                                    <div className="blog-two__btn-box-two">
                                        <Link href="/blog-details" className="thm-btn">Reed More<span
                                                className="icon-right-arrow"></span></Link>
                                    </div>
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
