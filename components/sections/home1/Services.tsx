"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/elements/AnimatedTitle";

export default function Services() {
  const circleText = "&nbsp;View All Project • View All Services •";

  // Create React-friendly rotated letters
  const rotatedChars = useMemo(() => {
    const cleanText = circleText.replace(/&nbsp;/g, " ");
    const chars = cleanText.split("");
    const radius = 73.6;
    const total = chars.length;
    const deg = 360 / total;

    return chars.map((char, i) => (
      <span
        key={i}
        style={{
          position: "absolute",
          left: "0%",
          top: "0%",
          transformOrigin: `0 ${radius}px`,
          transform: `rotate(${i * deg}deg)`,
        }}
      >
        {char}
      </span>
    ));
  }, [circleText]);

  return (
    <>
        <section className="services-two" id="services">
            <div className="services-two__shape-1"></div>
            <div className="container">
                <div className="services-two__top">
                    <div className="section-title text-left sec-title-animation animation-style2">
                        <div className="section-title__tagline-box">
                            <div className="section-title__tagline-shape-1"></div>
                            <span className="section-title__tagline">Our Services</span>
                            <div className="section-title__tagline-shape-2"></div>
                        </div>
                        <AnimatedTitle>
                        <h2 className="section-title__title title-animation">Your Business with Cutting-Edge IT<br />
                            Solutions <Image src="/assets/images/services/section-title-img.jpg" alt="Image" width={120} height={40} priority />
                            <span>Innovative IT Services</span><br /><span>Tailored for Your Success</span>
                        </h2>
                        </AnimatedTitle>
                    </div>
                    <Link href="/services" className="services-two__round-text-box">
                    <div className="services-two__round-text-box-outer">
                        <div className="services-two__round-text-box-inner">
                        <div className="services-two__curved-circle">
                            {rotatedChars}
                        </div>
                        <div className="services-two__round-icon">
                            <Image
                            src="/assets/images/icon/services-two-round-icon.png"
                            alt="icon"
                            width={42}
                            height={42}
                            priority
                            />
                        </div>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="services-two__bottom">
                    <div className="services-two__services-list">
                        <div className="services-two__services-list-single services-two__services-list-single-1">
                            <div className="services-two__count-and-title">
                                <div className="services-two__count"></div>
                                <h3 className="services-two__title"><Link href="/advanced-technology">Software Development
                                        <br /> Solutions</Link></h3>
                            </div>
                            <div className="services-two__service-list-box">
                                <ul className="services-two__services-list-inner list-unstyled">
                                    <li>
                                        <p><span className="icon-plus"></span>UI/UX Design</p>
                                        <p><span className="icon-plus"></span>Mobile Application</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Mobile Application</p>
                                        <p><span className="icon-plus"></span>Research</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Research</p>
                                        <p><span className="icon-plus"></span>UI/UX Design</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="services-two__hover-img">
                                <Image src="/assets/images/services/services-2-1.jpg" alt="Image" width={250} height={320} priority />
                            </div>
                        </div>
                        <div className="services-two__services-list-single">
                            <div className="services-two__count-and-title">
                                <div className="services-two__count"></div>
                                <h3 className="services-two__title"><Link href="/data-protection-privacy">Cybersecurity
                                        Risk
                                        <br /> Management</Link></h3>
                            </div>
                            <div className="services-two__service-list-box">
                                <ul className="services-two__services-list-inner list-unstyled">
                                    <li>
                                        <p><span className="icon-plus"></span>Security</p>
                                        <p><span className="icon-plus"></span>Performance</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Scalability</p>
                                        <p><span className="icon-plus"></span>Reliability</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Innovation</p>
                                        <p><span className="icon-plus"></span>Efficiency</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="services-two__hover-img">
                                <Image src="/assets/images/services/services-2-2.jpg" alt="Image" width={250} height={320} priority />
                            </div>
                        </div>
                        <div className="services-two__services-list-single">
                            <div className="services-two__count-and-title">
                                <div className="services-two__count"></div>
                                <h3 className="services-two__title"><Link href="cloud-managed-/services">Cloud Solutions
                                        <br /> Provider</Link></h3>
                            </div>
                            <div className="services-two__service-list-box">
                                <ul className="services-two__services-list-inner list-unstyled">
                                    <li>
                                        <p><span className="icon-plus"></span>Cloud Security</p>
                                        <p><span className="icon-plus"></span>Cloud Scalability</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Cloud Integration</p>
                                        <p><span className="icon-plus"></span>Cloud Performance</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Cloud Backup</p>
                                        <p><span className="icon-plus"></span>Cloud Optimization</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="services-two__hover-img">
                                <Image src="/assets/images/services/services-2-3.jpg" alt="Image" width={250} height={320} priority />
                            </div>
                        </div>
                        <div className="services-two__services-list-single">
                            <div className="services-two__count-and-title">
                                <div className="services-two__count"></div>
                                <h3 className="services-two__title"><Link href="/backup-recovery">Data Analytics
                                        <br /> Consulting</Link></h3>
                            </div>
                            <div className="services-two__service-list-box">
                                <ul className="services-two__services-list-inner list-unstyled">
                                    <li>
                                        <p><span className="icon-plus"></span>Data Insights</p>
                                        <p><span className="icon-plus"></span>Predictive Analytics</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Big Data</p>
                                        <p><span className="icon-plus"></span>Business Intelligence</p>
                                    </li>
                                    <li>
                                        <p><span className="icon-plus"></span>Data Visualization</p>
                                        <p><span className="icon-plus"></span>Data Strategy</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="services-two__hover-img">
                                <Image src="/assets/images/services/services-2-4.jpg" alt="Image" width={250} height={320} priority />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
