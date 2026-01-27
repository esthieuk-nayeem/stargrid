
import Image from "next/image";



export default function Newsletter() {
  return (
    <>
        <section className="newsletter-one">
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
                        <Image src="/assets/images/resources/newsletter-one-img-1.png" alt="Image" width={244} height={266} priority />
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
    </>
  )
}
