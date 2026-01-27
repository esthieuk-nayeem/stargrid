
import Link from "next/link";
import Image from "next/image";
import VideoModal from "@/components/elements/VideoPopup";

export default function Banner() {
  return (
    <>
        <section className="banner-one">
            <div className="banner-one__bg" style={{ backgroundImage: "url(/assets/images/backgrounds/banner-one-bg.jpg)" }}>
            </div>
            <div className="banner-one__shape-bg float-bob-y"
                style={{ backgroundImage: "url(/assets/images/shapes/banner-one-shape-bg.png)" }}></div>
            <div className="container">
                <div className="banner-one__inner">
                    <h2 className="banner-one__title">Expert IT Solutions to Elevate <br /> <span>Your Enterprise</span>
                    </h2>
                    <div className="banner-one__btn-box">
                        <Link href="/contact" className="thm-btn">Get Started<span className="icon-right-arrow"></span></Link>
                    </div>
                    <div className="banner-one__img-box">
                        <div className="banner-one__img">
                            <Image src="/assets/images/resources/banner-one-img-1.jpg" alt="Image" width={1100} height={430} priority />
                            <div className="banner-one__video-link">
                                <VideoModal/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
