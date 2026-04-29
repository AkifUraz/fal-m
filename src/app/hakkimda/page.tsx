import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Hakkımızda | Aslanhan Hukuk Bürosu",
    description: "Av. İlyas Aslanhan hakkında bilgiler, eğitim durumu ve uzmanlık alanları.",
};

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Hakkımızda</h1>
                <div className={styles.intro}>
                    <p>
                        <strong>Avukat İlyas Aslanhan</strong> Aslanhan Hukuk Bürosu’nun kurucu avukatıdır. Ankara Üniversitesi Hukuk Fakültesi’ndeki eğitimine başlamış ve buradaki eğitimini başarıyla tamamlamıştır. Ankara 2 Nolu Barosu tarafından avukatlık ruhsatına hak kazanmıştır.
                    </p>
                    <br />
                    <p>
                        Ankara'da <strong>aile hukuku, bilişim, ceza hukuku, iş ve sosyal güvenlik hukuku, ticaret ve şirketler hukuku, miras hukuku, sigorta hukuku, gayrimenkul hukuku, icra ve iflas hukuku, idare ve vergi hukuku ile tüketici hakları hukuku</strong> alanlarında şahıs ve şirketlere kurumsal olarak avukatlık ve danışmanlık hizmeti sunmaktadır.
                    </p>
                </div>
            </header>

            <div className={styles.section}>
                <h2>Eğitim Bilgileri</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>Ankara Üniversitesi Hukuk Fakültesi</strong>
                        <p>Lisans Eğitimi - Hukuk</p>
                    </li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>İş Tecrübesi & Baro</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>Ankara 2 Nolu Barosu</strong>
                    </li>
                    <li>
                        <strong>Aslanhan Hukuk Bürosu</strong>
                        <p>Kurucu Avukat</p>
                    </li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>Uzmanlık Alanları</h2>
                <div className={styles.tags}>
                    <span className={styles.tag}>Aile Hukuku</span>
                    <span className={styles.tag}>İş Hukuku</span>
                    <span className={styles.tag}>Tüketici Hakları</span>
                    <span className={styles.tag}>Ceza Hukuku</span>
                    <span className={styles.tag}>İdare Hukuku</span>
                    <span className={styles.tag}>Gayrimenkul Hukuku</span>
                </div>
            </div>
        </div>
    );
}
