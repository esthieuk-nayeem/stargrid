import Link from "next/link";
import Image from "next/image";
import MobileMenu from "../MobileMenu";
import Menu from "../Menu";

// ✅ Define props type
type Header3Props = {
  scroll: boolean;
  handleMobileMenu: () => void;
  handlePopup: () => void;
};

export default function Header3({ scroll, handleMobileMenu, handlePopup }: Header3Props) {
  return (
    <>
      {/* main header */}
      <header className={`main-header ${scroll ? "fixed-header" : ""}`}>
        <div className="main-menu__top">
            <div className="container">
                <div className="main-menu__top-inner">
                    <div className="main-menu__top-social">
                        <Link href="#"><span className="icon-facebook"></span></Link>
                        <Link href="#"><span className="icon-dribble"></span></Link>

                        <Link href="#"><span className="icon-linkedin"></span></Link>
                    </div>
                    <ul className="list-unstyled main-menu__contact-list">
                        <li>
                            <div className="icon">
                                <i className="icon-pin"></i>
                            </div>
                            <div className="text">
                                <p>1629 N. Dixie Avenue, Kentucky, 42701</p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="icon-search-mail"></i>
                            </div>
                            <div className="text">
                                <p><Link href="mailto:example@domain.com">example@domain.com</Link>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="icon-phone-call"></i>
                            </div>
                            <div className="text">
                                <p><Link href="tel:1212345678900">+12 (123) 456 78900</Link></p>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-unstyled main-menu__top-menu">
                        <li><Link href="/about">Help</Link></li>
                        <li><Link href="/contact">Support</Link></li>
                        <li><Link href="/faq">Faqs</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        <nav className="main-menu">
            <div className="main-menu__wrapper">
                <div className="container">
                    <div className="main-menu__wrapper-inner">
                        <div className="main-menu__left">
                            <div className="main-menu__logo">
                                <Link href="/index2"><Image src="/assets/images/resources/logo-1.png" alt="Image" width={186} height={36} priority /></Link>
                            </div>
                        </div>
                        <div className="main-menu__main-menu-box">
                            <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}><i className="fa fa-bars"></i></Link>
                            <Menu/>
                        </div>
                        <div className="main-menu__right">
                            <div className="main-menu__search-box">
                                <Link href="#"
                                    className="main-menu__search searcher-toggler-box icon-search-interface-symbol" onClick={handlePopup}></Link>
                            </div>
                            <div className="main-menu__btn-box">
                                <Link href="/contact" className="thm-btn">Get in Touch<span
                                        className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* sticky header */}
        <div className={`sticky-header main-menu ${scroll ? "animated slideInDown" : ""}`}>
            <div className="sticky-header__content">
                <div className="main-menu__wrapper">
                    <div className="container">
                        <div className="main-menu__wrapper-inner">
                            <div className="main-menu__left">
                                <div className="main-menu__logo">
                                    <Link href="/index2"><Image src="/assets/images/resources/logo-1.png" alt="Image" width={186} height={36} priority /></Link>
                                </div>
                            </div>
                            <div className="main-menu__main-menu-box">
                                <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}><i className="fa fa-bars"></i></Link>
                                <Menu/>
                            </div>
                            <div className="main-menu__right">
                                <div className="main-menu__search-box">
                                    <Link href="#"
                                        className="main-menu__search searcher-toggler-box icon-search-interface-symbol" onClick={handlePopup}></Link>
                                </div>
                                <div className="main-menu__btn-box">
                                    <Link href="/contact" className="thm-btn">Get in Touch<span
                                            className="icon-right-arrow"></span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        {/* ✅ Fixed MobileMenu props */}
        <MobileMenu
          isSidebar={true}
          handleMobileMenu={handleMobileMenu}
        />
      </header>
    </>
  );
}
