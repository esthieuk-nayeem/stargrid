
import Link from "next/link";

export default function Cta() {
  return (
    <>
        <section className="cta-one">
            <div className="cta-one__shape-bg float-bob-y"
                style={{ backgroundImage: "url(/assets/images/shapes/cta-one-shape-bg.png)" }}>
            </div>
            <div className="container">
                <div className="cta-one__inner">
                    <h3 className="cta-one__title">To make requests for further <br /> information,
                        contact us</h3>
                    <div className="cta-one__contact-info">
                        <div className="cta-one__contact-icon">
                            <span className="icon-customer-service-headset"></span>
                        </div>
                        <div className="cta-one__contact-details">
                            <p>Call Us For Any inquiry</p>
                            <h4><Link href="tel:9900567780">+99 (00) 567 780</Link></h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
