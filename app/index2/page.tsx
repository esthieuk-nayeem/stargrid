
import Layout from "@/components/layout/Layout";
import About from "@/components/sections/home2/About";
import Banner from "@/components/sections/home2/Banner";
import Blog from "@/components/sections/home2/Blog";
import Contact from "@/components/sections/home2/Contact";
import Counter from "@/components/sections/home2/Counter";
import Newsletter from "@/components/sections/home2/Newsletter";
import Portfolio from "@/components/sections/home2/Portfolio";
import Pricing from "@/components/sections/home2/Pricing";
import Process from "@/components/sections/home2/Process";
import Services from "@/components/sections/home2/Services";
import SlideingText from "@/components/sections/home2/SlidingText";
import Team from "@/components/sections/home2/Team";
import Testimonial from "@/components/sections/home2/Testimonial";
export default function Home_Two() {

    return (
        <Layout headerStyle={3} footerStyle={2}>
            <Banner/>
            <Services/>
            <SlideingText/>
            <About/>
            <Counter/>
            <Portfolio/>
            <Process/>
            <Contact/>
            <Team/>
            <Pricing/>
            <Testimonial/>
            <Newsletter/>
            <Blog/>
        </Layout>
    )
}
