import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import styles from "./not-found.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: false }, alternates: { canonical: null }, openGraph: null, twitter: null };

export default function NotFound() {
  return (
    <div className={styles.page}>
      <SiteNav />
      <main className={styles.main}>
        <div className={styles.artwork} aria-hidden="true">
          <span className={styles.orbit} />
          <span className={styles.number}>404</span>
          <span className={styles.spark}><Sparkles strokeWidth={1} /></span>
          <span className={styles.note}>A little off the beaten path.</span>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}><span /> PAGE NOT FOUND</p>
          <h1 className={styles.title}>Even great ideas<br />take a <em>wrong turn.</em></h1>
          <p className={styles.description}>
            The page you’re looking for has moved or doesn’t exist.
            Let’s get you back to something bright.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.home}>
              <ArrowLeft size={18} aria-hidden="true" /> Back to home
            </Link>
            <Link href="/work" className={styles.work}>
              Explore our work <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <span>Bright ideas. Lasting impressions.</span>
        <Link href="/contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </footer>
    </div>
  );
}
