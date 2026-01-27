import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";

export default function WishlistPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Wishlist">
            <section className="wishlist-page">
                <div className="container">
                    <div className="table-responsive">
                        <table className="table wishlist-table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Unit Price</th>
                                    <th>Stock Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <div className="product-box">
                                            <div className="cross-icon">
                                                <Link href="/wishlist"><i className="fas fa-times"></i></Link>
                                            </div>
                                            <div className="img-box">
                                                <Image src="/assets/images/shop/wishlist-page-img-1.png" alt="Image" width={120} height={120} priority />
                                            </div>
                                            <h3><Link href="/product-details">3d rendering metallic ai</Link></h3>
                                        </div>
                                    </td>
                                    <td>$120.99</td>
                                    <td>In Stock</td>
                                    <td>
                                        <div className="product-select">
                                            <Link className="thm-btn" href="/wishlist">Select Product<span
                                                    className="icon-right-arrow"></span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="product-box">
                                            <div className="cross-icon">
                                                <Link href="/wishlist"><i className="fas fa-times"></i></Link>
                                            </div>
                                            <div className="img-box">
                                                <Image src="/assets/images/shop/wishlist-page-img-2.png" alt="Image" width={120} height={120} priority />
                                            </div>
                                            <h3><Link href="/product-details">3d render robot</Link></h3>
                                        </div>
                                    </td>
                                    <td>$100.99</td>
                                    <td>In Stock</td>
                                    <td>
                                        <div className="product-select">
                                            <Link className="thm-btn" href="/wishlist">Select Product<span
                                                    className="icon-right-arrow"></span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="product-box">
                                            <div className="cross-icon">
                                                <Link href="/wishlist"><i className="fas fa-times"></i></Link>
                                            </div>
                                            <div className="img-box">
                                                <Image src="/assets/images/shop/wishlist-page-img-3.png" alt="Image" width={120} height={120} priority />
                                            </div>
                                            <h3><Link href="/product-details">motorcycle helmet</Link></h3>
                                        </div>
                                    </td>
                                    <td>$106.99</td>
                                    <td>In Stock</td>
                                    <td>
                                        <div className="product-select">
                                            <Link className="thm-btn" href="/wishlist">Select Product<span
                                                    className="icon-right-arrow"></span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="product-box">
                                            <div className="cross-icon">
                                                <Link href="/wishlist"><i className="fas fa-times"></i></Link>
                                            </div>
                                            <div className="img-box">
                                                <Image src="/assets/images/shop/wishlist-page-img-4.png" alt="Image" width={120} height={120} priority />
                                            </div>
                                            <h3><Link href="/product-details">ski helmet with visor</Link></h3>
                                        </div>
                                    </td>
                                    <td>$170.00</td>
                                    <td>In Stock</td>
                                    <td>
                                        <div className="product-select">
                                            <Link className="thm-btn" href="/wishlist">Select Product<span
                                                    className="icon-right-arrow"></span>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className="product-details__social two">
                        <div className="title">
                            <h3>Share with friends:</h3>
                        </div>
                        <div className="product-details__social-link">
                            <Link href="#"><span className="fab fa-twitter"></span></Link>
                            <Link href="#"><span className="fab fa-facebook"></span></Link>
                            <Link href="#"><span className="fab fa-pinterest-p"></span></Link>
                            <Link href="#"><span className="fab fa-instagram"></span></Link>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
