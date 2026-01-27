import Link from "next/link";

export default function FeatureTwo() {
  return (
    <>
        <section className="feature-two">
            <div className="container">
                <ul className="list-unstyled feature-two__list">
                    <li className="wow fadeInUp" data-wow-delay="100ms">
                        <div className="feature-two__single">
                            <div className="feature-two__icon">
                                <span className="icon-strategy"></span>
                            </div>
                            <h3 className="feature-two__title"><Link href="/advanced-technology">
                                    Technology Consulting</Link></h3>
                            <p className="feature-two__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="200ms">
                        <div className="feature-two__single">
                            <div className="feature-two__icon">
                                <span className="icon-technical-support"></span>
                            </div>
                            <h3 className="feature-two__title"><Link href="/cloud-managed-services">
                                    Cloud IT security</Link></h3>
                            <p className="feature-two__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="300ms">
                        <div className="feature-two__single">
                            <div className="feature-two__icon">
                                <span className="icon-strategy"></span>
                            </div>
                            <h3 className="feature-two__title"><Link href="/advanced-technology">Software Development</Link>
                            </h3>
                            <p className="feature-two__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="400ms">
                        <div className="feature-two__single">
                            <div className="feature-two__icon">
                                <span className="icon-earning"></span>
                            </div>
                            <h3 className="feature-two__title"><Link href="/backup-recovery">
                                    Business solutions</Link></h3>
                            <p className="feature-two__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </li>
                    <li className="wow fadeInUp" data-wow-delay="500ms">
                        <div className="feature-two__single">
                            <div className="feature-two__icon">
                                <span className="icon-transparency"></span>
                            </div>
                            <h3 className="feature-two__title"><Link href="/data-protection-privacy">Data Tracking
                                    Security</Link></h3>
                            <p className="feature-two__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </>
  )
}
