"use client";
import CountUp from "react-countup";

export default function Counter() {
  return (
    <>
        <section className="counter-two">
            <div className="counter-two__bg-shape" style={{ backgroundImage: "url(/assets/images/shapes/counter-two-bg-shape.png)" }}></div>
            <div className="container">
                <div className="row">
                    
                    <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-two__single">
                            <div className="counter-two__icon-inner">
                                <div className="counter-two__icon">
                                    <span className="icon-trophy"></span>
                                </div>
                            </div>
                            <div className="counter-two__content">
                                <div className="counter-two__count-box">
                                    <h3 className="odometer">
                                        <CountUp end={120} duration={2} />
                                    </h3>
                                    <span>+</span>
                                </div>
                                <p className="counter-two__text">Creative Plus award</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-two__single">
                            <div className="counter-two__icon-inner">
                                <div className="counter-two__icon">
                                    <span className="icon-user"></span>
                                </div>
                            </div>
                            <div className="counter-two__content">
                                <div className="counter-two__count-box">
                                    <h3 className="odometer">
                                        <CountUp end={300} duration={2} />
                                    </h3>
                                    <span>+</span>
                                </div>
                                <p className="counter-two__text">Expert Team Members</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-two__single">
                            <div className="counter-two__icon-inner">
                                <div className="counter-two__icon">
                                    <span className="icon-chat"></span>
                                </div>
                            </div>
                            <div className="counter-two__content">
                                <div className="counter-two__count-box">
                                    <h3 className="odometer">
                                        <CountUp end={20} duration={2} />
                                    </h3>
                                    <span>M</span>
                                </div>
                                <p className="counter-two__text">Happy Clients Review</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-lg-6 col-md-6">
                        <div className="counter-two__single">
                            <div className="counter-two__icon-inner">
                                <div className="counter-two__icon">
                                    <span className="icon-folder"></span>
                                </div>
                            </div>
                            <div className="counter-two__content">
                                <div className="counter-two__count-box">
                                    <h3 className="odometer">
                                        <CountUp end={1} duration={2} />
                                        .5
                                    </h3>
                                    <span>K</span>
                                </div>
                                <p className="counter-two__text">Project Completed</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}
