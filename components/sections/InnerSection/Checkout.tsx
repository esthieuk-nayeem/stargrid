"use client";

import { useState } from "react";
import Link from "next/link";
import CustomSelect from "@/components/elements/CustomSelect";

export default function Checkout() {

    // select-box
    const options = [
        { value: "0", label: "Canada" },
        { value: "1", label: "England" },
        { value: "2", label: "Australia" },
        { value: "3", label: "USA" },
    ];

    const [selectedValue, setSelectedValue] = useState("");

    // payment
    const [activeIndex, setActiveIndex] = useState(0); // first item active by default

    const handleToggle = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <section className="checkout-page">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-6">
                            <div className="billing_details">
                                <div className="billing_title">
                                    <p>Returning Customer? <a href="#">Click here to Login</a></p>
                                    <h2>Billing details</h2>
                                </div>
                                <form className="billing_details_form">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="billing_input_box">
                                                <div className="select-box">
                                                    <CustomSelect
                                                        options={options}
                                                        placeholder="Select a country"
                                                        onChange={setSelectedValue}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row bs-gutter-x-20">
                                        <div className="col-xl-6">
                                            <div className="billing_input_box">
                                                <input type="text" name="first_name" placeholder="First name"
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="billing_input_box">
                                                <input type="text" name="last_name" placeholder="Last name"
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="billing_input_box">
                                                <input type="text" name="company_name" placeholder="Company" />
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="billing_input_box">
                                                <input type="text" name="Address" placeholder="Address" />
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="billing_input_box">
                                                <input type="text" name="company_name"
                                                    placeholder="Appartment, unit, etc. (optional)" />
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="billing_input_box">
                                                <input type="text" name="Town/City" placeholder="Town / City"
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row bs-gutter-x-20">
                                        <div className="col-xl-6">
                                            <div className="billing_input_box">
                                                <input type="text" name="State" placeholder="State" required />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="billing_input_box">
                                                <input name="form_zip" type="text" pattern="[0-9]*" placeholder="Zip code" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="billing_input_box">
                                                <input name="email" type="email" placeholder="Email address" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="billing_input_box">
                                                <input type="tel" name="form_phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                    required placeholder="Phone" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="billing_input_box">
                                                <textarea placeholder="Type your note" name="form_order_notes"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="checked-box">
                                                <input type="checkbox" name="skipper10" id="skipper10" defaultChecked />
                                                <label htmlFor="skipper10"><span></span>Create an account?</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="billing_details_form-btns">
                                                <div className="billing_details_form-btn-1">
                                                    <button type="submit" className="thm-btn">Continue Shopping <span
                                                            className="icon-right-arrow"></span>
                                                    </button>
                                                </div>
                                                <div className="billing_details_form-btn-2">
                                                    <button type="submit" className="thm-btn">Return To Cart<span
                                                            className="icon-right-arrow"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6">
                            <div className="sidebar-order-summary">
                                <div className="title-box">
                                    <h3>Your Order</h3>
                                </div>

                                <ul className="sidebar-order-summary__list list-unstyled">
                                    <li>
                                        <div className="left-text">
                                            <p>Bolt Sweatshirt</p>
                                        </div>

                                        <div className="right-text">
                                            <p>$88.00</p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="left-text">
                                            <p>Cock Kat Kitten <br /> Milk X 02</p>
                                        </div>

                                        <div className="right-text">
                                            <p>$188.00</p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="left-text">
                                            <p>Sub total</p>
                                        </div>

                                        <div className="right-text">
                                            <p>$288.00</p>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="left-text">
                                            <p>Shipping</p>
                                        </div>

                                        <div className="right-text">
                                            <ul>
                                                <li>
                                                    <input type="radio" id="flat" name="rating" defaultChecked />
                                                    <label htmlFor="flat">
                                                        <i></i>
                                                        Flat Rate: $9.00
                                                    </label>
                                                </li>

                                                <li>
                                                    <input type="radio" id="free" name="rating" />
                                                    <label htmlFor="free">
                                                        <i></i>
                                                        Free Shipping
                                                    </label>
                                                </li>

                                                <li>
                                                    <input type="radio" id="local" name="rating" />
                                                    <label htmlFor="local">
                                                        <i></i>
                                                        Local Pickup
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="left-text">
                                            <p>Total</p>
                                        </div>

                                        <div className="right-text">
                                            <p>$388.00</p>
                                        </div>
                                    </li>
                                </ul>

                                <div className="sidebar-order-summary__Payment">
                                    <div className="title-box">
                                        <h3>Payment Method</h3>
                                    </div>

                                    <div className="checkout__payment">
                                        <div
                                            className={`checkout__payment__item ${
                                            activeIndex === 0 ? "checkout__payment__item--active" : ""
                                            }`}
                                        >
                                            <h3
                                            className="checkout__payment__title"
                                            onClick={() => handleToggle(0)}
                                            style={{ cursor: "pointer" }}
                                            >
                                            Direct bank transfer
                                            </h3>

                                            <div
                                            className="checkout__payment__content"
                                            style={{ display: activeIndex === 0 ? "block" : "none" }}
                                            >
                                            A Direct Bank Transfer is a method of sending money from one bank
                                            account to another without using cash, checks, or third-party payment
                                            services.
                                            </div>
                                        </div>
                                        
                                        <div
                                            className={`checkout__payment__item ${
                                            activeIndex === 1 ? "checkout__payment__item--active" : ""
                                            }`}
                                        >
                                            <h3
                                            className="checkout__payment__title"
                                            onClick={() => handleToggle(1)}
                                            style={{ cursor: "pointer" }}
                                            >
                                            Paypal payment
                                            </h3>

                                            <div
                                            className="checkout__payment__content"
                                            style={{ display: activeIndex === 1 ? "block" : "none" }}
                                            >
                                            PayPal is an online payment system that allows users to send and
                                            receive money securely. It supports personal and business transactions,
                                            including shopping, invoicing, and international transfers.
                                            </div>
                                        </div>


                                        <div
                                            className={`checkout__payment__item ${
                                            activeIndex === 2 ? "checkout__payment__item--active" : ""
                                            }`}
                                        >
                                            <h3
                                            className="checkout__payment__title"
                                            onClick={() => handleToggle(2)}
                                            style={{ cursor: "pointer" }}
                                            >
                                            Cheque Payment
                                            </h3>

                                            <div
                                            className="checkout__payment__content"
                                            style={{ display: activeIndex === 2 ? "block" : "none" }}
                                            >
                                            A cheque payment is a written, dated, and signed document that
                                            instructs a bank to pay a specific amount of money from the issuer&apos;s
                                            account to the payee.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sidebar-order-summary__bottom">
                                    <p className="text1">your personal data will be used to process your order your support
                                        experience throughout this website and for other purposes described in our <a
                                            href="#">privacy policy</a></p>

                                    <div className="sidebar-order-summary__checked">
                                        <input type="checkbox" name="skipper1" id="skipper2" defaultChecked />
                                        <label htmlFor="skipper2"><span></span>I have read and agree to the website <a
                                                href="#">terms and conditions</a></label>
                                    </div>

                                    <div className="sidebar-order-summary__btn">
                                        <Link className="thm-btn" href="/checkout">Place your order <span
                                                className="icon-right-arrow"></span>
                                        </Link>
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
