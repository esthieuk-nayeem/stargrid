
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Pricing from "@/components/sections/home2/Pricing";
export default function Pricing_Page() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Pricing">
            <Pricing/>
            <Newsletter/>
        </Layout>
    )
}
