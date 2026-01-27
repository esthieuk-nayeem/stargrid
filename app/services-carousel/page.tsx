
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Service_Carousel from "@/components/sections/InnerSection/ServiceCarousel";
;
export default function ServiceCarousel() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Services Carousel">
            <Service_Carousel/>
            <Newsletter/>
        </Layout>
    )
}
