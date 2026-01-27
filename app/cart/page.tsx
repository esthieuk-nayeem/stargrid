

import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import ShopCart from "@/components/sections/InnerSection/ShopCart";
;
export default function CartPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Cart">
            <ShopCart/>
            <Newsletter/>
        </Layout>
    )
}
