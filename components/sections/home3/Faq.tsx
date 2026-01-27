"use client";
import CountUp from "react-countup";

import { useState } from "react";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-one">
      <div className="faq-one__shape-1"></div>
      <div className="faq-one__shape-2"></div>
      <div className="container">
        <div className="row">
          {/* Left side */}
          <div className="col-xl-6">
            <div className="faq-one__left">
              <div className="section-title text-left sec-title-animation animation-style2">
                <div className="section-title__tagline-box">
                  <div className="section-title__tagline-shape-1"></div>
                  <span className="section-title__tagline">Our Faqs</span>
                  <div className="section-title__tagline-shape-2"></div>
                </div>
                <AnimatedTitle>
                  <h2 className="section-title__title title-animation">
                    Your Questions Answered <br />
                    <span>Explore Our FAQs</span>
                  </h2>
                </AnimatedTitle>
              </div>

              <div
                className="faq-one__img-box wow slideInLeft"
                data-wow-delay="100ms"
                data-wow-duration="2500ms"
              >
                <div className="faq-one__img">
                  <Image
                    src="/assets/images/resources/faq-one-img-1.jpg"
                    alt="Image"
                    width={378}
                    height={378}
                    priority
                  />
                </div>
                <div className="faq-one__experience-box">
                  <div className="faq-one__experience-year">
                    <h2 className="odometer">
                      <CountUp end={55} duration={2} />
                    </h2>
                  </div>
                  <p className="faq-one__experience-text">
                    Year of <br /> experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="col-xl-6">
            <div className="faq-one__right">
              <div className="accrodion-grp faq-one-accrodion" data-grp-name="faq-one-accrodion">
                {/* Accordion 1 */}
                <div
                  className={`accrodion ${activeIndex === 0 ? "active" : ""}`}
                >
                  <div
                    className="accrodion-title"
                    onClick={() => toggleAccordion(0)}
                  >
                    <h4>What types of IT services do you offer?</h4>
                  </div>
                  <div
                    className="accrodion-content"
                    style={{
                      maxHeight: activeIndex === 0 ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.5s ease",
                      opacity: activeIndex === 0 ? 1 : 0,
                    }}
                  >
                    <div className="inner">
                      <p>
                        From personalized solutions to expert execution, we
                        prioritize quality, reliability, and customer
                        satisfaction in everything we do. Let us be your trusted
                        partner in achieving success.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion 2 */}
                <div
                  className={`accrodion ${activeIndex === 1 ? "active" : ""}`}
                >
                  <div
                    className="accrodion-title"
                    onClick={() => toggleAccordion(1)}
                  >
                    <h4>Are your IT products eco-friendly?</h4>
                  </div>
                  <div
                    className="accrodion-content"
                    style={{
                      maxHeight: activeIndex === 1 ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.5s ease",
                      opacity: activeIndex === 1 ? 1 : 0,
                    }}
                  >
                    <div className="inner">
                      <p>
                        From personalized solutions to expert execution, we
                        prioritize quality, reliability, and customer
                        satisfaction in everything we do. Let us be your trusted
                        partner in achieving success.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion 3 */}
                <div
                  className={`accrodion ${activeIndex === 2 ? "active" : ""}`}
                >
                  <div
                    className="accrodion-title"
                    onClick={() => toggleAccordion(2)}
                  >
                    <h4>What papers needed for software development?</h4>
                  </div>
                  <div
                    className="accrodion-content"
                    style={{
                      maxHeight: activeIndex === 2 ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.5s ease",
                      opacity: activeIndex === 2 ? 1 : 0,
                    }}
                  >
                    <div className="inner">
                      <p>
                        From personalized solutions to expert execution, we
                        prioritize quality, reliability, and customer
                        satisfaction in everything we do. Let us be your trusted
                        partner in achieving success.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion 4 */}
                <div
                  className={`accrodion ${activeIndex === 3 ? "active" : ""}`}
                >
                  <div
                    className="accrodion-title"
                    onClick={() => toggleAccordion(3)}
                  >
                    <h4>How to contact the development team?</h4>
                  </div>
                  <div
                    className="accrodion-content"
                    style={{
                      maxHeight: activeIndex === 3 ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.5s ease",
                      opacity: activeIndex === 3 ? 1 : 0,
                    }}
                  >
                    <div className="inner">
                      <p>
                        From personalized solutions to expert execution, we
                        prioritize quality, reliability, and customer
                        satisfaction in everything we do. Let us be your trusted
                        partner in achieving success.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accordion 5 */}
                <div
                  className={`accrodion ${activeIndex === 4 ? "active" : ""}`}
                >
                  <div
                    className="accrodion-title"
                    onClick={() => toggleAccordion(4)}
                  >
                    <h4>What types of IT services do you offer?</h4>
                  </div>
                  <div
                    className="accrodion-content"
                    style={{
                      maxHeight: activeIndex === 4 ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.5s ease",
                      opacity: activeIndex === 4 ? 1 : 0,
                    }}
                  >
                    <div className="inner">
                      <p>
                        From personalized solutions to expert execution, we
                        prioritize quality, reliability, and customer
                        satisfaction in everything we do. Let us be your trusted
                        partner in achieving success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Right side */}
        </div>
      </div>
    </section>
  );
}
