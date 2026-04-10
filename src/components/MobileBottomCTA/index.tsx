"use client";

import styles from "./MobileBottomCTA.module.css";

export default function MobileBottomCTA() {
    return (
        <div className={styles.bar}>
            <a href="tel:+903121234567" className={styles.callButton}>
                📞 Hemen Arayın
            </a>
            <a href="/iletisim" className={styles.formButton}>
                Ücretsiz Görüşme
            </a>
        </div>
    );
}
