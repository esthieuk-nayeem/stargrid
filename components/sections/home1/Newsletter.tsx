

import Image from "next/image";

export default function Newsletter() {
  return (
    <>
        <section className="newsletter-two">
            <div className="newsletter-two__shape-1">
                <Image src="/assets/images/shapes/newsletter-two-shape-1.png" alt="Image" width={417} height={218} priority />
            </div>
            <div className="newsletter-two__shape-2 float-bob-x">
                <Image src="/assets/images/shapes/newsletter-two-shape-2.png" alt="Image" width={500} height={218} priority />
            </div>
            <div className="container">
                <div className="newsletter-two__inner">
                    <div className="newsletter-two__left">
                        <h2 className="newsletter-two__title">Subcribe to Our Newsletter</h2>
                        <p className="newsletter-two__text">Get the latest SEO tips and software insights straight to your
                            inbox.</p>
                    </div>
                    <div className="newsletter-two__right">
                        <form className="newsletter-two__form">
                            <div className="newsletter-two__input">
                                <input type="email" placeholder="Enter email address" />
                            </div>
                            <button type="submit" className="thm-btn">Subscribe Now <span className="icon-right-arrow"></span>
                            </button>
                            <div className="checked-box">
                            <input
                                type="checkbox"
                                name="skipper1"
                                id="skipper"
                                defaultChecked
                            />
                            <label htmlFor="skipper">
                                <span></span>
                                By subscribing, you accept our Privacy Policy
                            </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
