
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";

export default function LoginPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Login">
            <section className="login-one">
                <div className="container">
                    <div className="login-one__form">
                        <div className="inner-title text-center">
                            <h2>Login Here</h2>
                        </div>
                        <form id="login-one__form" name="Login-one_form" action="#" method="post">
                            <div className="row">
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
                                            <input type="text" name="form_password" id="formPassword"
                                                placeholder="Password..." required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <div className="form-group">
                                        <button className="thm-btn" type="submit" data-loading-text="Please wait...">Login Here
                                            <span className="icon-right-arrow"></span>
                                        </button>
                                    </div>
                                </div>
                                <div className="remember-forget">
                                    <div className="checked-box1">
                                        <input type="checkbox" name="saveMyInfo" id="saveinfo" defaultChecked />
                                        <label htmlFor="saveinfo">
                                            <span></span>
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="forget">
                                        <Link href="#">Forget password?</Link>
                                    </div>
                                </div>

                                <div className="create-account text-center">
                                    <p>Not registered yet? <Link href="/sign-up">Create an Account</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
