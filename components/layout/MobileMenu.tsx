
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type MobileMenuProps = {
  isSidebar: boolean;
  handleMobileMenu: () => void;
};

export default function MobileMenu({ isSidebar, handleMobileMenu }: MobileMenuProps) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (key: number) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Menu Wrapper */}
      <div className={`mobile-nav__wrapper ${isSidebar ? "expanded" : ""}`}>
        {/* Overlay */}
        <div
          className="mobile-nav__overlay mobile-nav__toggler"
          onClick={handleMobileMenu}
        ></div>

        {/* Mobile Menu Content */}
        <div className="mobile-nav__content">
          {/* Close Button */}
          <span
            className="mobile-nav__close mobile-nav__toggler"
            onClick={handleMobileMenu}
          >
            <i className="fa fa-times"></i>
          </span>

          {/* Logo */}
          <div className="logo-box">
            <Link href="/" aria-label="logo image" onClick={handleMobileMenu}>
              <Image
                src="/assets/images/resources/logo-2.png"
                alt="Logo"
                width={150}
                height={32}
                priority
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="mobile-nav__container">
            <ul className="main-menu__list">
              {/* Home */}
              <li className="dropdown">
                <Link href="#">Home</Link>
                <ul
                  style={{ display: activeDropdown === 0 ? "block" : "none" }}
                >
                  <li><Link href="/" onClick={handleMobileMenu}>Home One Multi Page</Link></li>
                  <li><Link href="/onepage" onClick={handleMobileMenu}>Home One OnePage</Link></li>
                  <li><Link href="/index2" onClick={handleMobileMenu}>Home Two Multi Page</Link></li>
                  <li><Link href="/index2-onepage" onClick={handleMobileMenu}>Home Two OnePage</Link></li>
                  <li><Link href="/index3" onClick={handleMobileMenu}>Home Three Multi Page</Link></li>
                  <li><Link href="/index3-onepage" onClick={handleMobileMenu}>Home Three OnePage</Link></li>
                </ul>
                <div
                  className={`dropdown-btn ${activeDropdown === 0 ? "open" : ""}`}
                  onClick={() => toggleDropdown(0)}
                >
                  <span className="fa fa-angle-down" />
                </div>
              </li>

              {/* About */}
              <li className={isActive("/about") ? "current" : ""}>
                <Link href="/about" onClick={handleMobileMenu}>
                  About
                </Link>
              </li>

              {/* Pages */}
              <li className="dropdown">
                <Link href="#">Pages</Link>
                <ul
                  style={{ display: activeDropdown === 1 ? "block" : "none" }}
                >
                  <li><Link href="/team" onClick={handleMobileMenu}>Team</Link></li>
                  <li><Link href="/team-carousel" onClick={handleMobileMenu}>Team Carousel</Link></li>
                  <li><Link href="/team-details" onClick={handleMobileMenu}>Team Details</Link></li>
                  <li><Link href="/portfolio" onClick={handleMobileMenu}>Portfolio</Link></li>
                  <li><Link href="/portfolio-details" onClick={handleMobileMenu}>Portfolio Details</Link></li>
                  <li><Link href="/testimonials" onClick={handleMobileMenu}>Testimonials</Link></li>
                  <li><Link href="/pricing" onClick={handleMobileMenu}>Pricing</Link></li>
                  <li><Link href="/gallery" onClick={handleMobileMenu}>Gallery</Link></li>
                  <li><Link href="/faq" onClick={handleMobileMenu}>FAQs</Link></li>
                  <li><Link href="/error" onClick={handleMobileMenu}>404 Error</Link></li>
                  <li><Link href="/coming-soon" onClick={handleMobileMenu}>Coming Soon</Link></li>
                </ul>
                <div
                  className={`dropdown-btn ${activeDropdown === 1 ? "open" : ""}`}
                  onClick={() => toggleDropdown(1)}
                >
                  <span className="fa fa-angle-down" />
                </div>
              </li>

              {/* Services */}
              <li className="dropdown">
                <Link href="#">Services</Link>
                <ul
                  style={{ display: activeDropdown === 2 ? "block" : "none" }}
                >
                  <li><Link href="/services" onClick={handleMobileMenu}>Services</Link></li>
                  <li><Link href="/services-carousel" onClick={handleMobileMenu}>Services Carousel</Link></li>
                  <li><Link href="/threat-detection-prevention" onClick={handleMobileMenu}>Threat Detection</Link></li>
                  <li><Link href="/endpoint-device-security" onClick={handleMobileMenu}>Device Security</Link></li>
                  <li><Link href="/data-protection-privacy" onClick={handleMobileMenu}>Data Protection</Link></li>
                  <li><Link href="/backup-recovery" onClick={handleMobileMenu}>Backup & Recovery</Link></li>
                  <li><Link href="/advanced-technology" onClick={handleMobileMenu}>Advanced Technology</Link></li>
                  <li><Link href="/cloud-managed-services" onClick={handleMobileMenu}>Cloud Managed Services</Link></li>
                </ul>
                <div
                  className={`dropdown-btn ${activeDropdown === 2 ? "open" : ""}`}
                  onClick={() => toggleDropdown(2)}
                >
                  <span className="fa fa-angle-down" />
                </div>
              </li>

              {/* Shop */}
              <li className="dropdown">
                <Link href="#">Shop</Link>
                <ul
                  style={{ display: activeDropdown === 3 ? "block" : "none" }}
                >
                  <li><Link href="/products" onClick={handleMobileMenu}>Products</Link></li>
                  <li><Link href="/product-details" onClick={handleMobileMenu}>Product Details</Link></li>
                  <li><Link href="/cart" onClick={handleMobileMenu}>Cart</Link></li>
                  <li><Link href="/checkout" onClick={handleMobileMenu}>Checkout</Link></li>
                  <li><Link href="/wishlist" onClick={handleMobileMenu}>Wishlist</Link></li>
                  <li><Link href="/sign-up" onClick={handleMobileMenu}>Sign Up</Link></li>
                  <li><Link href="/login" onClick={handleMobileMenu}>Login</Link></li>
                </ul>
                <div
                  className={`dropdown-btn ${activeDropdown === 3 ? "open" : ""}`}
                  onClick={() => toggleDropdown(3)}
                >
                  <span className="fa fa-angle-down" />
                </div>
              </li>

              {/* Blog */}
              <li className="dropdown">
                <Link href="#">Blog</Link>
                <ul
                  style={{ display: activeDropdown === 4 ? "block" : "none" }}
                >
                  <li><Link href="/blog" onClick={handleMobileMenu}>Blog</Link></li>
                  <li><Link href="/blog-carousel" onClick={handleMobileMenu}>Blog Carousel</Link></li>
                  <li><Link href="/blog-list" onClick={handleMobileMenu}>Blog List</Link></li>
                  <li><Link href="/blog-list-2" onClick={handleMobileMenu}>Blog List Two</Link></li>
                  <li><Link href="/blog-details" onClick={handleMobileMenu}>Blog Details</Link></li>
                </ul>
                <div
                  className={`dropdown-btn ${activeDropdown === 4 ? "open" : ""}`}
                  onClick={() => toggleDropdown(4)}
                >
                  <span className="fa fa-angle-down" />
                </div>
              </li>

              {/* Contact */}
              <li className={isActive("/contact") ? "current" : ""}>
                <Link href="/contact" onClick={handleMobileMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope"></i>
              <Link href="mailto:needhelp@techguru.com">needhelp@techguru.com</Link>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <Link href="tel:6668880000">666 888 0000</Link>
            </li>
          </ul>

          {/* Social Links */}
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <Link href="#" className="fab fa-twitter"></Link>
              <Link href="#" className="fab fa-facebook-square"></Link>
              <Link href="#" className="fab fa-pinterest-p"></Link>
              <Link href="#" className="fab fa-instagram"></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
