"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomSelect from "@/components/elements/CustomSelect";

export default function BlogDetails() {

    const options = [
        { value: "0", label: "Type Of Service 01" },
        { value: "1", label: "Type Of Service 02" },
        { value: "2", label: "Type Of Service 03" },
        { value: "3", label: "Type Of Service 04" },
        { value: "4", label: "Type Of Service 05" },
    ];

    const [selectedValue, setSelectedValue] = useState("");
    
  return (
    <>
        <section className="blog-details">
            <div className="blog-details__shape-1">
                <Image src="/assets/images/shapes/blog-details-shape-1.png" alt="Shape" width={1920} height={1332} priority />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="blog-details__left">
                            <div className="blog-details__img">
                                <Image src="/assets/images/blog/blog-details-img-1.jpg" alt="Image" width={743} height={380} priority />
                            </div>
                            <div className="blog-details__single-content">
                                <div className="blog-details__user">
                                    <div className="blog-details__user-img">
                                        <Image src="/assets/images/blog/blog-details-user-1.jpg" alt="Image" width={32} height={32} priority />
                                    </div>
                                    <p className="blog-details__user-title">Thomas Alison</p>
                                </div>
                                <ul className="blog-details__meta list-unstyled">
                                    <li>
                                        <Link href="/blog-details"><span className="far fa-calendar-alt"></span>March
                                            18, 2025</Link>
                                    </li>
                                    <li>
                                        <Link href="/blog-details"><span className="fal fa-comments"></span>89
                                            Comments</Link>
                                    </li>
                                </ul>
                                <h3 className="blog-details__title"><Link href="/blog-details">Top IT Trends in 2025. What
                                        Businesses Need to Know</Link></h3>
                                <p className="blog-details__text">Artificial Intelligence (AI) is set to revolutionize
                                    business operations in 2025, with automation playing a central role in improving
                                    efficiency, reducing costs, and enhancing decision-making. AI-driven tools are
                                    becoming more sophisticated, enabling businesses to automate repetitive tasks,
                                    personalize customer interactions, and optimize workflows.</p>
                            </div>
                            <div className="blog-details__content">
                                <h3 className="blog-details__title-1">Key Trends in AI & Automation:</h3>
                                <p className="blog-details__text-1">Creating a user-friendly website is crucial for engaging
                                    visitors and ensuring a positive user experience. In this blog post, we&apos;ll explore
                                    key strategies.</p>
                                <ul className="blog-details__points list-unstyled">
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p><span>AI-Powered Business Automation:</span> From chatbots handling<br />
                                            customer
                                            support to AI
                                            managing supply chains, businesses are<br /> leveraging automation to
                                            streamline
                                            operations and reduce human<br /> intervention.</p>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <span className="icon-tick-inside-circle"></span>
                                        </div>
                                        <p><span>Generative AI in Marketing & Content Creation:</span> AI tools like
                                            TextCpg<br /> and
                                            ImageJourney are transforming content production, enabling<br /> businesses to
                                            generate high-quality marketing copy, images, and <br />videos faster.</p>
                                    </li>
                                </ul>
                                <div className="blog-details__img-box">
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <div className="blog-details__img-box-img">
                                                <Image src="/assets/images/blog/blog-details-img-box-img-1.jpg" alt="Image" width={363} height={304} priority />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="blog-details__img-box-img">
                                                <Image src="/assets/images/blog/blog-details-img-box-img-2.jpg" alt="Image" width={363} height={304} priority />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="blog-details__title-2">Cloud Computing & Edge Computing</h3>
                                <p className="blog-details__text-2">Shift from traditional cloud to hybrid and multi-cloud
                                    strategies. Edge computing gaining momentum for faster processing and reduced
                                    latency. The role of serverless computing in optimizing IT operations.</p>
                                <div className="blog-details__author-box">
                                    <div className="blog-details__author-quote">
                                        <Image src="/assets/images/icon/quote.png" alt="Image" width={284} height={204} priority />
                                    </div>
                                    <div className="blog-details__author-name-box">
                                        <span></span>
                                        <h4 className="blog-details__author-name">Jhon Smith</h4>
                                    </div>
                                    <p className="blog-details__author-text">“<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,<br />
                                        “</p>
                                </div>
                                <h3 className="blog-details__title-3">Quantum Computing Breakthroughs</h3>
                                <p className="blog-details__text-3">ow quantum computing is shaping industries like finance,
                                    healthcare, and logistics. Businesses exploring quantum-safe encryption methods.
                                    Major players investing in quantum technology. Faster networks powering real-time
                                    applications, IoT, and smart cities.</p>
                                <div className="blog-details__points-and-img">
                                    <div className="blog-details__points-2">
                                        <ul className="blog-details__points-list-2 list-unstyled">
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <p>Demand for eco-friendly and carbon-<br />neutral IT solutions. </p>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <p>Rise of energy-efficient data centers and<br /> sustainable cloud
                                                    computing.</p>
                                            </li>
                                            <li>
                                                <div className="icon">
                                                    <span className="icon-tick-inside-circle"></span>
                                                </div>
                                                <p>How businesses can implement green IT <br />practices.</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="blog-details__points-img">
                                        <Image src="/assets/images/blog/blog-details-points-img.jpg" alt="Image" width={300} height={202} priority />
                                    </div>
                                </div>
                                <div className="blog-details__tag-and-share">
                                    <div className="blog-details__tag">
                                        <h3 className="blog-details__tag-title">Tags:</h3>
                                        <ul className="blog-details__tag-list list-unstyled">
                                            <li>
                                                <Link href="#">Marketing</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Branding</Link>
                                            </li>
                                            <li>
                                                <Link href="#">SEO</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="blog-details__share-box">
                                        <h3 className="blog-details__share-title">Follow Me:</h3>
                                        <div className="blog-details__share">
                                            <Link href="#"><span className="icon-facebook"></span></Link>
                                            <Link href="#"><span className="icon-dribble"></span></Link>

                                            <Link href="#"><span className="icon-linkedin"></span></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-details__prev-and-next">
                                    <div className="blog-details__prev-box">
                                        <div className="blog-details__prev-img">
                                            <Image src="/assets/images/blog/blog-details-prev-image.jpg" alt="Image" width={80} height={80} priority />
                                        </div>
                                        <div className="blog-details__prev-content">
                                            <div className="blog-details__prev-arrow">
                                                <span className="icon-left-arrow"></span>
                                                <Link href="#">Prev Blog</Link>
                                            </div>
                                            <h4 className="blog-details__prev-title">What Businesses Need to<br /> Know</h4>
                                        </div>
                                    </div>
                                    <div className="blog-details__next-box">
                                        <div className="blog-details__next-content">
                                            <div className="blog-details__next-arrow">
                                                <Link href="#">Next Blog</Link>
                                                <span className="icon-right-arrow"></span>
                                            </div>
                                            <h4 className="blog-details__next-title">Which IT Infrastructure Is<br /> Right
                                                for You?</h4>
                                        </div>
                                        <div className="blog-details__next-img">
                                            <Image src="/assets/images/blog/blog-details-next-image.jpg" alt="Image" width={80} height={80} priority />
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-one">
                                    <h3 className="comment-one__title">Total Comments</h3>
                                    <div className="comment-one__single-inner">
                                        <div className="comment-one__single">
                                            <div className="comment-one__author-inner">
                                                <div className="comment-one__image">
                                                    <Image src="/assets/images/blog/comment-1-1.jpg" alt="Image" width={40} height={40} priority />
                                                </div>
                                                <h3>Mitchell Johnson</h3>
                                                <span> Aug 19, 2024</span>
                                            </div>
                                            <div className="comment-one__content">
                                                <p>AI-powered automation sounds like a game-changer, but I&apos;m concerned
                                                    about
                                                    how it will impact jobs. Will AI replace human employees, or is
                                                    there a
                                                    way for businesses to integrate AI while still maintaining a strong
                                                    workforce?</p>
                                                <div className="comment-one__btn-box">
                                                    <Link href="/blog-details" className="comment-one__btn"><span
                                                            className="fas fa-share"></span>Reply</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment-one__single-inner">
                                        <div className="comment-one__single">
                                            <div className="comment-one__author-inner">
                                                <div className="comment-one__image">
                                                    <Image src="/assets/images/blog/comment-1-2.jpg" alt="Image" width={40} height={40} priority />
                                                </div>
                                                <h3>David Andrew</h3>
                                                <span>Sep 20, 2024</span>
                                            </div>
                                            <div className="comment-one__content">
                                                <p>That&apos;s a great point! While AI can enhance decision-making by
                                                    analyzing large datasets quickly, businesses should use it as a
                                                    supporting tool rather than a complete replacement</p>
                                                <div className="comment-one__btn-box">
                                                    <Link href="/blog-details" className="comment-one__btn"><span
                                                            className="fas fa-share"></span>Reply</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="comment-one__single comment-one__single-3">
                                            <div className="comment-one__author-inner">
                                                <div className="comment-one__image">
                                                    <Image src="/assets/images/blog/comment-1-3.jpg" alt="Image" width={40} height={40} priority />
                                                </div>
                                                <h3>Alisa Olivia</h3>
                                                <span> Aug 19, 2024</span>
                                            </div>
                                            <div className="comment-one__content">
                                                <p>AI-powered automation sounds promising, but isn&apos;t it risky to rely
                                                    too much on AI for decision-making?</p>
                                                <div className="comment-one__btn-box">
                                                    <Link href="/blog-details" className="comment-one__btn"><span
                                                            className="fas fa-share"></span>Reply</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-form">
                                    <div className="contact-one__left">
                                        <div className="contact-one__left-shape-1"></div>
                                        <div className="contact-one__left-shape-2"></div>
                                        <h3 className="contact-one__from-title">How Can We Help You?</h3>
                                        <form className="contact-form-validated contact-one__form"
                                            action="assets/inc/sendemail.php" method="post">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6">
                                                    <h4 className="contact-one__input-title">Full Name</h4>
                                                    <div className="contact-one__input-box">
                                                        <div className="contact-one__input-icon">
                                                            <span className="icon-user-1"></span>
                                                        </div>
                                                        <input type="text" name="name" placeholder="Thomas Alison"
                                                            required />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <h4 className="contact-one__input-title">Email Address</h4>
                                                    <div className="contact-one__input-box">
                                                        <div className="contact-one__input-icon">
                                                            <span className="icon-email"></span>
                                                        </div>
                                                        <input type="email" name="email" placeholder="thomas@domain.com"
                                                            required />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <h4 className="contact-one__input-title">Phone Number</h4>
                                                    <div className="contact-one__input-box">
                                                        <div className="contact-one__input-icon">
                                                            <span className="icon-phone-call"></span>
                                                        </div>
                                                        <input type="text" name="Phone"
                                                            placeholder="+12 (00) 123 4567 890" required />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6">
                                                    <h4 className="contact-one__input-title">Subject</h4>
                                                    <div className="contact-one__input-box">
                                                        <div className="select-box">
                                                            <CustomSelect
                                                                options={options}
                                                                placeholder="Thomas Alison"
                                                                onChange={setSelectedValue}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-12">
                                                <h4 className="contact-one__input-title">Inquiry about </h4>
                                                <div className="contact-one__input-box text-message-box">
                                                    <div className="contact-one__input-icon">
                                                        <span className="icon-edit"></span>
                                                    </div>
                                                    <textarea name="message"
                                                        placeholder="Write your message"></textarea>
                                                </div>
                                                <div className="contact-one__btn-box">
                                                    <button type="submit" className="thm-btn"><span>Submit
                                                            Now</span><i className="icon-right-arrow"></i></button>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="result"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="sidebar">
                            
                            <div className="sidebar__single sidebar__search">
                                <div className="sidebar__title-box">
                                    <div className="sidebar__title-shape"></div>
                                    <h3 className="sidebar__title">Search </h3>
                                </div>
                                <p className="sidebar__search-text">Search blogs to discover a vast world of online content
                                    on countless topics.</p>
                                <form action="#" className="sidebar__search-form">
                                    <input type="search" placeholder="Search Blogs" />
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </form>
                            </div>
                            
                            <div className="sidebar__single sidebar__category">
                                <div className="sidebar__title-box">
                                    <div className="sidebar__title-shape"></div>
                                    <h3 className="sidebar__title">Category </h3>
                                </div>
                                <ul className="sidebar__category-list list-unstyled">
                                    <li><Link href="#">Web Design & Development <span>(15)</span></Link></li>
                                    <li className="active"><Link href="#">Products Design
                                            <span>(20)</span></Link></li>
                                    <li><Link href="#">Artificial Intelligence <span>(42)</span></Link></li>
                                    <li><Link href="#">Technology <span>(89)</span></Link></li>
                                </ul>
                            </div>
                            
                            <div className="sidebar__single sidebar__post">
                                <div className="sidebar__title-box">
                                    <div className="sidebar__title-shape"></div>
                                    <h3 className="sidebar__title">Recent Post </h3>
                                </div>
                                <ul className="sidebar__post-list list-unstyled">
                                    <li>
                                        <div className="sidebar__post-image">
                                            <Image src="/assets/images/blog/blog-lp-1.jpg" alt="Image" width={80} height={80} priority />
                                        </div>
                                        <div className="sidebar__post-content">
                                            <p className="sidebar__post-date"><span className="icon-calendar"></span>March 18,
                                                2025</p>
                                            <h3 className="sidebar__post-title"><Link href="/blog-details">Adapting to
                                                    Digital Marketing Trends: Staying Ahead</Link></h3>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="sidebar__post-image">
                                            <Image src="/assets/images/blog/blog-lp-2.jpg" alt="Image" width={80} height={80} priority />
                                        </div>
                                        <div className="sidebar__post-content">
                                            <p className="sidebar__post-date"><span className="icon-calendar"></span>April 18,
                                                2025</p>
                                            <h3 className="sidebar__post-title"><Link href="/blog-details">Standing Out in
                                                    a Competitive Market: </Link></h3>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="sidebar__post-image">
                                            <Image src="/assets/images/blog/blog-lp-3.jpg" alt="Image" width={80} height={80} priority />
                                        </div>
                                        <div className="sidebar__post-content">
                                            <p className="sidebar__post-date"><span className="icon-calendar"></span>Jun 18,
                                                2025</p>
                                            <h3 className="sidebar__post-title"><Link href="/blog-details">The Importance
                                                    of Accurate Performance Reporting </Link></h3>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="sidebar__single sidebar__tags">
                                <div className="sidebar__title-box">
                                    <div className="sidebar__title-shape"></div>
                                    <h3 className="sidebar__title">Keywords </h3>
                                </div>
                                <ul className="sidebar__tags-list clearfix list-unstyled">
                                    <li><Link href="#">Development</Link></li>
                                    <li><Link href="#">Innovation</Link></li>
                                    <li><Link href="#">Analytics</Link></li>
                                    <li><Link href="#">Marketing</Link></li>
                                    <li><Link href="#">Innovation</Link></li>
                                    <li><Link href="#">Technology</Link></li>
                                    <li><Link href="#">Ui Design</Link></li>
                                </ul>
                            </div>
                            
                            <div className="sidebar__single sidebar__newsletter">
                                <div className="sidebar__title-box">
                                    <div className="sidebar__title-shape"></div>
                                    <h3 className="sidebar__title">Subscribe </h3>
                                </div>
                                <p className="sidebar__newsletter-text">Subscribe our newsletter to get everyday update
                                    about our blogs</p>
                                <form action="#" className="sidebar__newsletter-form">
                                    <div className="sidebar__newsletter-input">
                                        <div className="sidebar__newsletter-input-icon">
                                            <span className="icon-email"></span>
                                        </div>
                                        <input type="search" placeholder="Email" />
                                    </div>
                                    <button type="submit" className="thm-btn">Subcribe Now<i
                                            className="icon-right-arrow-1"></i></button>
                                </form>
                            </div>
                            
                            <div className="sidebar__single sidebar__client-info-box">
                                <div className="sidebar__client-img-box">
                                    <div className="sidebar__client-img">
                                            <Image src="/assets/images/blog/sidebar-client-img-1.jpg" alt="Image" width={72} height={72} priority />
                                    </div>
                                </div>
                                <h3 className="sidebar__client-title">Jordan M. Walk</h3>
                                <p className="sidebar__client-sub-title">Digital Marketer</p>
                                <p className="sidebar__client-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                <div className="sidebar__client-social-box">
                                    <p className="sidebar__client-social-title">Follow Me</p>
                                    <div className="sidebar__client-social">
                                        <Link href="#"><span className="icon-facebook"></span></Link>
                                        <Link href="#"><span className="icon-dribble"></span></Link>

                                        <Link href="#"><span className="icon-linkedin"></span></Link>
                                    </div>
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
