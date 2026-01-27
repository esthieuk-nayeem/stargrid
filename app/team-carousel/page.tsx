
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import TeamCarousel from "@/components/sections/InnerSection/TeamCarousel";
;
export default function Team_Carousel() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Team Carousel">
            <TeamCarousel/>
            <Newsletter/>
        </Layout>
    )
}
