
import Layout from "@/components/layout/Layout";
import Newsletter from "@/components/sections/home1/Newsletter";
import BlogCarousel from "@/components/sections/InnerSection/BlogCarousel";

export default function BlogCarouselPage() {

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Blog Carousel">
            <section className="blog-carousel-page">
                <div className="blog-page__shape-1"></div>
                <div className="blog-page__shape-2"></div>
                <BlogCarousel/>
            </section>
            <Newsletter/>
        </Layout>
    )
}
