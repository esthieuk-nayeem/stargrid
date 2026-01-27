"use client";

import Link from "next/link";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import ContactForm from "@/components/elements/ContactForm";

export default function Contact() {

  return (
    <>
        <section className="contact-one" id="contact">
            <div className="contact-one__bg-shape"
                style={{ backgroundImage: "url(/assets/images/shapes/contact-one-bg-shape.png)" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__left wow slideInLeft" data-wow-delay="100ms"
                            data-wow-duration="2500ms">
                            <div className="contact-one__left-shape-1"></div>
                            <div className="contact-one__left-shape-2"></div>
                            <h3 className="contact-one__from-title">How Can We Help You?</h3>
                            <ContactForm/>
                            <div className="result"></div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__right">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Get In Touch</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Start the Conversation
                                    <span>-</span><br /><span>Reach Out Anytime</span>
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="contact-one__text">We&apos;re here to listen! Whether you have questions,<br /> feedback,
                                or
                                just want to say hello, feel free to reach out. </p>
                            <ul className="contact-one__list list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-pin"></span>
                                    </div>
                                    <div className="content">
                                        <h4>Location</h4>
                                        <p>1629 N. Dixie Avenue,
                                            <br /> Kentucky, 42701</p>
                                    </div>
                                </li>
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
    </>
  )
}
