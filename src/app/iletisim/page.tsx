import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "İletişim | Aslanhan Hukuk Bürosu",
    description: "Aslanhan Hukuk Bürosu iletişim bilgileri, adres ve telefon.",
};

export default function ContactPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>İletişim</h1>

            <div className={styles.grid}>
                <div className={styles.info}>
                    <div className={styles.infoCard}>
                        <div className={styles.icon}>📍</div>
                        <div className={styles.infoContent}>
                            <h3>Adres</h3>
                            <p>Kızılay Mah. Menekşe 2 Cad. No.33/11<br />Çankaya/ANKARA</p>
                        </div>
                    </div>
                    
                    <div className={styles.infoCard}>
                        <div className={styles.icon}>📞</div>
                        <div className={styles.infoContent}>
                            <h3>Telefon</h3>
                            <p><a href="tel:+902121234567">+90 (212) 123 45 67</a></p>
                        </div>
                    </div>
                    
                    <div className={styles.infoCard}>
                        <div className={styles.icon}>✉️</div>
                        <div className={styles.infoContent}>
                            <h3>E-posta</h3>
                            <p><a href="mailto:info@aslanhan.com">info@aslanhan.com</a></p>
                        </div>
                    </div>
                    
                    <div className={styles.note}>
                        <span>ℹ️</span>
                        <p><strong>Not:</strong> Görüşmeler randevu ile yapılmaktadır.</p>
                    </div>
                </div>

                <div className={styles.map}>
                    <iframe
                        src="https://maps.google.com/maps?q=39.920837,32.849983&hl=tr&z=15&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
