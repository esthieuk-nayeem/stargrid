import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";

export default function SignupPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Sign UP">
            <section className="sign-up-one">
                <div className="container">
                    <div className="sign-up-one__form">
                        <div className="inner-title text-center">
                            <h2>Sing Up</h2>
                        </div>
                        <form id="sign-up-one__form" name="sign-up-one_form" action="#" method="post">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_name" id="formName" placeholder="Name..."
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="email" name="form_email" id="formEmail" placeholder="Email..."
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_phone" id="formPhone" placeholder="Phone..."
                                                required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <div className="input-box">
                                            <input type="text" name="form_password" id="formPassword"
                                                placeholder="Password..." required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <button className="thm-btn" type="submit" data-loading-text="Please wait...">Sign UP
                                            <span className="icon-right-arrow"></span></button>
                                    </div>
                                </div>
                            </div>
                            <div className="google-facebook">
                                <Link href="https://www.google.com/">
                                    <div className="icon">
                                        <Image src="/assets/images/icon/icon-google-2.png" alt="Icon" width={20} height={20} priority />
                                    </div>
                                    Continue with Google
                                </Link>
                                <Link href="https://www.facebook.com/">
                                    <div className="icon">
                                        <Image src="/assets/images/icon/icon-facebook.png" alt="Icon" width={20} height={20} priority />
                                    </div>
                                    Continue with Facebook
                                </Link>
                            </div>
                            <div className="create-account text-center">
                                <p>Already have an account? <Link href="/login">Login Here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
