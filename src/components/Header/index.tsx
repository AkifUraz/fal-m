"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on resize to desktop
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 900) setMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo_gold.png"
                        alt="Aslanhan Hukuk Logo"
                        width={60}
                        height={60}
                        priority
                        className={styles.logoImage}
                    />
                    <div className={styles.logoText}>
                        <span className={styles.logoMain}>ASLANHAN</span>
                        <span className={styles.logoSub}>HUKUK & DANIŞMANLIK</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link href="/">Anasayfa</Link>
                        </li>
                        <li>
                            <Link href="/calisma-alanlari">Nasıl Yardımcı Oluruz</Link>
                        </li>
                        <li>
                            <Link href="/makaleler">Haklarınız</Link>
                        </li>
                        <li>
                            <Link href="/hakkimda">Hakkımızda</Link>
                        </li>
                    </ul>
                    <Link href="/iletisim" className={styles.ctaButton}>
                        Ücretsiz Görüşme
                    </Link>
                </nav>

                {/* Mobile Hamburger */}
                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menüyü aç"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
            >
                <nav>
                    <ul className={styles.mobileNavLinks}>
                        <li>
                            <Link href="/" onClick={() => setMenuOpen(false)}>
                                Anasayfa
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/calisma-alanlari"
                                onClick={() => setMenuOpen(false)}
                            >
                                Nasıl Yardımcı Oluruz
                            </Link>
                        </li>
                        <li>
                            <Link href="/makaleler" onClick={() => setMenuOpen(false)}>
                                Haklarınız
                            </Link>
                        </li>
                        <li>
                            <Link href="/hakkimda" onClick={() => setMenuOpen(false)}>
                                Hakkımızda
                            </Link>
                        </li>
                    </ul>
                    <Link
                        href="/iletisim"
                        className={styles.mobileCta}
                        onClick={() => setMenuOpen(false)}
                    >
                        Ücretsiz Görüşme →
                    </Link>
                </nav>
            </div>
            {menuOpen && (
                <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
            )}
        </header>
    );
}
