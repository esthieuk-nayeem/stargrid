
import Layout from "@/components/layout/Layout";
import About from "@/components/sections/home1/About";
import Banner from "@/components/sections/home1/Banner";
import Blog from "@/components/sections/home1/Blog";
import Choose from "@/components/sections/home1/Choose";
import Contact from "@/components/sections/home1/Contact";
import Counter from "@/components/sections/home1/Counter";
import Event from "@/components/sections/home1/Event";
import Newsletter from "@/components/sections/home1/Newsletter";
import Portfolio from "@/components/sections/home1/Portfolio";
import Pricing from "@/components/sections/home1/Pricing";
import Process from "@/components/sections/home1/Process";
import Services from "@/components/sections/home1/Services";
import SlideingText from "@/components/sections/home1/SlideingText";
import Testimonial from "@/components/sections/home1/Testimonial";


export default function Home_OnePage() {

    return (
        <Layout headerStyle={4} footerStyle={2}>
            <Banner/>
            <About/>
            <Counter/>
            <Services/>
            <Choose/>
            <SlideingText/>
            <Process/>
            <Portfolio/>
            <Pricing/>
            <Contact/>
            <Event/>
            <Testimonial/>
            <Blog/>
            <Newsletter/>
        </Layout>
    )
}
