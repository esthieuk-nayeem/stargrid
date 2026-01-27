
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Contact from "@/components/sections/home2/Contact";
import ServiceFaq from "@/components/sections/InnerSection/Faq";

export default function ContactPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Contact Us">
            <Contact/>
            <ServiceFaq/>
            <section className="google-map-one">
                <div className="container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
                        className="google-map__one"></iframe>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    )
}
