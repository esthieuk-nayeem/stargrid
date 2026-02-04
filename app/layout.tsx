import type { Metadata } from "next";
import { Space_Grotesk, Marcellus } from "next/font/google";

import "@/public/assets/css/bootstrap.min.css";
import "@/public/assets/css/style.css";
import "@/public/assets/css/responsive.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade'
import CustomCursor from "@/components/elements/CustomCursor";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // available weights
  display: 'swap',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400', // you can choose available weights
  display: 'swap',
});

export const metadata: Metadata = {
  title: "StarGrid",
  description: "",
};

// CHANGE: Load Google Maps with async parameter
<Script
  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
  strategy="beforeInteractive"
/>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`custom-cursor ${spaceGrotesk.className}`}>
        <CustomCursor />
        <div className={marcellus.className}></div>
        {children}
      </body>
      
    </html>
  );
}
