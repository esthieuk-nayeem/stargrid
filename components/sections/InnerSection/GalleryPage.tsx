'use client';

import React from 'react'
import dynamic from 'next/dynamic'
const PortfolioFilter1 = dynamic(() => import('@/components/elements/PortfolioFilter1'), { ssr: false,})
export default function GalleryPage() {
    return (
        <>
            <PortfolioFilter1/>
        </>
    )
}
