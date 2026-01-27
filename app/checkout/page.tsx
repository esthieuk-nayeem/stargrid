
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import Checkout from "@/components/sections/InnerSection/Checkout";

export default function CheckoutPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Checkout">
            <Checkout/>
            <Newsletter/>
        </Layout>
    )
}
