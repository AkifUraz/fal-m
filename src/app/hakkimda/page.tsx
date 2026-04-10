import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Hakkımda | Aslanhan Hukuk Bürosu",
    description: "Avukat [Ad Soyad] hakkında bilgiler, eğitim durumu ve uzmanlık alanları.",
};

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Hakkımda</h1>
                <p className={styles.intro}>Avukat [Ad Soyad], hukukun çeşitli alanlarında edindiği tecrübe ve akademik birikimi ile müvekkillerine hizmet vermektedir.</p>
            </header>

            <div className={styles.section}>
                <h2>Eğitim Bilgileri</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>İstanbul Üniversitesi Hukuk Fakültesi</strong>
                        <span className={styles.date}>2010 - 2014</span>
                        <p>Lisans Eğitimi</p>
                    </li>
                    <li>
                        <strong>Galatasaray Üniversitesi Sosyal Bilimler Enstitüsü</strong>
                        <span className={styles.date}>2015 - 2017</span>
                        <p>Kamu Hukuku Yüksek Lisans (Tezli)</p>
                    </li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>İş Tecrübesi & Baro</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>İstanbul Barosu</strong>
                        <span className={styles.date}>Sicil No: XXXXX</span>
                    </li>
                    <li>
                        <strong>Aslanhan Hukuk Bürosu</strong>
                        <span className={styles.date}>2018 - Günümüz</span>
                        <p>Kurucu Avukat</p>
                    </li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>Uzmanlık Alanları</h2>
                <div className={styles.tags}>
                    <span className={styles.tag}>Ticaret Hukuku</span>
                    <span className={styles.tag}>Borçlar Hukuku</span>
                    <span className={styles.tag}>Ceza Hukuku</span>
                    <span className={styles.tag}>İdare Hukuku</span>
                </div>
            </div>
        </div>
    );
}
