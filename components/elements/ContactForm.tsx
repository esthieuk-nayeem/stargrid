"use client";

import { useState } from "react";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (

  <form className="contact-form-validated contact-one__form" onSubmit={handleSubmit}>
    <div className="row">
        <div className="col-xl-6 col-lg-6">
            <h4 className="contact-one__input-title">Full Name</h4>
            <div className="contact-one__input-box">
                <div className="contact-one__input-icon">
                  <span className="icon-user-1"></span>
                </div>
                <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Thomas Alison"
                />
            </div>
        </div>
        <div className="col-xl-6 col-lg-6">
            <h4 className="contact-one__input-title">Email Address</h4>
            <div className="contact-one__input-box">
                <div className="contact-one__input-icon">
                    <span className="icon-email"></span>
                </div>
                <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="thomas@domain.com"
                />
            </div>
        </div>
        <div className="col-xl-6 col-lg-6">
            <h4 className="contact-one__input-title">Phone Number</h4>
            <div className="contact-one__input-box">
                <div className="contact-one__input-icon">
                    <span className="icon-phone-call"></span>
                </div>
                <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+12 (00) 123 4567 890"
                />
            </div>
        </div>
        <div className="col-xl-6 col-lg-6">
            <h4 className="contact-one__input-title">Subject</h4>
            <div className="contact-one__input-box">
              <div className="contact-one__input-icon">
                  <span className="icon-edit"></span>
              </div>
                <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                />
            </div>
        </div>
    </div>
    <div className="col-xl-12">
        <h4 className="contact-one__input-title">Inquiry about </h4>
        <div className="contact-one__input-box text-message-box">
            <div className="contact-one__input-icon">
                <span className="icon-edit"></span>
            </div>
            <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            />
        </div>
        <div className="contact-one__btn-box">
            <button type="submit" className="thm-btn"><span>Submit
                    Now</span><i className="icon-right-arrow"></i></button>
        </div>
    </div>

    {status === "loading" && <p>Sending...</p>}
    {status === "success" && <p>Message sent successfully ✅</p>}
    {status === "error" && <p>Something went wrong ❌</p>}
  </form>
  );
}
