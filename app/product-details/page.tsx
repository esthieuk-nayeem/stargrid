

import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import ProductDetails from "@/components/sections/InnerSection/ProductDetails";
import ProductDiscription from "@/components/sections/InnerSection/ProductDiscription";
import RelatedProducts from "@/components/sections/InnerSection/RelatedProducts";
;
export default function ProductDetailsPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Product Details">
            <ProductDetails/>
            <ProductDiscription/>
            <RelatedProducts/>
            <Newsletter/>
        </Layout>
    )
}
