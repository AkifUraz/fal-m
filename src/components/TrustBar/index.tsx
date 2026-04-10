import styles from "./TrustBar.module.css";

const stats = [
    { number: "15+", label: "Yıllık Deneyim" },
    { number: "1200+", label: "Çözülen Dava" },
    { number: "%95", label: "Müvekkil Memnuniyeti" },
    { number: "7/24", label: "Destek Hattı" },
];

export default function TrustBar() {
    return (
        <section className={styles.trustBar}>
            <div className={`container ${styles.grid}`}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.stat}>
                        <span className={styles.number}>{stat.number}</span>
                        <span className={styles.label}>{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
