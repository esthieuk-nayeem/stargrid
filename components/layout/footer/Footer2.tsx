import Link from "next/link"
import Image from "next/image";
export default function Footer1() {
    return (
        <>
        
            <footer className="site-footer">
                <div className="site-footer__shape-1">
                    <Image src="/assets/images/shapes/site-footer-shape-1.png" alt="Image" width={240} height={635} priority />
                </div>
                <div className="site-footer__shape-2">
                    <Image src="/assets/images/shapes/site-footer-shape-2.png" alt="Image" width={265} height={635} priority />
                </div>
                <div className="site-footer__shape-3"></div>
                <div className="site-footer__shape-4"></div>
                <div className="site-footer__shape-5"></div>
                <div className="site-footer__top">
                    <div className="site-footer__top-bg"
                        style={{ backgroundImage: "url(/assets/images/backgrounds/site-footer-top-bg.jpg)" }}></div>
                    <div className="container">
                        <div className="site-footer__top-inner">
                            <div className="site-footer__logo">
                                <Link href="/index2"><Image src="/assets/images/resources/footer-logo.png" alt="Image" width={169} height={36} priority /></Link>
                            </div>
                            <div className="site-footer__top-text-box">
                                <p className="site-footer__top-text">We are the best creative agency <br />
                                    worldwide to brands grow</p>
                            </div>
                            <div className="site-footer__btn-box">
                                <Link href="/contact" className="site-footer__btn">Get In Touch<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-footer__main-content-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                                <div className="footer-widget__contact">
                                    <ul className="footer-widget__contact-list list-unstyled">
                                        <li>
                                            <div className="icon-box">
                                                <span className="icon-pin"></span>
                                                <p>Location</p>
                                            </div>
                                            <div className="text">
                                                <p>123 Main Street, Apt 4BNew <br />
                                                    York, NY 10001USA</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-box">
                                                <span className="icon-clock"></span>
                                                <p>Working Time</p>
                                            </div>
                                            <div className="text">
                                                <p>Sunday - Monday (Fri - Closed) <br />
                                                    10:00 AM - 5:00 PM</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon-box">
                                                <span className="icon-contact"></span>
                                                <p>Contact Us</p>
                                            </div>
                                            <div className="text">
                                                <p>
                                                    <Link href="mailto:support@domain.com"
                                                        className="mail-box">support@domain.com</Link>
                                                    <Link href="tel:12004567890" className="call-number">+12 (00) 456 7890</Link>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                                <div className="footer-widget__quick-links">
                                    <h4 className="footer-widget__title">Pages</h4>
                                    <ul className="footer-widget__quick-links-list list-unstyled">
                                        <li><Link href="/index2">Home</Link></li>
                                        <li><Link href="/about">About Us</Link></li>
                                        <li><Link href="/pricing">Pricing</Link></li>
                                        <li><Link href="/portfolio">Portfolio</Link></li>
                                        <li><Link href="/blog">Blogs</Link></li>
                                        <li><Link href="/contact">Careers</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                                <div className="footer-widget__support">
                                    <h4 className="footer-widget__title">Support</h4>
                                    <ul className="footer-widget__quick-links-list list-unstyled">
                                        <li><Link href="/about">Terms & Condition</Link></li>
                                        <li><Link href="/faq">FAQs</Link></li>
                                        <li><Link href="/contact">Contact Us</Link></li>
                                        <li><Link href="/404">404 Page</Link></li>
                                        <li><Link href="/contact">Live Chat</Link></li>
                                        <li><Link href="/services">Our Services</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                                <div className="footer-widget__newsletter">
                                    <h4 className="footer-widget__title">Newsletter</h4>
                                    <div className="footer-widget__newsletter-box">
                                        <p className="footer-widget__newsletter-text">Get the latest SEO tips and software
                                            insights straight to your inbox.</p>
                                        <form className="site-footer__newsletter-form">
                                            <div className="site-footer__newsletter-input">
                                                <input type="email" placeholder="Enter email address" />
                                            </div>
                                            <button type="submit" className="site-footer__newsletter-btn"> <span
                                                    className="icon-right-arrow"></span>
                                            </button>
                                            <div className="checked-box">
                                                <input type="checkbox" name="skipper1" id="skipper" defaultChecked />
                                                <label htmlFor="skipper">
                                                    <span></span>
                                                    by Subscribing. You Accept Privacy Policy
                                                </label>
                                            </div>
                                        </form>
                                        <div className="site-footer__social-box">
                                            <h4 className="site-footer__social-title">Follow Us:</h4>
                                            <div className="site-footer__social-box-inner">
                                                <Link href="#"><span className="icon-facebook"></span></Link>
                                                <Link href="#"><span className="icon-dribble"></span></Link>

                                                <Link href="#"><span className="icon-linkedin"></span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-footer__bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="site-footer__bottom-inner">
                                    <div className="site-footer__copyright">
                                        <p className="site-footer__copyright-text">
                                            ⓒ Copyright {new Date().getFullYear()} <Link href="#">techguru</Link> All rights reserved
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
