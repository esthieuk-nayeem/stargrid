
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import ProductPage from "@/components/sections/InnerSection/ProductPage";
;
export default function Product_Page() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Products">
            <ProductPage/>
            <Newsletter/>
        </Layout>
    )
}
