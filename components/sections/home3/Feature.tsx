import Link from "next/link";
import Image from "next/image";

export default function Feature() {
  return (
    <>
        <section className="feature-one">
            <div className="feature-one__shape-1"></div>
            <div className="feature-one__shape-2 float-bob-y">
                <Image src="/assets/images/shapes/feature-one-shape-2.png" alt="Image" width={291} height={754} priority />
            </div>
            <div className="container">
                <div className="row">
                    
                    <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
                        <div className="feature-one__single">
                            <div className="feature-one__img">
                                <Image src="/assets/images/resources/feature-one-img-1-1.png" alt="Image" width={150} height={150} priority />
                            </div>
                            <h3 className="feature-one__title"><Link href="/data-protection-privacy">Security Services</Link>
                            </h3>
                            <p className="feature-one__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="300ms">
                        <div className="feature-one__single">
                            <div className="feature-one__img">
                                <Image src="/assets/images/resources/feature-one-img-1-2.png" alt="Image" width={150} height={150} priority />
                            </div>
                            <h3 className="feature-one__title"><Link href="/data-protection-privacy">Data Privary</Link></h3>
                            <p className="feature-one__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="500ms">
                        <div className="feature-one__single">
                            <div className="feature-one__img">
                                <Image src="/assets/images/resources/feature-one-img-1-3.png" alt="Image" width={150} height={150} priority />
                            </div>
                            <h3 className="feature-one__title"><Link href="/backup-recovery">Industry Certified</Link></h3>
                            <p className="feature-one__text">Innovating and empowering businesses with tailored solutions
                                for success and growth. Innovating and empowering</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}
