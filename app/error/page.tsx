
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
export default function Error_Page() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="404 Error">
            <section className="error-page">
                <div className="container">
                    <div className="error-page__inner text-center">
                        <div className="error-page__img float-bob-y">
                            <Image src="/assets/images/resources/error-page-img1.png" alt="Image" width={903} height={524} priority />
                        </div>

                        <div className="error-page__content">
                            <h2>Oops! Page Not Found!</h2>
                            <p>The page you are looking for does not exist. It might have been moved or deleted.</p>
                            <div className="btn-box">
                                <Link className="thm-btn" href="/">Back To
                                    Home <span className="icon-right-arrow"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
