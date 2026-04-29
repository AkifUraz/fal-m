"use client";

import styles from "./MobileBottomCTA.module.css";
import { Phone } from "@phosphor-icons/react";

export default function MobileBottomCTA() {
    return (
        <div className={styles.bar}>
            <a href="tel:+903121234567" className={styles.callButton}>
                <Phone size={18} weight="regular" style={{marginRight: '6px', verticalAlign: 'middle'}}/> Hemen Arayın
            </a>
            <a href="/iletisim" className={styles.formButton}>
                Hemen Görüşün
            </a>
        </div>
    );
}
