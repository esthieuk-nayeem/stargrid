"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomSelect from "@/components/elements/CustomSelect";

export default function ShopCart() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "3d rendering metallic ai",
      price: 10.99,
      image: "/assets/images/shop/cart-page-img-1.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "3d render robot",
      price: 10.99,
      image: "/assets/images/shop/cart-page-img-2.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "rendering metallic ai",
      price: 10.99,
      image: "/assets/images/shop/cart-page-img-1.png",
      quantity: 1,
    },
    {
      id: 4,
      name: "3d render robot",
      price: 10.99,
      image: "/assets/images/shop/cart-page-img-2.png",
      quantity: 1,
    },
  ]);

  const handleIncrease = (id: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleChange = (id: number, value: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: value >= 1 ? value : 1 } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const options = [
    { value: "0", label: "Ban" },
    { value: "1", label: "Ind" },
    { value: "2", label: "Pak" },
    { value: "3", label: "USA" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  

  return (
    <section className="cart-page">
      <div className="container">
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-xl-8 col-lg-7">
            <div className="cart-page__left">
              <div className="table-responsive">
                <table className="table cart-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="product-box">
                            <div className="img-box">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={120}
                                height={120}
                                priority
                              />
                            </div>
                            <h3>
                              <Link href="/product-details">
                                {product.name}
                              </Link>
                            </h3>
                          </div>
                        </td>

                        <td>${product.price.toFixed(2)}</td>

                        <td>
                          <div className="quantity-box">
                            <button
                              type="button"
                              className="sub"
                              onClick={() => handleDecrease(product.id)}
                            >
                              <i className="fa fa-minus" />
                            </button>

                            <input
                              type="number"
                              id={`quantity-${product.id}`}
                              value={product.quantity}
                              onChange={(e) =>
                                handleChange(
                                  product.id,
                                  Number(e.target.value)
                                )
                              }
                              min={1}
                            />

                            <button
                              type="button"
                              className="add"
                              onClick={() => handleIncrease(product.id)}
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </td>

                        <td>
                          ${(product.price * product.quantity).toFixed(2)}
                        </td>

                        <td>
                          <div
                            className="cross-icon"
                            onClick={() => handleRemove(product.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="fas fa-times" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-xl-4 col-lg-5">
            <div className="cart-page__right">
              <div className="cart-page__sidebar">
                {/* Shipping */}
                <div className="cart-page__shipping">
                  <h3 className="cart-page__shipping-title">
                    Calculated Shipping
                  </h3>

                  <form className="cart-page__shipping-form">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="cart-page__shipping-input-box">
                          <div className="select-box">
                            <CustomSelect
                              options={options}
                              placeholder="Country"
                              onChange={setSelectedValue}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="cart-page__shipping-input-box">
                          <div className="select-box">
                            <CustomSelect
                              options={options}
                              placeholder="State/City"
                              onChange={setSelectedValue}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="cart-page__shipping-input-box">
                          <input type="text" placeholder="Zip Code" />
                        </div>
                      </div>

                      <div className="cart-page__btn-box">
                        <button type="submit" className="thm-btn">
                          Update
                          <span className="icon-right-arrow"></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Coupon */}
                <div className="cart-page__coupon-code">
                  <h3 className="cart-page__coupon-code-title">Coupon Code</h3>
                  <p className="cart-page__coupon-code-text">
                    I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born
                  </p>

                  <form className="default-form cart-page__coupon-code-form">
                    <input type="text" placeholder="Enter Coupon Code" />
                    <button className="thm-btn" type="submit">
                      Apply Coupon
                      <span className="icon-right-arrow"></span>
                    </button>
                  </form>
                </div>

                {/* Total */}
                <div className="cart-page__cart-total">
                  <ul className="cart-total list-unstyled">
                    <li>
                      <span>Cart Subtotal</span>
                      <span>$20.98 USD</span>
                    </li>
                    <li>
                      <span>Shipping Cost</span>
                      <span>-$40.00 USD</span>
                    </li>
                    <li>
                      <span>Discount</span>
                      <span>$0.00 USD</span>
                    </li>
                    <li>
                      <span>Cart Total</span>
                      <span className="cart-total-amount">$20.98 USD</span>
                    </li>
                  </ul>

                  <div className="cart-page__buttons">
                    <div className="cart-page__buttons-1">
                      <Link className="thm-btn" href="/checkoutl">
                        Update
                        <span className="icon-right-arrow"></span>
                      </Link>
                    </div>

                    <div className="cart-page__buttons-2">
                      <Link href="/checkoutl" className="thm-btn">
                        Checkout
                        <span className="icon-right-arrow"></span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
