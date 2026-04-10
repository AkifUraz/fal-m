"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

const HERO_IMAGES = [
    "/images/hero-2.png",
    "/images/hero-4.png",
    "/images/hero-5.png",
    "/images/hero-6.png",
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % HERO_IMAGES.length
            );
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.heroContainer}>
            <div className={styles.backgroundWrapper}>
                {HERO_IMAGES.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Aslanhan Hukuk - Slide ${index + 1}`}
                        fill
                        priority={index === 0}
                        quality={90}
                        style={{ objectFit: "cover" }}
                        className={`${styles.bgImage} ${index === currentImageIndex ? styles.active : ""}`}
                    />
                ))}
            </div>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <p className={styles.tagline}>Aslanhan Hukuk & Danışmanlık</p>
                <h1 className={styles.headline}>
                    Hukuki Sorunlarınızda
                    <br />
                    <span className={styles.highlight}>Yanınızdayız</span>
                </h1>
                <p className={styles.subHeadline}>
                    Aile hukuku, iş hukuku, tüketici hakları ve daha fazlasında — sizi
                    dinliyor, haklarınızı koruyoruz. İlk görüşme ücretsizdir.
                </p>
                <div className={styles.ctaGroup}>
                    <Link href="/iletisim" className={styles.ctaPrimary}>
                        Ücretsiz Ön Görüşme →
                    </Link>
                    <a href="tel:+903121234567" className={styles.ctaSecondary}>
                        📞 Hemen Arayın
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollDot}></div>
            </div>
        </section>
    );
};

export default Hero;
