
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Services() {
  return (
    <>
        <section className="servces-one" id="services">
            <div className="servces-one__shape-2"></div>
            <div className="servces-one__shape-3 float-bob-y">
                <Image src="/assets/images/shapes/services-one-shape-3.png" alt="Image" width={693} height={1328} priority />
            </div>
            <div className="container">
                <div className="servces-one__top">
                    <div className="row">
                        <div className="col-xl-7">
                            <div className="servces-one__top-left">
                                <div className="section-title text-left sec-title-animation animation-style2">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape-1"></div>
                                        <span className="section-title__tagline">Our Services</span>
                                        <div className="section-title__tagline-shape-2"></div>
                                    </div>
                                    <AnimatedTitle>
                                    <h2 className="section-title__title title-animation">Comprehensive, Reliable
                                        <br />Services
                                        <span>Crafted to Exceed</span> Your Expectations</h2>
                                    </AnimatedTitle>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <div className="servces-one__top-right">
                                <p className="servces-one__top-text">From personalized solutions to expert execution, we
                                    prioritize quality, reliability, and customer satisfaction in everything we do. Let
                                    us be your trusted partner in achieving success.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="servces-one__bottom">
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="servces-one__img-box wow slideInLeft" data-wow-delay="100ms"
                                data-wow-duration="2500ms">
                                <div className="servces-one__img">
                                    <Image src="/assets/images/services/servces-one-img-1.png" alt="Image" width={520} height={550} priority />
                                </div>
                                <div className="servces-one__img-2">
                                    <Image src="/assets/images/services/servces-one-img-2.png" alt="Image" width={190} height={190} priority />
                                </div>
                                <div className="servces-one__shape-1">
                                    <Image src="/assets/images/shapes/services-one-shape-1.png" alt="Image" width={54} height={54} priority />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="servces-one__bottom-right">
                                <ul className="services-one__services-list list-unstyled">
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title"><Link
                                                            href="/threat-detection-prevention">Provide All Kind Of
                                                            IT
                                                            Services</Link></h3>
                                                    <p className="services-one__text">Comprehensive IT management, including
                                                        network<br /> monitoring, data backup, </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link href="/threat-detection-prevention"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <Image src="/assets/images/services/services-1-1.jpg" alt="Image" width={150} height={150} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title"><Link
                                                            href="/advanced-technology">Cybersecurity Solutions</Link>
                                                    </h3>
                                                    <p className="services-one__text">Scalable cloud solutions, including
                                                        migration,<br /> storage, and management, enabling secure data<br />
                                                        access </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link href="/advanced-technology"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <Image src="/assets/images/services/services-1-2.jpg" alt="Image" width={150} height={150} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title"><Link
                                                            href="/data-protection-privacy">Cybersecurity
                                                            Solutions</Link></h3>
                                                    <p className="services-one__text">Comprehensive IT management, including
                                                        network<br /> monitoring, data backup, </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link href="/data-protection-privacy"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <Image src="/assets/images/services/services-1-1.jpg" alt="Image" width={150} height={150} priority />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="services-one__services-single">
                                            <div className="services-one__count-and-content">
                                                <div className="services-one__count"></div>
                                                <div className="services-one__content">
                                                    <h3 className="services-one__title"><Link
                                                            href="/backup-recovery">Software Development &
                                                            Integration</Link></h3>
                                                    <p className="services-one__text">Custom software development tailored
                                                        to your<br /> business needs, along with seamless integration </p>
                                                </div>
                                            </div>
                                            <div className="services-one__arrow">
                                                <Link href="/backup-recovery"><span
                                                        className="icon-right-arrow"></span></Link>
                                            </div>
                                        </div>
                                        <div className="services-one__hover-img">
                                            <Image src="/assets/images/services/services-1-1.jpg" alt="Image" width={150} height={150} priority />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
