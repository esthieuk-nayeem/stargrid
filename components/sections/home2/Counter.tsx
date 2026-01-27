"use client";
import CountUp from "react-countup";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Counter() {
  return (
    <>
        <section className="counter-one">
            <div className="counter-one__wrap">
                <div className="counter-one__bg-shape float-bob-x"
                  style={{ backgroundImage: "url(/assets/images/shapes/counter-one-bg-shape.png)" }}></div>
                <div className="counter-one__shape-1"></div>
                <div className="counter-one__shape-2"></div>
                <div className="container">
                    <div className="section-title text-center sec-title-animation animation-style1">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-1"></div>
                            <span className="section-title__tagline">The Numbers Speak</span>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <AnimatedTitle>
                        <h2 className="section-title__title title-animation">Exploring Business Growth <span>In
                                IT</span><br /><span> Consulting Solutions</span></h2>
                        </AnimatedTitle>
                    </div>
                    <div className="row">
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="100ms">
                            <div className="counter-one__single">
                                <div className="counter-one__icon">
                                    <span className="icon-trophy"></span>
                                </div>
                                <div className="counter-one__content">
                                    <div className="counter-one__count-box">
                                        <h3 className="odometer"><CountUp end={120} duration={3} /></h3>
                                        <span>+</span>
                                    </div>
                                    <p className="counter-one__text">award Winning</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInLeft" data-wow-delay="200ms">
                            <div className="counter-one__single">
                                <div className="counter-one__icon">
                                    <span className="icon-user"></span>
                                </div>
                                <div className="counter-one__content">
                                    <div className="counter-one__count-box">
                                        <h3 className="odometer"><CountUp end={99} duration={2.5} /></h3>
                                        <span>%</span>
                                    </div>
                                    <p className="counter-one__text">Satisfied client</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="200ms">
                            <div className="counter-one__single">
                                <div className="counter-one__icon">
                                    <span className="icon-chat"></span>
                                </div>
                                <div className="counter-one__content">
                                    <div className="counter-one__count-box">
                                        <h3 className="odometer"><CountUp end={10} duration={2} /></h3>
                                        <span>M</span>
                                    </div>
                                    <p className="counter-one__text">worldwide reviews</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInRight" data-wow-delay="400ms">
                            <div className="counter-one__single">
                                <div className="counter-one__icon">
                                    <span className="icon-laughing"></span>
                                </div>
                                <div className="counter-one__content">
                                    <div className="counter-one__count-box">
                                        <h3 className="odometer"><CountUp end={200} duration={3} /></h3>
                                        <span>+</span>
                                    </div>
                                    <p className="counter-one__text">Happy Clients</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
