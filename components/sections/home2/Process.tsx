import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Process() {
  return (
    <>
        <section className="process-one">
            <div className="process-one__shape-1">
                <Image src="/assets/images/shapes/process-one-shape-1.png" alt="Image" width={90} height={90} priority />
            </div>
            <div className="process-one__shape-2"></div>
            <div className="process-one__shape-3"></div>
            <div className="process-one__bg-shape"
                style={{ backgroundImage: "url(/assets/images/shapes/process-one-bg-shape.png)" }}></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="process-one__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape-1"></div>
                                    <span className="section-title__tagline">Working Process</span>
                                    <div className="section-title__tagline-shape-2"></div>
                                </div>
                                <AnimatedTitle>
                                <h2 className="section-title__title title-animation">How We&apos;ve
                                    <span>Empowered</span><br /><span>Businesses with Innovative</span><br />Tech Solutions
                                </h2>
                                </AnimatedTitle>
                            </div>
                            <p className="process-one__text">From personalized solutions to expert<br /> execution, we
                                prioritize
                                quality, reliability, and<br /> customer satisfaction </p>
                            <div className="process-one__btn-box">
                                <Link href="/about" className="thm-btn">Get in Touch<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-7">
                        <div className="process-one__right">
                            <ul className="process-one__process-list list-unstyled">
                                <li>
                                    <div className="process-one__process-count"></div>
                                    <div className="process-one__process-content">
                                        <h3 className="process-one__process-title">Discovery & Strategy</h3>
                                        <p className="process-one__process-text">We analyze your business needs,<br />
                                            identify
                                            challenges, and craft a<br /> strategic roadmap for the best IT<br /> solutions.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="process-one__process-content">
                                        <h3 className="process-one__process-title">Development</h3>
                                        <p className="process-one__process-text">Our expert team designs, develops,<br /> and
                                            integrates cutting-edge<br /> technology tailored to your goals.</p>
                                    </div>
                                    <div className="process-one__process-count"></div>
                                </li>
                                <li>
                                    <div className="process-one__process-count"></div>
                                    <div className="process-one__process-content">
                                        <h3 className="process-one__process-title">Optimization & Support</h3>
                                        <p className="process-one__process-text">We ensure seamless performance with<br />
                                            continuous improvements,<br /> maintenance, and dedicated support.</p>
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
