
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const sections = ["#about", "#services", "#portfolio", "#testimonial", "#blog", "#contact"];

export default function OnepageMenu_One() {
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    // Enable smooth scroll globally
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100; // offset for early activation

      for (const section of sections) {
        const el = document.querySelector(section);
        if (el) {
          const offsetTop = el.getBoundingClientRect().top + window.scrollY;
          const offsetBottom = offsetTop + el.clientHeight;

          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setCurrent(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = ""; // cleanup
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ul className="main-menu__list one-page-scroll-menu">
      {/* Home Mega Menu */}
      <li className={`dropdown megamenu ${current === "#home" ? "current" : ""}`}>
        <a href="#home" onClick={(e) => handleClick(e, "#home")}>
          Home
        </a>
        <ul>
          <li>
{/* 
            <section className="home-showcase">
              <div className="container">
                <div className="home-showcase__inner">
                  <div className="row">
                  
                    <div className="col-lg-4">
                      <div className="home-showcase__item">
                        <div className="home-showcase__image">
                          <Image
                            src="/assets/images/home-showcase/home-showcase-1-1.jpg"
                            alt="Home 01"
                            width={400}
                            height={300}
                          />
                          <div className="home-showcase__buttons">
                            <Link
                              href="/"
                              className="thm-btn home-showcase__buttons__item"
                            >
                              Multi Page <span className="icon-right-arrow"></span>
                            </Link>
                            <Link
                              href="/onepage"
                              className="thm-btn home-showcase__buttons__item"
                            >
                              One Page <span className="icon-right-arrow"></span>
                            </Link>
                          </div>
                        </div>
                        <h3 className="home-showcase__title">Home Page 01</h3>
                      </div>
                    </div>

                 
                    <div className="col-lg-4">
                      <div className="home-showcase__item">
                        <div className="home-showcase__image">
                          <Image
                            src="/assets/images/home-showcase/home-showcase-1-2.jpg"
                            alt="Home 02"
                            width={400}
                            height={300}
                          />
                          <div className="home-showcase__buttons">
                            <Link
                              href="/index2"
                              className="thm-btn home-showcase__buttons__item"
                            >
                              Multi Page <span className="icon-right-arrow"></span>
                            </Link>
                            <Link
                              href="/index2-onepage"
                              className="thm-btn home-showcase__buttons__item"
                            >
                              One Page <span className="icon-right-arrow"></span>
                            </Link>
                          </div>
                        </div>
                        <h3 className="home-showcase__title">Home Page 02</h3>
                      </div>
                    </div>

                   
                    <div className="col-lg-4">
                      <div className="home-showcase__item">
                        <div className="home-showcase__image">
                          <Image
                            src="/assets/images/home-showcase/home-showcase-1-3.jpg"
                            alt="Home 03"
                            width={400}
                            height={300}
                          />
                          <div className="home-showcase__buttons">
                            <Link
                              href="/index3"
                              className="thm-btn home-showcase__buttons__item"
                            >
                              Multi Page <span className="icon-right-arrow"></span>
                            </Link>
                            <Link
                              href="/index3-onepage"
                              className="thm-btn home-showcase__buttons__item"
                            >
                              One Page <span className="icon-right-arrow"></span>
                            </Link>
                          </div>
                        </div>
                        <h3 className="home-showcase__title">Home Page 03</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

          </li>
        </ul>
      </li>

      {/* Other Sections */}
      {sections.map((section) => (
        <li
          key={section}
          className={`scrollToLink ${current === section ? "current" : ""}`}
        >
          <a href={section} onClick={(e) => handleClick(e, section)}>
            {section.replace("#", "").charAt(0).toUpperCase() +
              section.replace("#", "").slice(1)}
          </a>
        </li>
      ))}
    </ul>
  );
}
