"use client";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";
import ContactForm from "@/components/elements/ContactForm";

export default function Contact() {

  return (
    <>
        <section className="contact-two" id="contact">
            <div className="contact-sliding-text__wrap overflow-hidden">
                <ul className="contact-two__sliding-text-list list-unstyled flex animate-marquee">
                    <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                    </ul>

                    {/* Duplicate list for seamless infinite loop */}
                    <ul
                        className="contact-two__sliding-text-list list-unstyled flex animate-marquee"
                        aria-hidden="true"
                    >
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                        <li>
                        <h2 data-hover="Branding" className="contact-two__sliding-text-title">
                            GET IN TOUCH *
                        </h2>
                        </li>
                    </ul>
                </div>


            <div className="contact-two__bg" style={{ backgroundImage: "url(/assets/images/backgrounds/contact-two-bg.jpg)" }}>
            </div>
            <div className="contact-two__shape-1 float-bob-y">
                <Image src="/assets/images/shapes/contact-two-shape-1.png" alt="Image" width={690} height={847} priority />
            </div>
            <div className="contact-two__shape-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="contact-two__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Get In Touch</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">Conversation
                                    <span> Reach</span><br /><span>Out Anytime</span>
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="contact-two__text">We&apos;re here to listen! Whether you have<br /> questions, feedback,
                                or just want to say hello,<br /> feel free to reach out. </p>
                            <ul className="contact-two__contact-list list-unstyled">
                                <li>
                                    <div className="icon">
                                        <span className="icon-mail"></span>
                                    </div>
                                    <div className="content">
                                        <span>Email Us</span>
                                        <p><Link href="mailto:info@domain.com">info@domain.com</Link></p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-phone-call"></span>
                                    </div>
                                    <div className="content">
                                        <span>Contact US</span>
                                        <p><Link href="tel:9900567780">+99 (00) 567 780</Link></p>
                                    </div>
                                </li>
                                <li>
                                    <div className="icon">
                                        <span className="icon-pin"></span>
                                    </div>
                                    <div className="content">
                                        <span>Our Address</span>
                                        <p>1629 N. Dixie Avenue, Kentucky, 42701</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="contact-two__right wow slideInRight" data-wow-delay="100ms"
                            data-wow-duration="2500ms">
                            <ContactForm/>
                            <div className="result"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
