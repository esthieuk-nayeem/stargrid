import Link from "next/link";
import Image from "next/image";
import MobileMenu from "../MobileMenu";
import Menu from "../Menu";

// ✅ Define props type
type Header1Props = {
  scroll: boolean;
  handleMobileMenu: () => void;
  handlePopup: () => void;
  handleSidebar: () => void;
};

export default function Header1({ scroll, handleMobileMenu, handlePopup, handleSidebar }: Header1Props) {
  return (
    <>
      {/* main header */}
      <header className={`main-header-two ${scroll ? "fixed-header" : ""}`}>

        {/* <div className="main-menu-two__top">
            <div className="main-menu-two__top-inner">
                <p className="main-menu-two__top-text">techguru That Ensures Your IT Runs Seamlessly, Anytime and Every
                    Time</p>
                <ul className="list-unstyled main-menu-two__contact-list">
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
            </div>
        </div> */}
        <nav className="main-menu main-menu-two">
            <div className="main-menu-two__wrapper">
                <div className="main-menu-two__wrapper-inner">
                    <div className="main-menu-two__left">
                        <div className="main-menu-two__logo">
                            <Link href="/"><Image src="/assets/images/resources/cellsat.png" alt="Image" width={186} height={45} priority /></Link>
                        </div>
                    </div>
                    <div className="main-menu-two__main-menu-box">
                        <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}><i className="fa fa-bars"></i></Link>
                        <Menu/>
                    </div>
                    <div className="main-menu-two__right">
                        <div className="main-menu-two__search-box">
                            <Link href="#"
                                className="main-menu-two__search searcher-toggler-box icon-search-interface-symbol" onClick={handlePopup}></Link>
                        </div>
                        <div className="main-menu-two__btn-box">
                            <Link href="/contact" className="thm-btn">Get in Touch<span
                                    className="icon-right-arrow"></span></Link>
                        </div>
                        <div className="main-menu-two__nav-sidebar-icon">
                            <Link className="navSidebar-button" href="#" onClick={handleSidebar}>
                                <span className="icon-dots-menu-one"></span>
                                <span className="icon-dots-menu-two"></span>
                                <span className="icon-dots-menu-three"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {/* sticky header */}
        <div className={`sticky-header main-menu main-menu-two ${scroll ? "animated slideInDown" : ""}`}>
          <div className="sticky-header__content">
            <div className="main-menu-two__wrapper">
                <div className="main-menu-two__wrapper-inner">
                    <div className="main-menu-two__left">
                        <div className="main-menu-two__logo">
                            <Link href="/"><Image src="/assets/images/resources/cellsat.png" alt="Image" width={186} height={36} priority /></Link>
                        </div>
                    </div>
                    <div className="main-menu-two__main-menu-box">
                        <Link href="#" className="mobile-nav__toggler" onClick={handleMobileMenu}><i className="fa fa-bars"></i></Link>
                        <Menu/>
                    </div>
                    <div className="main-menu-two__right">
                        <div className="main-menu-two__search-box">
                            <Link href="#"
                                className="main-menu-two__search searcher-toggler-box icon-search-interface-symbol" onClick={handlePopup}></Link>
                        </div>
                        <div className="main-menu-two__btn-box">
                            <Link href="/contact" className="thm-btn">Get in Touch<span
                                    className="icon-right-arrow"></span></Link>
                        </div>
                        <div className="main-menu-two__nav-sidebar-icon">
                            <Link className="navSidebar-button" href="#" onClick={handleSidebar}>
                                <span className="icon-dots-menu-one"></span>
                                <span className="icon-dots-menu-two"></span>
                                <span className="icon-dots-menu-three"></span>
                            </Link>
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
