
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Testimonial from "@/components/sections/InnerSection/Testimonial";
export default function Testimonial_Carousel_Page() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Testimonials Carousel">
            <Testimonial/>
            <Newsletter/>
        </Layout>
    )
}
