import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/admin/SessionProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Bright Communications | Advertising, Branding & Digital Marketing Agency in Kochi",
  description:
    "Bright Communications is a leading advertising, branding, digital marketing, website development, content production, and integrated communications company based in Kochi, Kerala. Building brands since 1996.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${cormorant.variable}`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
