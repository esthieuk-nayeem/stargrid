import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";import Newsletter from "@/components/sections/home1/Newsletter";
;
export default function Team_Page() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Team members">
            <section className="team-page">
                <div className="team-page__shape-1">
                    <Image src="/assets/images/shapes/team-page-shape-1.png" alt="Image" width={1920} height={1332} priority />
                </div>
                <div className="container">
                    <div className="row">
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-1.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>CEO & Founder</p>
                                        <h3 className="team-one__title"><Link href="/team-details">James Carter</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="200ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-2.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Chief Technology Officer </p>
                                        <h3 className="team-one__title"><Link href="/team-details">Sophia Reynolds</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="300ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-3.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Lead Software Engineer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Michael Hayes</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="400ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-4.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>UI/UX Designer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Emma Brooks </Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="500ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-5.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Marketing Manager</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Sarah Johnson </Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="600ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-6.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Product Designer</p>
                                        <h3 className="team-one__title"><Link href="/team-details">David Matthews </Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="700ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-7.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Sales Director</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Olivia Grace</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="800ms">
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <Image src="/assets/images/team/team-1-8.jpg" alt="Image" width={300} height={300} priority />
                                    </div>
                                    <div className="team-one__social-box-inner">
                                        <div className="team-one__social-box">
                                            <div className="team-one__social">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>
                                            </div>
                                            <div className="team-one__social">

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__arrow">
                                        <Link href="/team-details"><span className="icon-link"></span></Link>
                                    </div>
                                    <div className="team-one__title-box">
                                        <p className="team-one__sub-title"><span></span>Operations Lead</p>
                                        <h3 className="team-one__title"><Link href="/team-details">Mitchell Marsh </Link></h3>
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
            </section>

            <section className="newsletter-one newsletter-three">
                <div className="container">
                    <div className="newsletter-one__inner">
                        <div className="newsletter-one__shape-bg"
                            style={{ backgroundImage: "url(/assets/images/shapes/newsletter-one-shape-bg.png)" }}></div>
                        <div className="newsletter-one__shape-1 float-bob-x">
                            <Image src="/assets/images/shapes/newsletter-one-shape-1.png" alt="Image" width={416} height={368} priority />
                        </div>
                        <div className="newsletter-one__shape-2"></div>
                        <div className="newsletter-one__shape-3"></div>
                        <div className="newsletter-one__img float-bob-y">
                            <Image src="/assets/images/resources/newsletter-one-img-1.png" alt="Image" width={244} height={366} priority />
                        </div>
                        <h2 className="newsletter-one__title">Subscribe <span>Newsletter</span></h2>
                        <p className="newsletter-one__text">From personalized solutions to expert execution, we prioritize
                            quality, <br /> reliability, and customer satisfaction</p>
                        <form className="newsletter-one__contact-form">
                            <div className="newsletter-one__contact-input-box">
                                <input type="email" placeholder="Enter email address" name="email" />
                                <button type="submit" className="thm-btn">Subscribe Now<span
                                        className="icon-arrow-right"></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
