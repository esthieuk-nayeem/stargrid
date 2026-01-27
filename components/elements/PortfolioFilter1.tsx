"use client";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Link from "next/link";
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";

interface PortfolioFilterProps {
defaultFilter?: 1;
}

export default function PortfolioFilter1({}: PortfolioFilterProps) {

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Collect all lightbox images in one array
    const slides = [
        { src: "/assets/images/gallery/gallery-page-1-1.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-2.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-3.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-4.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-5.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-6.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-7.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-8.jpg" },
        { src: "/assets/images/gallery/gallery-page-1-9.jpg" },
    ];


const isotope = useRef<Isotope | null>(null);

// Initialize Isotope
useEffect(() => {
    const iso = new Isotope(".items-container", {
    itemSelector: ".masonry-item",
    percentPosition: true,
    masonry: { columnWidth: ".masonry-item" },
    transitionDuration: "0.0s",
    });
    isotope.current = iso;

    return () => iso.destroy();
}, []);

return (
    <section className="gallery-page">
        <div className="container">
            <div className="row items-container">
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-1.jpg" alt="Image" width={378} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(0); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-2.jpg" alt="Image" width={378} height={824} priority />
                            </div>
                            <div onClick={() => { setIndex(1); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-3.jpg" alt="Image" width={378} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(2); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-4.jpg" alt="Image" width={378} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(3); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-5.jpg" alt="Image" width={378} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(4); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-6.jpg" alt="Image" width={378} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(5); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-7.jpg" alt="Image" width={378} height={824} priority />
                            </div>
                            <div onClick={() => { setIndex(6); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-6 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-8.jpg" alt="Image" width={766} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(7); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 masonry-item">
                    <div className="gallery-page__single">
                        <div className="gallery-page__img">
                            <div className="gallery-page__img-box">
                                <Image src="/assets/images/gallery/gallery-page-1-9.jpg" alt="Image" width={378} height={407} priority />
                            </div>
                            <div onClick={() => { setIndex(8); setOpen(true); }} className="gallery-page__icon">
                                <Link href="#"
                                    className="img-popup"><span className="icon-plus"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={slides}
        />
    </section>
);
}
