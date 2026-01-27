
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import GalleryPage from '@/components/sections/InnerSection/GalleryPage';
export default function Gallery_Page() {
    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Gallery">
            <GalleryPage/>
            <Newsletter/>
        </Layout>
    )
}
