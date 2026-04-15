import type { Metadata } from "next";
import { Outfit, Source_Sans_3, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

/** Body copy, forms, nav links, descriptions */
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

/** Headlines, marquee, stats numerals, buttons */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "BrightCommunications",
  description:
    "BrightCommunications is a full-service creative agency helping ambitious brands grow through strategy, design & digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${sourceSans.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
