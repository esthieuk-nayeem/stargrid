
import Layout from "@/components/layout/Layout";
import Contact from "@/components/sections/home1/Contact";
import Newsletter from "@/components/sections/home1/Newsletter";
import Counter from "@/components/sections/home2/Counter";
import Portfolio from "@/components/sections/home2/Portfolio";
import About from "@/components/sections/home3/About";
import Banner from "@/components/sections/home3/Banner";
import Blog from "@/components/sections/home3/Blog";
import Choose from "@/components/sections/home3/Choose";
import Cta from "@/components/sections/home3/Cta";
import Faq from "@/components/sections/home3/Faq";
import Feature from "@/components/sections/home3/Feature";
import FeatureTwo from "@/components/sections/home3/FeatureTwo";
import Service from "@/components/sections/home3/Services";
import Testimonial from "@/components/sections/home3/Testimonial";
export default function Home_Three() {

    return (
        <Layout headerStyle={3} footerStyle={1}>
            <Banner/>
            <About/>
            <Service/>
            <Choose/>
            <Feature/>
            <Cta/>
            <Testimonial/>
            <Counter/>
            <Portfolio/>
            <Faq/>
            <FeatureTwo/>
            <Blog/>
            <Contact/>
            <Newsletter/>
        </Layout>
    )
}
