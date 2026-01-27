
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Team from "@/components/sections/home2/Team";
import Image from "next/image";
import Link from "next/link";
export default function Team_Details() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Team Details">
            <section className="team-details">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="team-details__left">
                                <div className="team-details__img-box">
                                    <div className="team-details__img">
                                        <Image src="/assets/images/team/team-details-img-1.jpg" alt="Image" width={500} height={560} priority />
                                    </div>
                                    <div className="team-details__experience-box">
                                        <div className="team-details__experience-icon">
                                            <Image src="/assets/images/icon/team-details-experience-icon.png" alt="Image" width={50} height={51} priority />
                                        </div>
                                        <h3 className="team-details__experience-title">12 Years <br />Experience</h3>
                                        <p className="team-details__experience-text">crafting intuitive</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="team-details__right">
                                <h3 className="team-details__title">David Smith</h3>
                                <p className="team-details__sub-title">Professional UI/UX Design</p>
                                <p className="team-details__text">David Smith is a seasoned UI/UX designer with a keen eye for
                                    detail and a passion for crafting seamless digital experiences. With years of experience
                                    in user-centered design, he specializes in creating intuitive interfaces that enhance
                                    usability and engagement.</p>
                                <div className="team-details__points-box">
                                    <ul className="team-details__points list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="content">
                                                <h5>Location</h5>
                                                <p>1629 N. Dixie Avenue,
                                                    <br /> Kentucky, 42701</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-graduation-cap"></span>
                                            </div>
                                            <div className="content">
                                                <h5>Education</h5>
                                                <p>Tel: <Link href="tel:1200456789000">+12 (00) 456 7890 00</Link></p>
                                                <p>Mob: <Link href="tel:9900567780">+99 (00) 567 780</Link></p>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="team-details__points list-unstyled">
                                        <li>
                                            <div className="icon">
                                                <span className="icon-contact"></span>
                                            </div>
                                            <div className="content">
                                                <h5>Contact Info</h5>
                                                <p><Link href="mailto:info@domain.com">info@domain.com</Link></p>
                                                <p>Mob: <Link href="tel:9900567780">+99 (00) 567 780</Link></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="content">
                                                <h5>Office Time</h5>
                                                <p>Sunday - Friday</p>
                                                <p>10:00 AM - 5:00 PM</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="team-details__social-box">
                                    <p>Follow Me</p>
                                    <div className="team-details__social-list">
                                        <Link href="#"><span className="icon-facebook"></span></Link>
                                        <Link href="#"><span className="icon-dribble"></span></Link>

                                        <Link href="#"><span className="icon-linkedin"></span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="skill-one">
                <div className="skill-one__bg-shape" style={{ backgroundImage: "url(/assets/images/shapes/skill-one-shape-1.png)" }}>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-6">
                            <div className="skill-one__left">
                                <h3 className="skill-one__title">Design Skills Hub</h3>
                                <p className="skill-one__text">Design Expertise - Proficient in crafting user-friendly, visually
                                    appealing, and highly functional digital experiences. With a strong focus on usability,
                                    accessibility, and modern design trends, David ensures seamless interactions that
                                    enhance user engagement</p>
                                <ul className="skill-one__progress-list list-unstyled">
                                    <li>
                                        <div className="skill-one__progress">
                                            <h4 className="skill-one__progress-title">User research</h4>
                                            <div className="bar">
                                                <div className="bar-inner count-bar" style={{ width: '95%' }}>
                                                    <div className="count-text">95%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="skill-one__progress">
                                            <h4 className="skill-one__progress-title">Product Design</h4>
                                            <div className="bar">
                                                <div className="bar-inner count-bar" style={{ width: '80%' }}>
                                                    <div className="count-text">80%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="skill-one__progress">
                                            <h4 className="skill-one__progress-title">Prototyep & Lunch</h4>
                                            <div className="bar">
                                                <div className="bar-inner count-bar" style={{ width: '85%' }}>
                                                    <div className="count-text">85%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6">
                            <div className="skill-one__right">
                                <div className="skill-one__img">
                                    <Image src="/assets/images/resources/skill-one-img-1.jpg" alt="Image" width={520} height={450} priority />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Team/>
            <Newsletter/>
        </Layout>
    )
}
