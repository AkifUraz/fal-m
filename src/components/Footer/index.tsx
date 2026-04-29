"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { MapPin, Phone, Envelope } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.column}>
                        <h3>İLETİŞİM</h3>
                        <div className={styles.contactItem}>
                            <span style={{ display: 'flex', alignItems: 'center' }}><MapPin size={20} weight="light" /></span>
                            <p>
                                Kızılay Mah. Menekşe 2 Cad. No.33/11
                                <br />
                                Çankaya/ANKARA
                            </p>
                        </div>
                        <div className={styles.contactItem}>
                            <span style={{ display: 'flex', alignItems: 'center' }}><Phone size={20} weight="light" /></span>
                            <p>
                                <a href="tel:+903121234567">+90 (312) 123 45 67</a>
                            </p>
                        </div>
                        <div className={styles.contactItem}>
                            <span style={{ display: 'flex', alignItems: 'center' }}><Envelope size={20} weight="light" /></span>
                            <p>
                                <a href="mailto:info@aslanhan.com">info@aslanhan.com</a>
                            </p>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h3>HIZLI MENÜ</h3>
                        <ul className={styles.linkList}>
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
                            <li>
                                <Link href="/iletisim">İletişim</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>HUKUKİ UYARI</h3>
                        <p>
                            Aslanhan Hukuk & Danışmanlık, müvekkillerine şeffaf, empatik
                            ve çözüm odaklı hukuki hizmet sunmaktadır.
                        </p>
                        <Link href="/iletisim" className={styles.footerCta}>
                            Ön Görüşme →
                        </Link>
                    </div>
                </div>

                <div className={styles.legal}>
                    Bu web sitesinde yer alan her türlü bilgi, makale ve içerik
                    yalnızca bilgilendirme amacı taşımakta olup hiçbir şekilde hukuki
                    tavsiye veya mütalaa niteliğinde değildir. Site içeriği Türkiye
                    Barolar Birliği&apos;nin Reklam Yasağı Yönetmeliği&apos;ne uygun
                    olarak hazırlanmıştır.
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Aslanhan Hukuk & Danışmanlık.
                        Tüm Hakları Saklıdır.
                    </div>
                </div>
            </div>
        </footer>
    );
}
